import React, { useRef, useState, useEffect } from "react"
import { Canvas, Rect, FabricImage, FabricText, Group } from "fabric"
import frame from "../images/0001.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const FrameCanvas: React.FC = () => {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState<Canvas | null>(null);
    const detectionResults = useSelector((state: RootState) => state.frameCanvas);
    const [fabricObjects, setFabricObjects] = useState<any>([])

    useEffect(() => {
        const fabricObjectsList = detectionResults.flatMap((detectionResult) => {
            const boundingBox = new Rect({
                top: 10,
                left: detectionResult.box.left,
                width: detectionResult.box.width,
                height: detectionResult.box.height,
                fill: "transparent",
                stroke: "black",
                strokeWidth: 2,
            });
    
            const predictionText = new FabricText(detectionResult.class_name, {
                top: 90,
                left: detectionResult.box.left,
                fontSize: 24,
                fill: 'black',
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
            }
        }
    }, [])

    useEffect(() => {
        if (canvas && fabricObjects) {
            const frameImage = new Image()
            frameImage.src = frame

            const predictionImage = new FabricImage(frameImage, {
                left: 0,
                top: 0,
                scaleX: 0.35,
                scaleY: 0.35,
                selectable: false,
                hasControls: false,
            })

            const canvasGroup = new Group(fabricObjects, {
                left: 50,
                hasControls: false,
                selectable: false,
            })

            canvas.add(canvasGroup)
            canvas.add(predictionImage)
            canvas.moveObjectTo(canvasGroup, 1)
        }
    }, [canvas, fabricObjects])

    return <div className="App">
        <div>
            <h3 className="text-lg font-bold mb-4 text-center">Preview Area</h3>
        </div>
        <canvas id="canvas" ref={ canvasRef } />
    </div>
};

export default FrameCanvas;
