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
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  barCategoryGap?: string | number;
  barGap?: string | number;
  layout?: 'horizontal' | 'vertical';
}

const roundMaxValue = (value: number): number => {
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
  return Math.ceil(value / magnitude) * magnitude;
};

const parseGap = (gap: string | number, totalWidth: number): number => {
  if (typeof gap === 'string' && gap.includes('%')) {
    return (parseFloat(gap) / 100) * totalWidth;
  }
  return Number(gap);
};

const BarChart: React.FC<BarChartProps> = ({
  data,
  width = 400,
  height = 300,
  barColor = '#8884d8',
  children,
  margin = { top: 5, right: 5, bottom: 5, left: 5 },
  barCategoryGap = '10%',
  barGap = 4,
  layout = 'horizontal',
}) => {
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
        const value = data.find((d) => d.name === entry.name)?.[dataKey] ?? 0;
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

  const categoryGap = parseGap(barCategoryGap, layout === 'horizontal' ? width - margin.left - margin.right - 40 : height - margin.top - margin.bottom - 40);
  const adjustedCategoryGap = categoryGap / data.length;
  const barZoneSize = layout === 'horizontal'
    ? (width - margin.left - margin.right - 40) / data.length
    : (height - margin.top - margin.bottom - 40) / data.length;
  const adjustedBarGap = parseGap(barGap, barZoneSize - adjustedCategoryGap);
  const barSize = (barZoneSize - adjustedCategoryGap - (adjustedBarGap * (barComponents.length - 1))) / barComponents.length;

  return (
    <div className="relative inline-block" style={{ margin: `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px` }}>
      <svg width={width} height={height + 50} className="border border-gray-300">
        <g transform={`translate(${margin.left + 40}, ${margin.top + 10})`}>
          {layout === 'horizontal' && (
            <>
              <YAxis height={height - margin.top - margin.bottom} maxValue={roundedMaxValue} />
              <CartesianGrid width={width - margin.left - margin.right - 40} height={height - margin.top - margin.bottom} maxValue={roundedMaxValue} />
              <XAxis data={data} width={width - margin.left - margin.right - 40} height={height - margin.top - margin.bottom} dataKey="name" />
            </>
          )}
          {layout === 'vertical' && (
            <>
              <XAxis data={data} width={width - margin.left - margin.right} height={height - margin.top - margin.bottom} dataKey="name" />
              <CartesianGrid width={width - margin.left - margin.right} height={height - margin.top - margin.bottom} maxValue={roundedMaxValue} />
              <YAxis height={height - margin.top - margin.bottom} maxValue={roundedMaxValue} />
            </>
          )}
          {data.map((entry, index) => (
            <g key={index} transform={layout === 'horizontal' 
              ? `translate(${index * barZoneSize + adjustedCategoryGap / 2}, 0)` 
              : `translate(0, ${index * barZoneSize + adjustedCategoryGap / 2})`
            }>
              {barComponents.map((child, barIndex) =>
                React.isValidElement(child) ? React.cloneElement(child, {
                  data: [entry],
                  width: layout === 'horizontal' ? barSize : width - margin.left - margin.right,
                  height: layout === 'horizontal' ? height - margin.top - margin.bottom : barSize,
                  maxValue: roundedMaxValue,
                  barIndex,
                  totalBars: barComponents.length,
                  barGap: adjustedBarGap,
                  layout,
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
