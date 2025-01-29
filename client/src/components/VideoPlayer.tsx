import React, { useRef } from "react";
import ReactPlayer from "react-player";

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<ReactPlayer | null>(null);

  return (
    <div className="relative w-full h-0 pb-[56.30%]">
      <ReactPlayer
        ref={videoRef}
        url="https://www.youtube.com/watch?v=HCO_sMKLQzQ"
        controls
        width="100%"
        height="100%"
        className="absolute top-0 left-0"
      />
    </div>
  );
};

export default VideoPlayer;
