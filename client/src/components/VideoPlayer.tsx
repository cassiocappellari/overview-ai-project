import React, { useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { objectsDetectionRequest } from "../services/pythonApi";
import { setBoundingBox } from "../store/frameCanvasSlice";

const VideoPlayer: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch();
  const confidence = useSelector((state: RootState) => state.configPanel.confidence);
  const iou = useSelector((state: RootState) => state.configPanel.iou);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "video/mp4") {
      setLoading(true);
      const videoUrl = URL.createObjectURL(file);
      setVideoUrl(videoUrl);

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setLoading(false);
        }
      }, 300);
    } else {
      alert("Please upload a valid MP4 video file.");
    }
  };

  const captureFrameAndSendToAPI = useCallback(async () => {
    const frameName = 1

    const requestData = {
      image_path: `./captured_frames/000${frameName}.jpg`,
      confidence,
      iou,
    };
    
    const result = await objectsDetectionRequest(requestData);
    dispatch(setBoundingBox(result))
  }, [confidence, iou, dispatch]);

  const handleVideoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);

    }

    intervalRef.current = setInterval(captureFrameAndSendToAPI, 1000);
  };

  const handleVideoPause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div>
        <label htmlFor="file-upload" className="cursor-pointer text-blue-500">
          UPLOAD VIDEO
        </label>
        <input
          type="file"
          id="file-upload"
          accept="video/mp4"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {loading && (
        <div className="flex flex-col items-center">
          <div className="spinner-border animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 mb-2" />
          <p>Loading... {uploadProgress}%</p>
        </div>
      )}

      <div className="relative w-full h-0 pb-[56.30%]">
        {!videoUrl && !loading && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center text-gray-600">
            <span>No video selected</span>
          </div>
        )}

        {videoUrl && !loading && (
          <video
            ref={videoElementRef}
            src={videoUrl}
            controls
            width="100%"
            height="100%"
            className="absolute top-0 left-0"
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
          />
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
