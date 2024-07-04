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
  barGap: number;
  onMouseOver: (event: React.MouseEvent, entry: { name: string }) => void;
  onMouseOut: () => void;
}

const Bar: React.FC<BarProps> = ({ data, dataKey, fill, width, height, maxValue, barIndex, totalBars, barGap, onMouseOver, onMouseOut }) => {
  return (
    <>
      {data.map((entry, index) => {
        const barHeight = (entry[dataKey] / maxValue) * height;
        const x = barIndex * (width + barGap);
        return (
          <rect
            key={`bar-${index}-${barIndex}`}
            x={x}
            y={height - barHeight}
            width={width}
            height={barHeight}
            fill={fill}
            onMouseOver={(event) => onMouseOver(event, entry)}
            onMouseOut={onMouseOut}
          />
        );
      })}
    </>
  );
};

export default Bar;
