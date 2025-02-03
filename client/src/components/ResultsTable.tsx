import React from "react";
import { dateFormatter } from "../utils/dateFormatter";
import { imageExtensionRemover } from "../utils/stringFormatter";
import { useGetPredictionResults } from "../hooks/useGetPredictionResults";

const ResultsTable: React.FC = () => {
  const { predictionResults } = useGetPredictionResults();
  const currentFrameReference = predictionResults.length > 0 
    ? `from ${imageExtensionRemover(predictionResults[0].frame_reference)}`
    : "";

  return (
    <div className="p-4 bg-indigo-900 shadow rounded-lg">
      <h3 className="text-lg font-bold mb-4 text-center">
        Last 10 Predictions {currentFrameReference}
      </h3>
      <table className="table-fixed w-full border-collapse border border-slate-500 text-center text-xs">
        <thead>
          <tr className="bg-indigo-950">
            <th className="border border-slate-600">Class</th>
            <th className="border border-slate-600">Confidence</th>
            <th className="border border-slate-600">Bounding box (height)</th>
            <th className="border border-slate-600">Bounding box (left)</th>
            <th className="border border-slate-600">Bounding box (top)</th>
            <th className="border border-slate-600">Bounding box (width)</th>
            <th className="border border-slate-600">Result date</th>
          </tr>
        </thead>
        <tbody>
          {predictionResults.length > 0 ? (
            predictionResults.slice(0, 10).map((predictionResult, index) => (
              <tr key={index}>
                <td className="border border-slate-700">{predictionResult.class_name}</td>
                <td className="border border-slate-700">
                  {(predictionResult.confidence * 100).toFixed(2)}%
                </td>
                <td className="border border-slate-700">{predictionResult.box.height}</td>
                <td className="border border-slate-700">{predictionResult.box.left}</td>
                <td className="border border-slate-700">{predictionResult.box.top}</td>
                <td className="border border-slate-700">{predictionResult.box.width}</td>
                <td className="border border-slate-700">
                  {dateFormatter(predictionResult.created_at)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="border border-slate-700 p-4 text-center text-sm">
                No prediction results available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
