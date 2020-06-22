import React from 'react';

import { ToolbarActions } from '../../types';

interface ToolbarProps {
  stepNumber: number;
  selectedButton: (type: ToolbarActions) => void;
}



const Toolbar = ({ selectedButton, stepNumber }: ToolbarProps) => {

  const onClick = (type: ToolbarActions) => () => {
    selectedButton(type);
  };

  return (
    <div>
      <button onClick={onClick('leftHand')}>
        Left Hand
      </button>
      <button onClick={onClick('rightHand')}>
        Right Hand
      </button>
      <button onClick={onClick('leftFoot')}>
        Left Foot
      </button>
      <button onClick={onClick('rightFoot')}>
        Right Foot
      </button>
      <button onClick={onClick('backward')}>
        {'<'}
      </button>
      <div>
        {stepNumber}
      </div>
      <button onClick={onClick('forward')}>
        {'>'}
      </button>
    </div>
  )
};

export default Toolbar;