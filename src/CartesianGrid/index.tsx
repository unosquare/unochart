// src/CartesianGrid/index.tsx
import React from 'react';

interface CartesianGridProps {
  strokeDasharray?: string;
  width?: number;
  height?: number;
}

const CartesianGrid: React.FC<CartesianGridProps> = ({ strokeDasharray = "3 3", width, height }) => {
  const lines = [];
  for (let i = 0; i <= height!; i += 20) {
    lines.push(
      <line key={`h-${i}`} x1="0" y1={i} x2={width} y2={i} stroke="lightgray" strokeDasharray={strokeDasharray} />
    );
  }
  for (let i = 0; i <= width!; i += 20) {
    lines.push(
      <line key={`v-${i}`} x1={i} y1="0" x2={i} y2={height} stroke="lightgray" strokeDasharray={strokeDasharray} />
    );
  }
  return <>{lines}</>;
};

export default CartesianGrid;
