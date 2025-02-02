import React from "react";
import { dateFormatter } from "../utils/dateFormatter";
import { imageExtensionRemover } from "../utils/stringFormatter";
import { useGetPredictionResults } from "../hooks/useGetPredictionResults";

const ResultsTable: React.FC = () => {
  const { data = [] } = useGetPredictionResults();

  return (
    <div>
      <h3 className="text-lg font-bold mb-4 text-center">Last 10 Predictions by frame</h3>
      <table className="table-fixed w-full border-collapse border border-slate-500 text-center text-xs">
        <thead>
          <tr>
            <th className="border border-slate-600">Frame reference</th>
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
          {data.length > 0 ? (
            data.slice(0, 10).map((result, index) => (
              <tr key={result.id || index}>
                <td className="border border-slate-700">
                  {imageExtensionRemover(result.frame_reference)}
                </td>
                <td className="border border-slate-700">{result.class_name}</td>
                <td className="border border-slate-700">{(result.confidence * 100).toFixed(2)}%</td>
                <td className="border border-slate-700">{result.box.height}</td>
                <td className="border border-slate-700">{result.box.left}</td>
                <td className="border border-slate-700">{result.box.top}</td>
                <td className="border border-slate-700">{result.box.width}</td>
                <td className="border border-slate-700">{dateFormatter(result.created_at)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="border border-slate-700 p-4 text-center">
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
