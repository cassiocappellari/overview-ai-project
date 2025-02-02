import axios from "axios";
import { BoundingBox } from "../interfaces";

const API_BASE_URL = "http://localhost:5001";

interface ObjectsDetectionRequest {
  image_path: string;
  confidence: number;
  iou: number;
};

interface BoundingBoxApiResponse {
  data: BoundingBox[]
};

export const objectsDetectionRequest = async (data: ObjectsDetectionRequest): Promise<BoundingBoxApiResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/detect`, data);
    return response.data;
  } catch (error) {
    console.error("Error sending detection request:", error);
    throw error;
  }
};

export const getPredictionResults = async (frameId: number): Promise<BoundingBoxApiResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/prediction_results/${frameId}`);
    return response.data;
  } catch (error) {
    console.error("Error sending detection request:", error);
    throw error;
  }
};