import React, { useEffect, useRef, useState } from 'react';

import './builderPage.scss';
import { BodyType, Point, PositionType, Step, ToolbarActions } from '../../types';
import Toolbar from './toolbar';


const canvasWidth = 500;
const canvasHeight = 500;

const pixelSize = 16;

const MAX_POSITIONS = 4;

const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, location: Point) => {
  console.log("attempting to draw");
  let color = 'white';

  switch(location.type) {
    case 'leftHand':
      color = 'green';
      break;
    case 'rightHand':
      color = 'red';
      break;
    case 'leftFoot':
      color = 'black';
      break;
    case 'rightFoot':
      color = 'orange';
      break;
  }

  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 15;
  ctx.save();
  const rect = canvas.getBoundingClientRect();
  const x = location.x - rect.left - pixelSize/2;
  const y = location.y - rect.top - pixelSize/2;
  ctx.fillRect(x, y, pixelSize, pixelSize);
  // .restore(): Canvas 2D API restores the most recently saved canvas state
  ctx.restore();
};

const BuilderPage = () => {
  const [currentPositions, setPositions] = useState<PositionType | null>(null);
  const [selectedType, setSelectedType] = useState<BodyType | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [stepPosition, setStepPosition] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleClick = (event: any) => {
    if (selectedType !== null) {
      const newPoint: Point = { x: event.clientX, y: event.clientY, type: selectedType };
      setPositions(prevState => ({
        ...prevState,
        [selectedType]: newPoint
      }));
    }
  };

  const setCurrentStep = (newPosition: number, currentPosition: number, data: Step) => {
    setSteps(prevState => {
      if (newPosition < prevState.length) {
        setPositions(prevState[newPosition].positions);
      } else {
        setPositions(null);
      }

      setStepPosition(newPosition);

      if (currentPosition < prevState.length) {
        const newStep = [...prevState];
        newStep[currentPosition] = data;
        return newStep;
      } else {
        return [...prevState, data];
      }
    });
  };

  const selectType = (newType: ToolbarActions) => {
    console.log(stepPosition, steps.length, currentPositions);
    if (newType === 'forward') {
      if (currentPositions !== null) {
        const positionSize = Object.keys(currentPositions).length;
        if (!(steps.length === 0 && positionSize !== MAX_POSITIONS)
          && !(stepPosition >= steps.length - 1 && positionSize !== MAX_POSITIONS)) {
          setCurrentStep(stepPosition + 1, stepPosition, {
            positions: currentPositions,
            note: '',
            imgSrc: ''
          });
        }
      }
    } else if (newType === 'backward') {
      if (stepPosition !== 0) {
        setCurrentStep(stepPosition - 1, stepPosition, {
          positions: currentPositions,
          note: '',
          imgSrc: ''
        });
      }
    } else if (newType === 'note') {

    } else {
      if (newType === selectedType) {
        setSelectedType(null);
      } else {
        setSelectedType(newType);
      }
    }
  };
  console.log(steps);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (ctx) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        if (currentPositions) {
          (Object.keys(currentPositions) as BodyType[]).forEach((typeName: BodyType) => {
            draw(canvasRef.current as HTMLCanvasElement, ctx, currentPositions[typeName]!);
          });
        }
      }
    }
  }, [currentPositions]);

  return (
    <div className="builder-page-container">
      Beta builder
      <div style={{ width: canvasWidth, height: canvasHeight }}>
        <canvas
          style={{
            background: 'url(https://cdn2.apstatic.com/photos/climb/106515831_large_1494116253.jpg)',
            backgroundSize: 'cover'
          }}
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          onClick={handleClick}
        />
      </div>
      <Toolbar selectedButton={selectType} stepNumber={stepPosition + 1}/>
    </div>
  )
};

export default BuilderPage;
