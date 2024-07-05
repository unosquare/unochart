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
  layout: 'horizontal' | 'vertical';
  onMouseOver: (event: React.MouseEvent, entry: { name: string }) => void;
  onMouseOut: () => void;
}

const Bar: React.FC<BarProps> = ({ data, dataKey, fill, width, height, maxValue, barIndex, totalBars, barGap, layout, onMouseOver, onMouseOut }) => {
  return (
    <>
      {data.map((entry, index) => {
        const value = entry[dataKey];
        const size = (value / maxValue) * (layout === 'horizontal' ? height : width);
        const x = layout === 'horizontal' ? barIndex * (width + barGap) : 0;
        const y = layout === 'horizontal' ? height - size : barIndex * (height + barGap);
        return (
          <rect
            key={`bar-${index}-${barIndex}`}
            x={x}
            y={y}
            width={layout === 'horizontal' ? width : size}
            height={layout === 'horizontal' ? size : height}
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
