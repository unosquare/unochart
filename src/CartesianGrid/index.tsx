import React from 'react';

interface CartesianGridProps {
  width: number;
  height: number;
  maxValue: number;
  strokeDasharray?: string;
}

const CartesianGrid: React.FC<CartesianGridProps> = ({ width, height, maxValue, strokeDasharray = "3 3" }) => {
  const horizontalLines = [];
  const verticalLines = [];
  const tickInterval = Math.ceil(maxValue / 5);

  for (let i = 0; i <= maxValue; i += tickInterval) {
    horizontalLines.push(
      <line
        key={`grid-horizontal-${i}`}
        x1="0"
        y1={height - (i / maxValue) * height}
        x2={width}
        y2={height - (i / maxValue) * height}
        stroke="#e0e0e0"
        strokeDasharray={strokeDasharray}
      />
    );
  }

  for (let i = 0; i <= 10; i++) {
    verticalLines.push(
      <line
        key={`grid-vertical-${i}`}
        x1={(i * width) / 10}
        y1="0"
        x2={(i * width) / 10}
        y2={height}
        stroke="#e0e0e0"
        strokeDasharray={strokeDasharray}
      />
    );
  }

  return <g>{horizontalLines}{verticalLines}</g>;
};

export default CartesianGrid;