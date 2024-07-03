import React, { useState } from 'react';
import CartesianGrid from '../CartesianGrid';
import XAxis from '../XAxis';
import YAxis from '../YAxis';
import Tooltip from '../Tooltip';
import Legend from '../Legend';
import Bar from '../Bar';

interface BarChartProps {
  data: Array<{ [key: string]: any }>;
  width?: number;
  height?: number;
  barColor?: string;
  children?: React.ReactNode;
}

const roundMaxValue = (value: number): number => {
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
  return Math.ceil(value / magnitude) * magnitude;
};

const BarChart: React.FC<BarChartProps> = ({ data, width = 400, height = 300, barColor = '#8884d8', children }) => {
  const [tooltipData, setTooltipData] = useState<{ name: string; values: { key: string; value: number, color: string }[] } | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const maxValue = Math.max(...data.map(d => Math.max(...Object.values(d).filter(v => typeof v === 'number'))));
  const roundedMaxValue = roundMaxValue(maxValue);
  const barComponents = React.Children.toArray(children).filter(child => (child as React.ReactElement).type === Bar);

  const legendItems = barComponents.map((child, index) => {
    if (React.isValidElement(child)) {
      return { color: child.props.fill, label: child.props.dataKey };
    }
    return { color: '', label: '' };
  });

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

  const handleMouseOut = () => {
    setTooltipData(null);
  };

  return (
    <div className="relative inline-block">
      <svg width={width} height={height + 50} className="border border-gray-300">
        <g transform="translate(40, 10)">
          <YAxis height={height} maxValue={roundedMaxValue} />
          <CartesianGrid width={width - 40} height={height} maxValue={roundedMaxValue} />
          <XAxis data={data} width={width - 40} height={height} dataKey="name" />

          {data.map((entry, index) => (
            <g key={index} transform={`translate(${(index * (width - 40)) / data.length}, 0)`}>
              {barComponents.map((child, barIndex) =>
                React.isValidElement(child) ? React.cloneElement(child, {
                  data: [entry],
                  width: (width - 40) / data.length,
                  height,
                  maxValue: roundedMaxValue,
                  barIndex,
                  totalBars: barComponents.length,
                  onMouseOver: (event: React.MouseEvent) => handleMouseOver(event, entry),
                  onMouseOut: handleMouseOut,
                }) : null
              )}
            </g>
          ))}
        </g>
      </svg>
      <Legend items={legendItems} />
      <Tooltip tooltipData={tooltipData} position={position} />
    </div>
  );
};

export default BarChart;
