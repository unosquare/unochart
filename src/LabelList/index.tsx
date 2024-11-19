import React from 'react';

interface LabelListProps {
  data: Array<{ [key: string]: any }>;
  xScale: (value: number) => number;
  yScale: (value: number) => number;
  dataKey: string;
  offsetX?: number;
  offsetY?: number;
  fill?: string;
  fontSize?: number;
}

const LabelList: React.FC<LabelListProps> = ({
  data,
  xScale,
  yScale,
  dataKey,
  offsetX = 0,
  offsetY = -10,
  fill = 'black',
  fontSize = 12,
}) => {
  return (
    <>
      {data.map((point, index) => {
        const value = point[dataKey];
        if (value === undefined || value === null) return null;

        const x = xScale(point.x);
        const y = yScale(point.y);

        return (
          <text
            key={`label-${index}`}
            x={x + offsetX}
            y={y + offsetY}
            fill={fill}
            fontSize={fontSize}
            textAnchor="middle"
          >
            {value}
          </text>
        );
      })}
    </>
  );
};

export default LabelList;
