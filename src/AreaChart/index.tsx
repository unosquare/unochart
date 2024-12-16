import React, { useState } from 'react';
import Tooltip from '../Tooltip';

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

  // Obtener valores min y max de los datos y redondearlos
  const allValues = data.flatMap((item) => item.temperature || []);
  const rawMinValue = Math.min(...allValues);
  const rawMaxValue = Math.max(...allValues);

  const minValue = Math.floor(rawMinValue / 5) * 5; // Redondear hacia abajo
  const maxValue = Math.ceil(rawMaxValue / 5) * 5;  // Redondear hacia arriba

  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    content: { name: string; values: any[] } | null;
  }>({
    x: 0,
    y: 0,
    content: null,
  });

  const xScale = (value: any) => {
    const index = data.findIndex((item) => item.day === value);
    return (index / (data.length - 1)) * chartWidth;
  };

  const yScale = (value: number) => {
    return chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const svgRect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - svgRect.left - margin.left;

    const closestIndex = Math.round((mouseX / chartWidth) * (data.length - 1));
    if (closestIndex >= 0 && closestIndex < data.length) {
      const hoveredData = data[closestIndex];
      setTooltip({
        x: xScale(hoveredData.day),
        y: yScale(hoveredData.temperature[1]),
        content: {
          name: hoveredData.day,
          values: [
            { key: 'temperature', value: hoveredData.temperature, color: '#8884d8' },
          ],
        },
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip({ x: 0, y: 0, content: null });
  };

  return (
    <div className="relative">
      <svg
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="bg-white"
      >
        <g transform={`translate(${margin.left + chartWidth * 0.03}, ${margin.top})`}>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                data,
                xScale,
                yScale,
                width: chartWidth,
                height: chartHeight,
                minValue,
                maxValue,
              });
            }
            return null;
          })}

          {/* Tooltip Hover Lines */}
          {tooltip.content && (
            <>
              <line
                x1={tooltip.x}
                y1={0}
                x2={tooltip.x}
                y2={chartHeight}
                stroke="#ccc"
                strokeDasharray="3 3"
              />
              <circle
                cx={tooltip.x}
                cy={tooltip.y}
                r={4}
                fill="#fff"
                stroke="#8884d8"
                strokeWidth={2}
              />
              {/* Círculo inferior */}
              <circle
                cx={tooltip.x}
                cy={yScale(tooltip.content.values[0].value[0])} // temperatura mínima
                r={4}
                fill="#fff"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </>
          )}
        </g>
      </svg>
      {/* Render Tooltip */}
      {tooltip.content && <Tooltip position={{ x: tooltip.x + margin.left, y: tooltip.y + margin.top }} tooltipData={tooltip.content} />}
    </div>
  );
};

export default AreaChart;
