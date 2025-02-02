import React, { useRef, useState, useEffect } from "react";
import { Canvas, Rect, FabricImage, FabricText, Group } from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { imageExtensionRemover, extractFileName } from "../utils/stringFormatter";
import { setFrameId } from "../store/frameIdSlice";
import { frames } from "../utils/frames";
import { BoundingBox } from "../interfaces";

const IMAGE_SCALE = 0.16;

const FrameCanvas: React.FC = () => {
    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    const predictionResults = useSelector((state: RootState) => state.frameCanvas);
    const [canvas, setCanvas] = useState<Canvas | null>(null);
    const [fabricObjects, setFabricObjects] = useState<any>([]);
    const [selectedFrame, setSelectedFrame] = useState<string | null>(null);
    const [selectedFramePredictions, setSelectedFramePredictions] = useState<BoundingBox[][]>();
    const [frameRefsAndPredictions, setFrameRefsAndPredictions] = useState<Map<string, BoundingBox[][]>>()

    useEffect(() => {
        if (!selectedFramePredictions) return;

        const fabricObjectsList = selectedFramePredictions[0].flatMap((detectionResult: BoundingBox) => {
            const scaledBox = {
                left: detectionResult.box.left * IMAGE_SCALE,
                top: detectionResult.box.top * IMAGE_SCALE,
                width: detectionResult.box.width * IMAGE_SCALE,
                height: detectionResult.box.height * IMAGE_SCALE,
            };

            const boundingBox = new Rect({
                top: scaledBox.top,
                left: scaledBox.left,
                width: scaledBox.width,
                height: scaledBox.height,
                fill: "transparent",
                stroke: "yellow",
                strokeWidth: 1,
            });

            const predictionText = new FabricText(detectionResult.class_name, {
                top: scaledBox.top - 20,
                left: scaledBox.left,
                fontSize: 16,
                fill: "yellow",
            });

            return [boundingBox, predictionText];
        });

        setFabricObjects(fabricObjectsList);
    }, [selectedFramePredictions]);

    useEffect(() => {
        if (canvasRef.current) {
            const initCanvas = new Canvas(canvasRef.current, {
                width: 590,
                height: 330,
            });

            initCanvas.backgroundColor = "#aaa";
            initCanvas.renderAll();

            setCanvas(initCanvas);

            return () => {
                initCanvas.dispose();
            };
        }
    }, []);

    useEffect(() => {
        if (selectedFrame) {
            const frameReference = extractFileName(selectedFrame)
            const predictions = frameRefsAndPredictions?.get(frameReference)
            if (predictions) {
                const frameId = predictions[0][0].frame_id
                dispatch(setFrameId(frameId))
            }
            setSelectedFramePredictions(predictions)
        }
    }, [selectedFrame, dispatch, frameRefsAndPredictions]);

    useEffect(() => {
        const frameRefAndBoundingBoxes: Map<string, BoundingBox[][]> = new Map()

        predictionResults.forEach((boundingBoxes: BoundingBox[]) => {
            const frameReference = imageExtensionRemover(boundingBoxes[0].frame_reference);
            if(frameRefAndBoundingBoxes.has(frameReference)) {
                frameRefAndBoundingBoxes.get(frameReference)?.push(boundingBoxes)
            } else {
                frameRefAndBoundingBoxes.set(frameReference, [boundingBoxes])
            }
        });

        setFrameRefsAndPredictions(frameRefAndBoundingBoxes)
    }, [predictionResults]);

    useEffect(() => {
        if (canvas && fabricObjects.length > 0 && selectedFrame) {
            const frameImage = new Image();
            frameImage.src = selectedFrame;

            const predictionImage = new FabricImage(frameImage, {
                left: 0,
                top: 0,
                scaleX: IMAGE_SCALE,
                scaleY: IMAGE_SCALE,
                selectable: false,
                hasControls: false,
            });

            const canvasGroup = new Group(fabricObjects, {
                left: 25,
                top: -10,
                hasControls: false,
                selectable: false,
            });

            canvas.clear()
            canvas.renderAll()

            canvas.add(predictionImage);
            canvas.add(canvasGroup);
            canvas.moveObjectTo(canvasGroup, 1);
        }
    }, [canvas, fabricObjects, selectedFrame]);

    const handleFrameSelect = (frame: string) => {
        setSelectedFrame(frame);
    };

    return (
        <div className="App">
            <div className="text-center">
                <h3 className="text-lg font-bold mb-4">Preview Area</h3>
                <span>{extractFileName(selectedFrame)}</span>
            </div>
            <canvas id="canvas" ref={canvasRef} />

            <div className="mt-8">
                <h3 className="text-m font-bold text-center mb-4">Select a Frame</h3>

                {predictionResults.length === 0 ? (
                    <div className="flex items-center justify-center w-full h-24 border-2 border-dashed text-gray-500">
                        <span>No frames available</span>
                    </div>
                ) : (
                    <div className="flex overflow-x-auto space-x-4 justify-center">
                        {frames.map((frameSrc, index) => (
                            <img
                                key={index}
                                src={frameSrc}
                                alt={`Frame ${index + 1}`}
                                className="w-20 h-20 object-cover cursor-pointer"
                                onClick={() => handleFrameSelect(frameSrc)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FrameCanvas;
