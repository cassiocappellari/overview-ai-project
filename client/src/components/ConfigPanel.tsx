import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIou, setConfidence } from "../store/configPanelSlice";
import { RootState } from "../store";

const ConfigPanel: React.FC = () => {
  const dispatch = useDispatch();
  const isVideoPlaying = useSelector((state: RootState) => state.videoPlayer.isVideoPlaying);
  const currentIou = useSelector((state: RootState) => state.configPanel.iou);
  const currentConfidence = useSelector((state: RootState) => state.configPanel.confidence);
  const [configIou, setConfigIou] = useState<number>(currentIou);
  const [configConfidence, setConfigConfidence] = useState<number>(currentConfidence);
  const isButtonDisabled = isVideoPlaying || (configIou === currentIou && configConfidence === currentConfidence);

  const handleApply = () => {
    dispatch(setIou(configIou));
    dispatch(setConfidence(configConfidence));
  };

  return (
    <div className="p-4 bg-indigo-900 shadow rounded-lg">
      <h3 className="text-lg font-bold mb-4 text-center">Model Settings</h3>
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
        className={`mt-4 p-2 rounded-sm ${
          isButtonDisabled
            ? "bg-indigo-400 cursor-not-allowed"
            : "bg-indigo-700"
        }`}
        disabled={isButtonDisabled}
      >
        Apply
      </button>
    </div>
  );
};

export default ConfigPanel;
