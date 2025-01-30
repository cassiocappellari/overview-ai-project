import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";

const VideoPlayer: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const videoRef = useRef<ReactPlayer | null>(null);

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
          <ReactPlayer
            ref={videoRef}
            url={videoUrl}
            controls
            width="100%"
            height="100%"
            className="absolute top-0 left-0"
          />
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
