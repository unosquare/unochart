import React from 'react';

interface AreaChartProps {
  data: Array<{ [key: string]: any }>;
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  children: React.ReactNode;
}

const AreaChart: React.FC<AreaChartProps> = ({ data, width, height, margin, children }) => {
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Calculate xScale and yScale functions
  const xScale = (value: any) => {
    const index = data.findIndex((item) => item.day === value);
    if (index !== -1) {
      return (index / (data.length - 1)) * chartWidth + margin.left;
    }
    return NaN; // Return NaN if the value is not found
  };

  const yScale = (value: number) => {
    const allValues = data.flatMap((item) => item.temperature || []);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    if (maxValue === minValue) {
      return chartHeight / 2; // Handle case where all values are the same
    }
    return chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight + margin.top;
  };

  return (
    <svg width={width} height={height} className="bg-white">
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const clonedProps = {
              data,
              xScale,
              yScale,
              width: chartWidth,
              height: chartHeight,
              margin,
            };
            return React.cloneElement(child, clonedProps);
          }
          return null;
        })}
      </g>
    </svg>
  );
};

export default AreaChart;
