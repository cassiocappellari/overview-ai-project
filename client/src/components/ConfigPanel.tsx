import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIou, setConfidence } from "../store/configPanelSlice";

const ConfigPanel: React.FC = () => {
  const dispatch = useDispatch();
  const [configIou, setConfigIou] = useState<number>(0.5);
  const [configConfidence, setConfigConfidence] = useState<number>(0.5);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  
  const handleApply = () => {
    dispatch(setIou(Number(configIou)));
    dispatch(setConfidence(Number(configConfidence)));
    setIsButtonDisabled(true);
  };

  useEffect(() => {
    setIsButtonDisabled(false);
  }, [configIou, configConfidence]);

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
          value={configIou}
          onChange={(e) => setConfigIou(Number(e.target.value))}
          className="w-full"
        />
        <div
          className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded"
          style={{ left: `${(configIou - 0.1) * 100}%` }}
        >
          {configIou.toFixed(1)}
        </div>
      </div>

      <div className="relative w-full mt-6">
        <label className="block mb-2">Confidence Threshold</label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={configConfidence}
          onChange={(e) => setConfigConfidence(Number(e.target.value))}
          className="w-full"
        />
        <div
          className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded"
          style={{ left: `${(configConfidence - 0.1) * 100}%` }}
        >
          {configConfidence.toFixed(1)}
        </div>
      </div>

      <button
        onClick={handleApply}
        className={`mt-4 p-2 rounded-md ${
          isButtonDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-sky-500 hover:bg-sky-700"
        }`}
        disabled={isButtonDisabled}
      >
        Apply
      </button>
    </div>
  );
};

export default ConfigPanel;
