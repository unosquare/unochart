import React, { useState, useRef, useEffect } from 'react';
import CartesianGrid from '../CartesianGrid';
import XAxis from '../XAxis';
import YAxis from '../YAxis';
import Tooltip from '../Tooltip';
import Legend from '../Legend';
import Bar from '../Bar';

interface BarChartProps {
  data: Array<{ name: string; [key: string]: any }>;
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

const parseGap = (gap: string | number, totalSize: number): number => {
  if (typeof gap === 'string' && gap.includes('%')) {
    return (parseFloat(gap) / 100) * totalSize;
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
  const [leftMargin, setLeftMargin] = useState(40);
  const [rightMargin, setRightMargin] = useState(margin.right ?? 5);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const yAxisLabels = svgRef.current.querySelectorAll('.y-axis text');
      const maxWidth = Array.from(yAxisLabels).reduce((maxWidth, text) => {
        const width = (text as SVGTextElement).getBBox().width;
        return Math.max(maxWidth, width);
      }, 0);
      setLeftMargin(maxWidth + (width * 0.025));
      setRightMargin(layout === 'vertical' ? maxWidth + (width * 0.1) + (margin.right ?? 5) : (margin.right ?? 5));
    }
  }, [data, layout, margin.right, width]);

  const maxValue = Math.max(...data.map(d => Math.max(...Object.values(d).filter(v => typeof v === 'number'))));
  const roundedMaxValue = roundMaxValue(maxValue);
  const barComponents = React.Children.toArray(children).filter(child => (child as React.ReactElement).type === Bar);
  const xAxisComponent = React.Children.toArray(children).find(child => (child as React.ReactElement).type === XAxis);
  const yAxisComponent = React.Children.toArray(children).find(child => (child as React.ReactElement).type === YAxis);
  const cartesianGridComponent = React.Children.toArray(children).find(child => (child as React.ReactElement).type === CartesianGrid);
  const legendComponent = React.Children.toArray(children).find(child => (child as React.ReactElement).type === Legend);
  const tooltipComponent = React.Children.toArray(children).find(child => (child as React.ReactElement).type === Tooltip);

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
    const svgRect = svgRef.current?.getBoundingClientRect();
    if (svgRect) {
      setPosition({ x: event.clientX - svgRect.left, y: event.clientY - svgRect.top });
    }
  };

  const handleMouseOut = () => {
    setTooltipData(null);
  };

  const categoryGap = parseGap(barCategoryGap, layout === 'horizontal' ? width - (margin.left ?? 5) - rightMargin - leftMargin : height - (margin.top ?? 5) - (margin.bottom ?? 5));
  const adjustedCategoryGap = categoryGap / data.length;
  const barZoneSize = layout === 'horizontal'
    ? (width - (margin.left ?? 5) - rightMargin - leftMargin) / data.length
    : (height - (margin.top ?? 5) - (margin.bottom ?? 5)) / data.length;
  const adjustedBarGap = parseGap(barGap, barZoneSize - adjustedCategoryGap);

  const barSize = (barZoneSize - adjustedCategoryGap - (adjustedBarGap * (barComponents.length - 1))) / barComponents.length;

  return (
    <div className="relative inline-block" style={{ margin: `${margin.top ?? 5}px ${margin.right ?? 5}px ${margin.bottom ?? 5}px ${margin.left ?? 5}px` }}>
      <svg ref={svgRef} width={width} height={height + (height * 0.1)} className="border border-gray-300">
        <g transform={`translate(${(margin.left ?? 5) + leftMargin}, ${(margin.top ?? 5) + (height * 0.025)})`}>
          {layout === 'horizontal' && (
            <>
              {yAxisComponent && <YAxis height={height - (margin.top ?? 5) - (margin.bottom ?? 5)} maxValue={roundedMaxValue} layout={layout} />}
              {cartesianGridComponent && <CartesianGrid width={width - (margin.left ?? 5) - rightMargin - leftMargin} height={height - (margin.top ?? 5) - (margin.bottom ?? 5)} maxValue={roundedMaxValue} layout={layout} />}
              {xAxisComponent && <XAxis data={data} width={width - (margin.left ?? 5) - rightMargin - leftMargin} height={height - (margin.top ?? 5) - (margin.bottom ?? 5)} dataKey="name" layout={layout} />}
            </>
          )}
          {layout === 'vertical' && (
            <>
              {xAxisComponent && <XAxis data={data} width={width - (margin.left ?? 5) - rightMargin} height={height - (margin.top ?? 5) - (margin.bottom ?? 5)} dataKey="name" maxValue={roundedMaxValue} layout={layout} />}
              {cartesianGridComponent && <CartesianGrid width={width - (margin.left ?? 5) - rightMargin} height={height - (margin.top ?? 5) - (margin.bottom ?? 5)} maxValue={roundedMaxValue} layout={layout} />}
              {yAxisComponent && <YAxis data={data} width={width - (margin.left ?? 5) - rightMargin} height={height - (margin.top ?? 5) - (margin.bottom ?? 5)} layout={layout} />}
            </>
          )}
          {data.map((entry, index) => (
            <g key={index} transform={layout === 'horizontal' 
              ? `translate(${index * barZoneSize + adjustedCategoryGap / 2}, 0)` 
              : `translate(0, ${index * barZoneSize + adjustedCategoryGap / 2})`
            }>
              {barComponents.map((child, barIndex) =>
                React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<any>, {
                  data: [entry],
                  width: layout === 'horizontal' ? barSize : width - (margin.left ?? 5) - rightMargin,
                  height: layout === 'horizontal' ? height - (margin.top ?? 5) - (margin.bottom ?? 5) : barSize,
                  maxValue: roundedMaxValue,
                  barIndex,
                  totalBars: barComponents.length,
                  barGap: adjustedBarGap,
                  layout,
                  onMouseOver: (event: React.MouseEvent) => handleMouseOver(event, { name: entry.name }),
                  onMouseOut: handleMouseOut,
                }) : null
              )}
            </g>
          ))}
        </g>
      </svg>
      {legendComponent && <Legend items={legendItems} />}
      {tooltipComponent && <Tooltip tooltipData={tooltipData} position={position} />}
    </div>
  );
};

export default BarChart;
