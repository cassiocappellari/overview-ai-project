import { useState } from "react";
import { sendVideoFrame } from "../services/pythonApi";
import { removeBase64Prefix } from "../utils/stringFormatter";

const VALID_VIDEO_FORMATS = ["video/mp4"];

const useHandleVideoUpload = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const sendFrameToApi = async (frameBase64: string) => {
    try {
      const extractedBase64Code = removeBase64Prefix(frameBase64);
      const data = { image: extractedBase64Code };
      await sendVideoFrame(data); // Send the frame to the backend API
    } catch (error) {
      console.error("Error sending frame:", error);
    }
  };

  const extractAndSendFrames = (videoElement: HTMLVideoElement) => {
    const duration = videoElement.duration;
    let currentTime = 0;
    
    // Ensure the frame extraction is based on 1 frame per second
    const frameInterval = setInterval(() => {
      if (currentTime < duration) {
        videoElement.currentTime = currentTime;
        currentTime++;

        videoElement.onseeked = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (context) {
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

            const base64Frame = canvas.toDataURL("image/png");
            sendFrameToApi(base64Frame);
          }
        };
      }

      if (currentTime >= duration) {
        clearInterval(frameInterval); // Stop sending frames after the video ends
      }
    }, 1000); // Send 1 frame every second
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const videoFile = event.target.files?.[0];

    if (videoFile && VALID_VIDEO_FORMATS.includes(videoFile.type)) {
      setLoading(true);
      const url = URL.createObjectURL(videoFile);
      setVideoUrl(url);

      let uploadVideoProgress = 0;

      const interval = setInterval(() => {
        uploadVideoProgress += 10;
        setUploadProgress(uploadVideoProgress);

        if (uploadVideoProgress >= 100) {
          clearInterval(interval);
          setLoading(false);
        }
      }, 300);

      const videoElement = document.createElement("video");
      videoElement.src = url;

      videoElement.onloadedmetadata = () => {
        extractAndSendFrames(videoElement);
      };
    } else {
      alert("Please upload a valid MP4 video");
    }
  };

  return { videoUrl, loading, uploadProgress, handleVideoUpload };
};

export default useHandleVideoUpload;
