import React, { useState } from "react";

const ConfigPanel: React.FC = () => {
  const [iou, setIou] = useState(0.5);
  const [confidence, setConfidence] = useState(0.5);

  const handleSave = () => {
    console.log("IoU:", iou, "Confidence:", confidence);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-bold mb-4">Model Settings</h3>

      <div className="relative w-full">
        <label className="block mb-2">IoU Threshold</label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={iou}
          onChange={(e) => setIou(Number(e.target.value))}
          className="w-full"
        />
        <div
          className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded"
          style={{ left: `${(iou - 0.1) * 100}%` }}
        >
          {iou.toFixed(1)}
        </div>
      </div>

      <div className="relative w-full mt-6">
        <label className="block mb-2">Confidence Threshold</label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={confidence}
          onChange={(e) => setConfidence(Number(e.target.value))}
          className="w-full"
        />
        <div
          className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded"
          style={{ left: `${(confidence - 0.1) * 100}%` }}
        >
          {confidence.toFixed(1)}
        </div>
      </div>

      <button onClick={handleSave} className="btn-primary mt-4">
        Apply
      </button>
    </div>
  );
};

export default ConfigPanel;
