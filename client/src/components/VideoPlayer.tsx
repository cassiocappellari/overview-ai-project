import React, { useRef } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<any>(null);
  
  return (
    <div className="video-container">
      <ReactPlayer
        ref={videoRef}
        url=""
        controls
        width="640px"
        height="360px"
      />
    </div>
  );
};

export default VideoPlayer;
