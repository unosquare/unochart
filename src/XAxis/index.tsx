import React from 'react';

interface XAxisProps {
  dataKey: string;
  data: Array<{ [key: string]: any }>;
  width: number;
  height: number;
}

const XAxis: React.FC<XAxisProps> = ({ dataKey, data, width, height }) => {
  const ticks = data.map((entry, index) => (
    <text key={`x-axis-${index}`} x={(index + 0.5) * (width / data.length)} y={height + 20} textAnchor="middle">
      {entry[dataKey]}
    </text>
  ));
  return <>{ticks}</>;
};

export default XAxis;
