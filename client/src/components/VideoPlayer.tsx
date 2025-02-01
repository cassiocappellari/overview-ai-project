import React, { useRef } from "react";
import useHandleVideoUpload from "../hooks/useHandleVideoUpload";
import useSendVideoFrames from "../hooks/useSendVideoFrames";

const VideoPlayer: React.FC = () => {
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const { videoUrl, loading, uploadProgress, handleVideoUpload } = useHandleVideoUpload();
  const { handleVideoPlay, handleVideoPause } = useSendVideoFrames();

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
          onChange={handleVideoUpload}
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
