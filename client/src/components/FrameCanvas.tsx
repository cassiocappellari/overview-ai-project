import React, { useRef, useState, useEffect } from "react";
import { Canvas, Rect, FabricImage, FabricText, Group } from "fabric";
import frame from "../images/1.png";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { BoundingBox } from "../store/frameCanvasSlice";

const IMAGE_SCALE = 0.16;

const FrameCanvas: React.FC = () => {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState<Canvas | null>(null);
    const detectionResults = useSelector((state: RootState) => state.frameCanvas);
    const [fabricObjects, setFabricObjects] = useState<any>([]);

    useEffect(() => {
        if (!detectionResults.length) return;

        const fabricObjectsList = detectionResults.flatMap((detectionResult: BoundingBox) => {
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
    }, [detectionResults]);

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
        if (canvas && fabricObjects.length > 0) {
            const frameImage = new Image();
            frameImage.src = frame;

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
                top: 180,
                hasControls: false,
                selectable: false,
            });

            canvas.add(predictionImage);
            canvas.add(canvasGroup);
            canvas.moveObjectTo(canvasGroup, 1);
        }
    }, [canvas, fabricObjects]);

    return (
        <div className="App">
            <div>
                <h3 className="text-lg font-bold mb-4 text-center">Preview Area</h3>
            </div>
            <canvas id="canvas" ref={canvasRef} />
        </div>
    );
};

export default FrameCanvas;
