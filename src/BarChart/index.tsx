import React, { useState } from 'react';
import CartesianGrid from '../CartesianGrid';
import XAxis from '../XAxis';
import YAxis from '../YAxis';
import Tooltip from '../Tooltip';
import Legend from '../Legend';
import Bar from '../Bar';

// Define the props interface for BarChart
interface BarChartProps {
  data: Array<{ [key: string]: any }>;
  width?: number;
  height?: number;
  barColor?: string;
  children?: React.ReactNode;
}

const BarChart: React.FC<BarChartProps> = ({ data, width = 400, height = 300, barColor = '#8884d8', children }) => {
  // State to hold tooltip data
  const [tooltipData, setTooltipData] = useState<{ name: string; values: { key: string; value: number, color: string }[] } | null>(null);
  // State to hold the position of the tooltip
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Calculate the maximum value from the data for scaling the bars
  const maxValue = Math.max(...data.map(d => Math.max(...Object.values(d).filter(v => typeof v === 'number'))));

  // Separate the Bar components from other components
  const barComponents = React.Children.toArray(children).filter(child => (child as React.ReactElement).type === Bar);
  const otherComponents = React.Children.toArray(children).filter(child => (child as React.ReactElement).type !== Bar);

  // Create legend items based on the Bar components
  const legendItems = barComponents.map((child, index) => {
    if (React.isValidElement(child)) {
      return { color: child.props.fill, label: child.props.dataKey };
    }
    return { color: '', label: '' };
  });

  // Handle mouse over event for bars to show the tooltip
  const handleMouseOver = (event: React.MouseEvent, entry: { name: string }) => {
    const values = barComponents.map((child) => {
      if (React.isValidElement(child)) {
        const dataKey = child.props.dataKey;
        const value = data.find((d) => d.name === entry.name)[dataKey];
        return { key: dataKey, value, color: child.props.fill };
      }
      return null;
    }).filter((val) => val !== null);

    setTooltipData({ name: entry.name, values });
    setPosition({ x: event.clientX, y: event.clientY });
  };

  // Handle mouse out event to hide the tooltip
  const handleMouseOut = () => {
    setTooltipData(null);
  };

  return (
    <div className="relative inline-block">
      <svg width={width} height={height + 50} className="border border-gray-300">
        {/* Render non-Bar components with additional props */}
        {otherComponents.map((child) =>
          React.isValidElement(child) ? React.cloneElement(child, { data, width, height, maxValue }) : child
        )}
        {/* Render Bar components grouped by data entries */}
        {data.map((entry, index) => (
          <g key={index} transform={`translate(${(index * width) / data.length}, 0)`}>
            {barComponents.map((child, barIndex) =>
              React.isValidElement(child) ? React.cloneElement(child, {
                data: [entry],
                width: width / data.length,
                height,
                maxValue,
                barIndex,
                totalBars: barComponents.length,
                onMouseOver: (event: React.MouseEvent) => handleMouseOver(event, entry),
                onMouseOut: handleMouseOut,
              }) : null
            )}
          </g>
        ))}
      </svg>
      {/* Render Legend below the SVG */}
      <Legend items={legendItems} />
      {/* Render Tooltip outside the SVG */}
      <Tooltip tooltipData={tooltipData} position={position} />
    </div>
  );
};

export default BarChart;
