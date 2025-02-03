import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendVideoFrame } from "../services/pythonApi";
import { removeBase64Prefix } from "../utils/stringFormatter";
import { setIsVideoLoading } from "../store/videoPlayerSlice";

const VALID_VIDEO_FORMATS = ["video/mp4"];

const useHandleVideoUpload = () => {
  const dispatch = useDispatch();

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const sendFrameToApi = async (frameBase64: string) => {
    try {
      const extractedBase64Code = removeBase64Prefix(frameBase64);
      const data = { image: extractedBase64Code };
      await sendVideoFrame(data);
    } catch (error) {
      console.error("Error sending frame:", error);
    }
  };

  const extractAndSendFrames = (videoElement: HTMLVideoElement) => {
    const duration = videoElement.duration;
    let currentTime = 0;

    const sendNextFrame = () => {
      if (currentTime < duration) {
        videoElement.currentTime = currentTime;
      }

      videoElement.onseeked = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (context) {
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;
          context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

          const base64Frame = canvas.toDataURL("image/png");
          sendFrameToApi(base64Frame);

          currentTime++;
          if (currentTime < duration) {
            setTimeout(sendNextFrame, 1000);
          }
        }
      };
    };

    sendNextFrame();
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const videoFile = event.target.files?.[0];

    if (videoFile && VALID_VIDEO_FORMATS.includes(videoFile.type)) {
      dispatch(setIsVideoLoading(true));

      const url = URL.createObjectURL(videoFile);
      setVideoUrl(url);

      let uploadVideoProgress = 0;
      const interval = setInterval(() => {
        uploadVideoProgress += 10;
        setUploadProgress(uploadVideoProgress);

        if (uploadVideoProgress >= 100) {
          clearInterval(interval);
          dispatch(setIsVideoLoading(false));
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

  return { videoUrl, uploadProgress, handleVideoUpload };
};

export default useHandleVideoUpload;
