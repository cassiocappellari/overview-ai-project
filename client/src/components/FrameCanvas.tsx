import React, { useRef, useState, useEffect } from "react"
import { Canvas, Rect, FabricImage, FabricText } from "fabric"
import busImage from "../images/bus.jpg";

const FrameCanvas: React.FC = () => {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState<Canvas | null>(null);

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
        if (canvas) {
            const boundingBox = new Rect({
                top: 300,
                left: 50,
                width: 300,
                height: 60,
                fill: "transparent",
                stroke: "#07FE3D",
                strokeWidth: 2
            })

            const frameImage = new Image()
            frameImage.src = busImage

            const predictionImage = new FabricImage(frameImage, {
                left: 0,
                top: 0,
                height: 500,
                width: 600,
                selectable: false,
                hasControls: false,
                hasBorders: false,
                cornerStrokeColor: "#ff0098"
            })

            const predictionText = new FabricText("Hello", {
                left: 150,
                top: 250,
                fontSize: 24,
                fill: 'black',
            })

            canvas.add(boundingBox, predictionImage, predictionText)
        }

    }, [canvas])

    return <div className="App">
        <canvas id="canvas" ref={ canvasRef } />
    </div>
};

export default FrameCanvas;
