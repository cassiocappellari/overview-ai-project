import os
import numpy as np
import cv2
from PIL import Image
import onnxruntime as ort
from typing import List
from dataclasses import dataclass
from flask import Flask, request, jsonify
from smart_open import open
from flask_cors import CORS
import psycopg2
from dotenv import load_dotenv
import json
import base64
import io
from database.queries import CREATE_FRAME_TABLE, CREATE_PREDICTION_RESULT_TABLE
from controllers.controllers import get_prediction_results_controller, detect_controller

load_dotenv()

app = Flask(__name__)
url = os.getenv("DATABASE_URL")
CORS(app)

connection = psycopg2.connect(url)
cursor = connection.cursor()

@dataclass
class BBOX:
    left: int
    top: int
    width: int
    height: int

@dataclass
class Prediction:
    class_name: int
    confidence: float
    box: BBOX
    
    def to_dict(self):
        return {
            "class_name": str(self.class_name),
            "confidence": float(self.confidence),
            "box": {
                "left": int(self.box.left),
                "top": int(self.box.top),
                "width": int(self.box.width),
                "height": int(self.box.height)
            }
        }

class Model:
    def __init__(self, model_name: str):
        self.model_name = model_name
        providers = ort.get_available_providers()
        print(f"Available providers: {providers}")
        self.model = ort.InferenceSession(f"models/{model_name}.onnx", providers=providers)
        self.input_name = self.model.get_inputs()[0].name
        self.output_name = self.model.get_outputs()[0].name
        self.input_width = self.model.get_inputs()[0].shape[2]
        self.input_height = self.model.get_inputs()[0].shape[3]
        self.idx2class = eval(self.model.get_modelmeta().custom_metadata_map['names'])
    
    def preprocess(
        self, 
        img: Image.Image
    ) -> np.ndarray:
        img = img.resize((self.input_width, self.input_height))
        img = np.array(img).transpose(2, 0, 1)
        img = np.expand_dims(img, axis=0)
        img = img / 255.0
        img = img.astype(np.float32)
        return img
    
    def postprocess(
        self, 
        output: np.ndarray, 
        confidence_thresh: float, 
        iou_thresh: float,
        img_width: int,
        img_height: int
    ) -> List[Prediction]:
        
        outputs = np.transpose(np.squeeze(output[0]))
        rows = outputs.shape[0]
        boxes = []
        scores = []
        class_ids = []
        x_factor = img_width / self.input_width
        y_factor = img_height / self.input_height
        for i in range(rows):
            classes_scores = outputs[i][4:]
            max_score = np.amax(classes_scores)
            if max_score >= confidence_thresh:
                class_id = np.argmax(classes_scores)
                x, y, w, h = outputs[i][0], outputs[i][1], outputs[i][2], outputs[i][3]
                left = int((x - w / 2) * x_factor)
                top = int((y - h / 2) * y_factor)
                width = int(w * x_factor)
                height = int(h * y_factor)
                class_ids.append(class_id)
                scores.append(max_score)
                boxes.append([left, top, width, height])
        indices = cv2.dnn.NMSBoxes(boxes, scores, confidence_thresh, iou_thresh)
        detections = []
        if len(indices) > 0:
            for i in indices.flatten():
                left, top, width, height = boxes[i]
                class_id = class_ids[i]
                score = scores[i]
                detection = Prediction(
                    class_name=self.idx2class[class_id],
                    confidence=score,
                    box=BBOX(left, top, width, height)
                )
                detections.append(detection)
        return detections

    def __call__(
        self, 
        img: Image.Image,
        confidence_thresh: float, 
        iou_thresh: float
    ) -> List[Prediction]:
        img_input = self.preprocess(img)
        outputs = self.model.run(None, {self.input_name: img_input})
        predictions = self.postprocess(outputs, confidence_thresh, iou_thresh, img.width, img.height)
        return predictions

model = Model("yolov8s")

cursor.execute(CREATE_FRAME_TABLE)
cursor.execute(CREATE_PREDICTION_RESULT_TABLE)
connection.commit()

@app.route('/detect', methods=['POST'])
def detect():
    results = detect_controller()
    return jsonify({"data": results}), 201

@app.route('/prediction_results/<int:frame_id>', methods=['GET'])
def get_prediction_results(frame_id):
        results = get_prediction_results_controller(frame_id)
        return jsonify({"data": results}), 200

project_dir = os.path.dirname(os.path.abspath(__file__))
captured_frames_dir = os.path.join(project_dir, 'captured_frames')

frame_reference_counter = 1

@app.route('/frame', methods=['POST'])
def receive_frame():
    global frame_reference_counter

    base64Img = request.json['image']
    img_data = base64.b64decode(base64Img)
    img = Image.open(io.BytesIO(img_data))
    filename = os.path.join(captured_frames_dir, f'frame_00{frame_reference_counter}.png')
    img.save(filename)
    frame_reference_counter += 1
    return 'Frame successfully received', 200

@app.route('/health_check', methods=['GET'])
def health_check():
    if model is None:
        return "Model is not loaded"
    return f"Model {model.model_name} is loaded"

@app.route('/load_model', methods=['POST'])
def load_model():
    model_name = request.json['model_name']
    global model
    model = Model(model_name)
    return f"Model {model_name} is loaded"

if __name__ == "__main__":
    app.run(host='0.0.0.0')
