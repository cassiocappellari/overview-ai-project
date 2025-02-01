import React from "react";

const mockResults = [
  { className: "person", confidence: 0.91, box: "50, 50, 100, 100" },
  { className: "bus", confidence: 0.89, box: "100, 100, 200, 200" },
  { className: "bus", confidence: 0.89, box: "100, 100, 200, 200" },
  { className: "bus", confidence: 0.89, box: "100, 100, 200, 200" },
  { className: "bus", confidence: 0.89, box: "100, 100, 200, 200" },
  { className: "bus", confidence: 0.89, box: "100, 100, 200, 200" },
  { className: "bus", confidence: 0.89, box: "100, 100, 200, 200" },
  { className: "bus", confidence: 0.89, box: "100, 100, 200, 200" },
  { className: "bus", confidence: 0.89, box: "100, 100, 200, 200" },
  { className: "bus", confidence: 0.89, box: "100, 100, 200, 200" },
];

const ResultsTable: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4 text-center">Last 10 Predictions</h3>
      <table className="table-fixed w-full border-collapse border border-slate-500 text-center">
        <thead>
          <tr>
            <th className="border border-slate-600">Class</th>
            <th className="border border-slate-600">Confidence</th>
            <th className="border border-slate-600">Bounding Box</th>
          </tr>
        </thead>
        <tbody>
          {mockResults.map((result, index) => (
            <tr key={index}>
              <td className="border border-slate-700">{result.className}</td>
              <td className="border border-slate-700">{(result.confidence * 100).toFixed(2)}%</td>
              <td className="border border-slate-700">{result.box}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
