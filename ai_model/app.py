import os
from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2
from dotenv import load_dotenv
from database.queries import (
       CREATE_FRAME_TABLE, 
       CREATE_PREDICTION_RESULT_TABLE
)
from controllers.controllers import (
    get_prediction_results_controller,
    detect_controller,
    health_check_controller,
    load_model_controller,
    receive_frame_controller
)

load_dotenv()

app = Flask(__name__)
url = os.getenv("DATABASE_URL")
CORS(app)

connection = psycopg2.connect(url)
cursor = connection.cursor()

cursor.execute(CREATE_FRAME_TABLE)
cursor.execute(CREATE_PREDICTION_RESULT_TABLE)
connection.commit()

@app.route('/detect', methods=['POST'])
def detect():
        results = detect_controller()
        return results

@app.route('/prediction_results/<int:frame_id>', methods=['GET'])
def get_prediction_results(frame_id):
        results = get_prediction_results_controller(frame_id)
        return results

@app.route('/frame', methods=['POST'])
def receive_frame():
        results = receive_frame_controller()
        return results

@app.route('/health_check', methods=['GET'])
def health_check():
        results = health_check_controller()
        return results

@app.route('/load_model', methods=['POST'])
def load_model():
        results = load_model_controller()
        return results

if __name__ == "__main__":
    app.run(host='0.0.0.0')
