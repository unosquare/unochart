import React from 'react';

interface BarProps {
  data: Array<{ [key: string]: any }>;
  dataKey: string;
  fill: string;
  width: number;
  height: number;
  maxValue: number;
  barIndex: number;
  totalBars: number;
  onMouseOver: (event: React.MouseEvent, entry: { name: string; value: number }) => void;
  onMouseOut: () => void;
}

const Bar: React.FC<BarProps> = ({
  data,
  dataKey,
  fill,
  width,
  height,
  maxValue,
  barIndex,
  totalBars,
  onMouseOver,
  onMouseOut,
}) => {
  const barWidth = width / totalBars;

  return (
    <>
      {data.map((entry, index) => (
        <rect
          key={`bar-${index}-${barIndex}`}
          x={barIndex * barWidth}
          y={height - (entry[dataKey] / maxValue) * height}
          width={barWidth - 1}
          height={(entry[dataKey] / maxValue) * height}
          fill={fill}
          onMouseOver={(event) => onMouseOver(event, { name: entry.name, value: entry[dataKey] })}
          onMouseOut={onMouseOut}
        />
      ))}
    </>
  );
};

export default Bar;
