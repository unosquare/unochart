import React from 'react';

interface AreaProps {
  data: Array<{ [key: string]: any }>;
  dataKey: string;
  stroke: string;
  fill: string;
  xScale: (value: any) => number;
  yScale: (value: any) => number;
}

const Area: React.FC<AreaProps> = ({ data, dataKey, stroke, fill, xScale, yScale }) => {
  if (!data || data.length === 0) return null;

  // Generate path for the area
  const upperPath = data
    .map((point) => {
      const value = point[dataKey];
      if (!value || !Array.isArray(value) || value.length !== 2) return '';
      const x = xScale(point.day);
      const y = yScale(value[1]); // Upper bound
      return `L ${x} ${y}`;
    })
    .join(' ')
    .replace(/^L/, 'M');

  const lowerPath = data
    .map((point) => {
      const value = point[dataKey];
      if (!value || !Array.isArray(value) || value.length !== 2) return '';
      const x = xScale(point.day);
      const y = yScale(value[0]); // Lower bound
      return `L ${x} ${y}`;
    })
    .reverse()
    .join(' ');

  const completePath = `${upperPath} ${lowerPath} Z`;

  return (
    <path
      d={completePath}
      stroke={stroke}
      fill={fill}
      strokeWidth={2}
      fillOpacity={0.6}
      className="transition-all duration-300 ease-in-out"
    />
  );
};

export default Area;
