import React from 'react';

interface XAxisProps {
  data: Array<{ [key: string]: any }>;
  width: number;
  height: number;
  dataKey: string;
}

const XAxis: React.FC<XAxisProps> = ({ data, width, height, dataKey }) => {
  const ticks = data.map((entry, index) => (
    <g key={`x-axis-${index}`} transform={`translate(${(index * width) / data.length + (width / data.length) / 2}, 0)`}>
      <line x1="0" x2="0" y1={height} y2={height + 6} stroke="black" />
      <text x="0" y={height + 20} textAnchor="middle" fontSize="10">
        {entry[dataKey]}
      </text>
    </g>
  ));
  return (
    <g>
      {ticks}
    </g>
  );
};

export default XAxis;
