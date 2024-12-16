import React from 'react';

interface RadialBarChartProps {
  width: number;
  height: number;
  innerRadius: string | number;
  outerRadius: string | number;
  data: Array<any>;
  startAngle?: number;
  endAngle?: number;
  children: React.ReactNode;
}

const RadialBarChart: React.FC<RadialBarChartProps> = ({
  width,
  height,
  innerRadius,
  outerRadius,
  data,
  startAngle = 180,
  endAngle = 0,
  children,
}) => {
  const cx = width / 2;
  const cy = height / 2;

  return (
    <svg width={width} height={height} className="bg-white">
      <g transform={`translate(${cx}, ${cy})`}>
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, { data, cx, cy, innerRadius, outerRadius, startAngle, endAngle })
            : null
        )}
      </g>
    </svg>
  );
};

export default RadialBarChart;
