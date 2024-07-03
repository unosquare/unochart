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
      <g key={`y-axis-${i}`} transform={`translate(0, ${height - (i / maxValue) * height})`}>
        <line x1="0" x2="-6" stroke="black" />
        <text x="-10" y="5" textAnchor="end" fontSize="10">
          {i}
        </text>
      </g>
    );
  }
  return (
    <g>
      {ticks}
    </g>
  );
};

export default YAxis;
