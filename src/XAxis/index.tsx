import React from 'react';

interface XAxisProps {
  data: Array<{ [key: string]: any }>;
  width: number;
  height: number;
  dataKey: string;
}

const XAxis: React.FC<XAxisProps> = ({ data, width, height, dataKey }) => {
  const ticks = data.map((entry, index) => (
    <text key={`x-axis-${index}`} x={(index * width) / data.length + (width / data.length) / 2} y={height + 20} textAnchor="middle" fontSize="10">
      {entry[dataKey]}
    </text>
  ));
  return (
    <g>
      {ticks}
    </g>
  );
};

export default XAxis;
