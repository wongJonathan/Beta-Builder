export type BodyType = 'leftHand' | 'rightHand' | 'leftFoot' | 'rightFoot';

export type ToolbarActions = BodyType | 'forward' | 'backward' | 'note';

export type Point = {
  x: number;
  y: number;
  type: BodyType;
};

export type PositionType = Partial<Record<BodyType, Point>>;

export type Step = {
  positions: PositionType | null;
  note: string;
  imgSrc: string;
}

export type Beta = {
  steps: Step[];
  name: string;
  description: string;
  points: number;
}
