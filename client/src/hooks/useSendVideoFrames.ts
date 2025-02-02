import { useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { objectsDetectionRequest } from "../services/pythonApi";
import { setBoundingBox } from "../store/frameCanvasSlice";
import { setIsVideoPlaying } from "../store/videoPlayerSlice";

const useSendVideoFrames = () => {
  const dispatch = useDispatch();
  const confidence = useSelector((state: RootState) => state.configPanel.confidence);
  const iou = useSelector((state: RootState) => state.configPanel.iou);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const frameCounter = useRef(1);

  const captureFrameAndSendToAPI = useCallback(async () => {
    const frameRef = frameCounter.current++;

    if (frameRef <=10) {
      const requestData = {
        image_path: `./captured_frames/frame_00${frameRef}.png`,
        confidence,
        iou,
      };

      const result = await objectsDetectionRequest(requestData);
      dispatch(setBoundingBox(result.data));
    }
  }, [confidence, iou, dispatch]);

  const handleVideoPlay = () => {
    dispatch(setIsVideoPlaying(true))

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(captureFrameAndSendToAPI, 1000);
  };

  const handleVideoPause = () => {
    dispatch(setIsVideoPlaying(false))

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return { handleVideoPlay, handleVideoPause };
};

export default useSendVideoFrames;
