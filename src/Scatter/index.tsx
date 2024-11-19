import React from 'react';
import LabelList, { LabelListProps } from '../LabelList';

interface ScatterProps {
  data: Array<{ [key: string]: any }>;
  xScale: (value: number) => number;
  yScale: (value: number) => number;
  fill?: string;
  line?: boolean;
  hoveredPoint?: number | null;
  children?: React.ReactNode;
}

const Scatter: React.FC<ScatterProps> = ({
  data,
  xScale,
  yScale,
  fill = 'blue',
  line = false,
  hoveredPoint = null,
  children,
}) => {
  const sortedData = [...data].sort((a, b) => a.x - b.x);

  return (
    <>
      {sortedData.map((point, index) => (
        <React.Fragment key={index}>
          <circle
            cx={xScale(point.x)}
            cy={yScale(point.y)}
            r={5}
            fill={fill}
          />
          {line && index > 0 && (
            <line
              x1={xScale(sortedData[index - 1].x)}
              y1={yScale(sortedData[index - 1].y)}
              x2={xScale(point.x)}
              y2={yScale(point.y)}
              stroke={fill}
              strokeWidth={2}
            />
          )}
        </React.Fragment>
      ))}
      {React.Children.map(children, (child) => {
        if (React.isValidElement<LabelListProps>(child) && child.type === LabelList) {
          return React.cloneElement(child, {
            data: sortedData,
            xScale,
            yScale,
          });
        }
        return child;
      })}
    </>
  );
};

export default Scatter;