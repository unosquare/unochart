import React from 'react';
import ChartControls from './ChartControls';

interface RadialBarChartControlsProps {
  width: number;
  setWidth: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
  innerRadius: string;
  setInnerRadius: (value: string) => void;
  outerRadius: string;
  setOuterRadius: (value: string) => void;
  startAngle: number;
  setStartAngle: (value: number) => void;
  endAngle: number;
  setEndAngle: (value: number) => void;
}

const RadialBarChartControls: React.FC<RadialBarChartControlsProps> = ({
  width,
  setWidth,
  height,
  setHeight,
  innerRadius,
  setInnerRadius,
  outerRadius,
  setOuterRadius,
  startAngle,
  setStartAngle,
  endAngle,
  setEndAngle,
}) => {
  return (
    <div>
      <div className="hide-controls">
        <ChartControls
          width={width}
          setWidth={setWidth}
          height={height}
          setHeight={setHeight}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          setMargin={() => {}}
          showXAxis={false}
          setShowXAxis={undefined}
          showYAxis={false}
          setShowYAxis={undefined}
          showCartesianGrid={false}
          setShowCartesianGrid={undefined}
          showTooltip={false}
          setShowTooltip={undefined}
          showLegend={false}
          setShowLegend={undefined}
        />
      </div>
      <style jsx>{`
        .hide-controls .grid.grid-cols-2.gap-4,
        .hide-controls .space-y-2 {
          display: none !important;
        }
      `}</style>
      <div className="p-4 bg-gray-50 rounded-lg space-y-4">
        <div>
          <label htmlFor="innerRadius" className="block text-sm font-medium text-gray-700 mb-1">
            Inner Radius
          </label>
          <input
            id="innerRadius"
            type="text"
            value={innerRadius}
            onChange={(e) => setInnerRadius(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="outerRadius" className="block text-sm font-medium text-gray-700 mb-1">
            Outer Radius
          </label>
          <input
            id="outerRadius"
            type="text"
            value={outerRadius}
            onChange={(e) => setOuterRadius(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="startAngle" className="block text-sm font-medium text-gray-700 mb-1">
            Start Angle: {startAngle}°
          </label>
          <input
            id="startAngle"
            type="range"
            min="0"
            max="360"
            value={startAngle}
            onChange={(e) => setStartAngle(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="endAngle" className="block text-sm font-medium text-gray-700 mb-1">
            End Angle: {endAngle}°
          </label>
          <input
            id="endAngle"
            type="range"
            min="0"
            max="360"
            value={endAngle}
            onChange={(e) => setEndAngle(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default RadialBarChartControls;
