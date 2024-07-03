import React from 'react';

interface YAxisProps {
  height: number;
  maxValue: number;
}

const YAxis: React.FC<YAxisProps> = ({ height, maxValue }) => {
  const ticks = [];
  const tickInterval = Math.ceil(maxValue / 5);

  for (let i = 0; i <= maxValue; i += tickInterval) {
    ticks.push(
      <text key={`y-axis-${i}`} x={-10} y={height - (i / maxValue) * height + 5} textAnchor="end">
        {i}
      </text>
    );
  }
  return <>{ticks}</>;
};

export default YAxis;
