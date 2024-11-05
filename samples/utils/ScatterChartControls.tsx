import React from 'react';
import { ScatterChartControlsProps } from './types';

const ScatterChartControls: React.FC<ScatterChartControlsProps> = ({
  data,
  setData,
  width,
  setWidth,
  height,
  setHeight,
  margin,
  setMargin,
  fill,
  setFill,
}) => {
  const handleMarginChange = (side: keyof typeof margin, value: number) => {
    setMargin({ ...margin, [side]: value });
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mb-5 max-w-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Scatter Chart Settings</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Width: {width}px</label>
          <input
            type="range"
            min="400"
            max="800"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Height: {height}px</label>
          <input
            type="range"
            min="200"
            max="800"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {['top', 'right', 'bottom', 'left'].map((side) => (
            <div key={side}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {side} Margin
              </label>
              <input
                type="number"
                value={margin[side as keyof typeof margin]}
                onChange={(e) => handleMarginChange(side as keyof typeof margin, Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Point Color</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={fill}
              onChange={(e) => setFill(e.target.value)}
              className="w-8 h-8 border-none rounded-md cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-600">{fill}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScatterChartControls;