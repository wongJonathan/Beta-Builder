import React, { useEffect, useRef, useState } from 'react';
import { Point } from '../../types';

// Path2D for a Heart SVG
const heartSVG = "M0 200 v-200 h200 a100,100 90 0,1 0,200 a100,100 90 0,1 -200,0 z"
const SVG_PATH = new Path2D(heartSVG);


// Scaling Constants for Canvas
const SCALE = 0.1;
const OFFSET = 80;

const draw = (ctx: CanvasRenderingContext2D, location: Point) => {
  console.log("attempting to draw")
  ctx.fillStyle = 'red';
  ctx.shadowColor = 'blue';
  ctx.shadowBlur = 15;
  ctx.save();
  ctx.scale(SCALE, SCALE);
  ctx.translate(location.x / SCALE - OFFSET, location.y / SCALE - OFFSET);
  ctx.rotate(225 * Math.PI / 180);
  ctx.fill(SVG_PATH);
  // .restore(): Canvas 2D API restores the most recently saved canvas state
  ctx.restore();
};

const useCanvas = ( canvasHeight: number, canvasWidth: number) => {
  const [coordinates, setCoordinates] = useState<Point[]>([]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (ctx) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        coordinates.forEach((coordinate) => {
          draw(ctx, coordinate)
        });
      }
    }
  }, [canvasHeight, canvasWidth, coordinates]);
  
  return canvasRef;
};

export default useCanvas;
