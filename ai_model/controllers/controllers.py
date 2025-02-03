from dotenv import load_dotenv
import os
import psycopg2
from PIL import Image
from flask import request
from database.queries import SELECT_PREDICTION_RESULTS, INSERT_FRAME, INSERT_PREDICTION_RESULT
import json
from services.services import Model

load_dotenv()
url = os.getenv("DATABASE_URL")
connection = psycopg2.connect(url)

model = Model("yolov8s")

def get_prediction_results_controller(frame_id):
    with connection.cursor() as cursor:
        cursor.execute(SELECT_PREDICTION_RESULTS, (frame_id,))
        prediction_results = cursor.fetchall()
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
    return results

def detect_controller():
    image_path = request.json['image_path']
    confidence = request.json['confidence']
    iou = request.json['iou']
    frame_reference = os.path.basename(image_path)
    with connection.cursor() as cursor:
        cursor.execute(INSERT_FRAME, (frame_reference,))
        frame = cursor.fetchone()
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
    return results