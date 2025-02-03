import { useEffect, useState } from "react";
import { getPredictionResults } from "../services/pythonApi";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useGetPredictionResults = () => {
  const frameId = useSelector((state: RootState) => state.frameId);
  const [predictionResults, setPredictionResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!frameId) return;
      setError(null);
      
      try {
        const result = await getPredictionResults(frameId);
        setPredictionResults(result.data.results);
      } catch (err) {
        setError("Failed to fetch prediction results");
      }
    };

    fetchResults();
    setPredictionResults([])
  }, [frameId]);

  return { predictionResults, error };
};
