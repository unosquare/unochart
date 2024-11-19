import React from 'react';
import LabelList from '../LabelList';

interface ScatterProps {
  data: Array<{ x: number; y: number; z?: number }>;
  xScale: (value: number) => number;
  yScale: (value: number) => number;
  fill?: string;
  line?: boolean;
  hoveredPoint: number | null;
  children?: React.ReactNode;
}

const Scatter: React.FC<ScatterProps> = ({
  data,
  xScale,
  yScale,
  fill = 'blue',
  line = false,
  hoveredPoint,
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
            className=""
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
      {/* Renderizar los hijos como LabelList */}
      {children &&
        React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === LabelList) {
            return React.cloneElement(child, { data, xScale, yScale });
          }
          return null;
        })}
    </>
  );
};

export default Scatter;
