// Line.tsx
import React from 'react';

interface LineProps {
  data: Array<{ [key: string]: any }>;
  dataKey: string;
  stroke: string;
  type?: 'monotone' | 'linear';
  onMouseOver?: (event: React.MouseEvent, entry: { name: string; [key: string]: any }) => void;
  onMouseOut?: () => void;
}

const Line: React.FC<LineProps> = ({
  data = [],
  dataKey,
  stroke,
  type = 'linear',
  onMouseOver = () => {},
  onMouseOut = () => {},
}) => {
  if (!data.length) return null;

  const points = data
    .map((entry, index) => {
      const x = (index / (data.length - 1)) * 730;
      const y = 250 - (entry[dataKey] / Math.max(...data.map((d) => d[dataKey]))) * 250;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <polyline
      points={points}
      fill="none"
      stroke={stroke}
      strokeWidth={2}
      onMouseOver={(event) => onMouseOver(event, { name: dataKey })}
      onMouseOut={onMouseOut}
      style={{ transition: 'all 0.3s' }}
    />
  );
};

export default Line;
