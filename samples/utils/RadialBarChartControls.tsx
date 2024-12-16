import React from 'react';

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
    <div className="bg-white rounded-lg shadow-sm p-4 w-80">
      <h3 className="font-semibold text-gray-800 mb-4">Chart Controls</h3>
      <label>Width: {width}px</label>
      <input
        type="range"
        min="300"
        max="1000"
        value={width}
        onChange={(e) => setWidth(Number(e.target.value))}
        className="w-full mb-2"
      />
      <label>Height: {height}px</label>
      <input
        type="range"
        min="150"
        max="500"
        value={height}
        onChange={(e) => setHeight(Number(e.target.value))}
        className="w-full mb-2"
      />
      <label>Inner Radius</label>
      <input
        type="text"
        value={innerRadius}
        onChange={(e) => setInnerRadius(e.target.value)}
        className="w-full mb-2 p-1 border rounded"
      />
      <label>Outer Radius</label>
      <input
        type="text"
        value={outerRadius}
        onChange={(e) => setOuterRadius(e.target.value)}
        className="w-full mb-2 p-1 border rounded"
      />
      <label>Start Angle: {startAngle}°</label>
      <input
        type="range"
        min="0"
        max="360"
        value={startAngle}
        onChange={(e) => setStartAngle(Number(e.target.value))}
        className="w-full mb-2"
      />
      <label>End Angle: {endAngle}°</label>
      <input
        type="range"
        min="0"
        max="360"
        value={endAngle}
        onChange={(e) => setEndAngle(Number(e.target.value))}
        className="w-full mb-2"
      />
    </div>
  );
};

export default RadialBarChartControls;
