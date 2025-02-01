import axios from "axios";

const API_BASE_URL = "http://localhost:5001";

interface ObjectsDetectionRequest {
  image_path: string;
  confidence: number;
  iou: number;
}

export const objectsDetectionRequest = async (data: ObjectsDetectionRequest) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/detect`, data);
    return response.data;
  } catch (error) {
    console.error("Error sending detection request:", error);
    throw error;
  }
};