import { useState } from "react";

const VALID_VIDEO_FORMATS = ["video/mp4"];

const useHandleVideoUpload = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

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
    } else {
      alert("Please upload a valid MP4 video");
    }
  };

  return { videoUrl, loading, uploadProgress, handleVideoUpload };
};

export default useHandleVideoUpload;
