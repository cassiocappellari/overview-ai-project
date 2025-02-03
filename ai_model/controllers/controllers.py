from dotenv import load_dotenv
import os
import psycopg2
from PIL import Image
from flask import jsonify, request
from database.queries import SELECT_PREDICTION_RESULTS, INSERT_FRAME, INSERT_PREDICTION_RESULT
import json
import json
import base64
import io
from smart_open import open
from services.services import Model

load_dotenv()

url = os.getenv("DATABASE_URL")
connection = psycopg2.connect(url)

model = Model("yolov8s")

project_dir = os.getcwd()
captured_frames_dir = os.path.join(project_dir, 'captured_frames')

def get_prediction_results_controller(frame_id):
    try:
        with connection.cursor() as cursor:
            cursor.execute(SELECT_PREDICTION_RESULTS, (frame_id,))
            prediction_results = cursor.fetchall()

            if not prediction_results:
                return jsonify({"error": f"No prediction results found for frame_id: {frame_id}", "results": []}), 404

            results = []
            for prediction_result in prediction_results:
                parsedResult = {
                    "id": prediction_result[0],
                    "box": prediction_result[1],
                    "class_name": prediction_result[2],
                    "confidence": prediction_result[3],
                    "frame_id": prediction_result[4],
                    "frame_reference": prediction_result[5],
                    "created_at": prediction_result[6].isoformat()
                }
                results.append(parsedResult)
            
            connection.commit()
        return jsonify({"results": results}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def detect_controller():
    try:
        data = request.json
        if not data or 'image_path' not in data or 'confidence' not in data or 'iou' not in data:
            return jsonify({"error": "Missing required fields: image_path, confidence, iou"}), 400

        image_path = data['image_path']
        confidence = data['confidence']
        iou = data['iou']

        if not os.path.exists(image_path):
            return jsonify({"error": f"Image file not found: {image_path}"}), 404

        frame_reference = os.path.basename(image_path)

        with connection.cursor() as cursor:
            cursor.execute(INSERT_FRAME, (frame_reference,))
            frame = cursor.fetchone()
            if not frame:
                return jsonify({"error": "Failed to insert frame into the database"}), 500
            
            frame_id = frame[0]
            frame_reference = frame[1]
            with open(image_path, 'rb') as f:
                original_img = Image.open(f).convert('RGB')
            predictions = model(original_img, confidence, iou)
            detections = [p.to_dict() for p in predictions]

            results = []
            for detection in detections:
                box = json.dumps(detection['box'])
                class_name = detection['class_name']
                confidence = detection['confidence']

                cursor.execute(INSERT_PREDICTION_RESULT, (box, class_name, confidence, frame_id))
                prediction_result = cursor.fetchone()

                if not prediction_result:
                    return jsonify({"error": "Failed to insert prediction result"}), 500

                parsedResult = {
                    "id": prediction_result[0],
                    "box": prediction_result[1],
                    "class_name": prediction_result[2],
                    "confidence": prediction_result[3],
                    "frame_id": prediction_result[4],
                    "created_at": prediction_result[5].isoformat(),
                    "frame_reference": frame_reference
                }
                results.append(parsedResult)

            connection.commit()
        return jsonify({"results": results}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def health_check_controller():
    if model is None:
        return "Model is not loaded"
    return f"Model {model.model_name} is loaded"

def load_model_controller():
    model_name = request.json['model_name']
    global model
    model = Model(model_name)
    return f"Model {model_name} is loaded"

frame_reference_counter = 1

def receive_frame_controller():
    global frame_reference_counter
    try:
        base64Img = request.json['image']
        img_data = base64.b64decode(base64Img)
        img = Image.open(io.BytesIO(img_data))
        filename = os.path.join(captured_frames_dir, f'frame_00{frame_reference_counter}.png')
        img.save(filename)
        frame_reference_counter += 1
        return jsonify({"message": "Frame received successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500