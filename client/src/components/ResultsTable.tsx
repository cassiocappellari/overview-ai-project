import React from "react";
import { dateFormatter } from "../utils/dateFormatter";
import { imageExtensionRemover } from "../utils/imageExtensionRemover";

const mockResults = [
  {
    id: 1,
    box: { height: 50, left: 50, top: 50, width: 100 },
    class_name: "person",
    confidence: 0.91,
    frame_id: 5,
    frame_reference: "frame_001.png",
    created_at: "2024-02-02T12:34:56",
  },
  {
    id: 2,
    box: { height: 100, left: 100, top: 100, width: 200 },
    class_name: "bus",
    confidence: 0.89,
    frame_id: 5,
    frame_reference: "frame_001.png",
    created_at: "2024-02-02T12:34:56",
  },
  {
    id: 3,
    box: { height: 100, left: 100, top: 100, width: 200 },
    class_name: "bus",
    confidence: 0.89,
    frame_id: 5,
    frame_reference: "frame_001.png",
    created_at: "2024-02-02T12:34:56",
  },
  {
    id: 4,
    box: { height: 100, left: 100, top: 100, width: 200 },
    class_name: "bus",
    confidence: 0.89,
    frame_id: 5,
    frame_reference: "frame_001.png",
    created_at: "2024-02-02T12:34:56",
  },
  {
    id: 5,
    box: { height: 100, left: 100, top: 100, width: 200 },
    class_name: "bus",
    confidence: 0.89,
    frame_id: 5,
    frame_reference: "frame_001.png",
    created_at: "2024-02-02T12:34:56",
  },
  {
    id: 6,
    box: { height: 100, left: 100, top: 100, width: 200 },
    class_name: "bus",
    confidence: 0.89,
    frame_id: 5,
    frame_reference: "frame_001.png",
    created_at: "2024-02-02T12:34:56",
  },
  {
    id: 7,
    box: { height: 100, left: 100, top: 100, width: 200 },
    class_name: "bus",
    confidence: 0.89,
    frame_id: 5,
    frame_reference: "frame_001.png",
    created_at: "2024-02-02T12:34:56",
  },
  {
    id: 8,
    box: { height: 100, left: 100, top: 100, width: 200 },
    class_name: "bus",
    confidence: 0.89,
    frame_id: 5,
    frame_reference: "frame_001.png",
    created_at: "2024-02-02T12:34:56",
  },
  {
    id: 9,
    box: { height: 100, left: 100, top: 100, width: 200 },
    class_name: "bus",
    confidence: 0.89,
    frame_id: 5,
    frame_reference: "frame_001.png",
    created_at: "2024-02-02T12:34:56",
  },
  {
    id: 10,
    box: { height: 100, left: 100, top: 100, width: 200 },
    class_name: "bus",
    confidence: 0.89,
    frame_id: 5,
    frame_reference: "frame_001.png",
    created_at: "2024-02-02T12:34:56",
  },
];

const ResultsTable: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4 text-center">Last 10 Predictions</h3>
      <table className="table-fixed w-full border-collapse border border-slate-500 text-center text-xs">
        <thead>
          <tr>
            <th className="border border-slate-600">Class</th>
            <th className="border border-slate-600">Confidence</th>
            <th className="border border-slate-600">Bounding box (height)</th>
            <th className="border border-slate-600">Bounding box (left)</th>
            <th className="border border-slate-600">Bounding box (top)</th>
            <th className="border border-slate-600">Bounding box (width)</th>
            <th className="border border-slate-600">Frame reference</th>
            <th className="border border-slate-600">Result date</th>
          </tr>
        </thead>
        <tbody>
          {mockResults.map((result, index) => (
            <tr key={index}>
              <td className="border border-slate-700">{result.class_name}</td>
              <td className="border border-slate-700">{(result.confidence * 100).toFixed(2)}%</td>
              <td className="border border-slate-700">{result.box.height}</td>
              <td className="border border-slate-700">{result.box.left}</td>
              <td className="border border-slate-700">{result.box.top}</td>
              <td className="border border-slate-700">{result.box.width}</td>
              <td className="border border-slate-700">{imageExtensionRemover(result.frame_reference)}</td>
              <td className="border border-slate-700">{dateFormatter(result.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
