import React from 'react';
import { LineChartControlsProps } from './types';

const interpolationOptions = [
  'linear', 'bumpX', 'bumpY', 'natural', 'monotoneX', 'monotoneY', 'step', 'stepBefore', 'stepAfter',
];

export default function LineChartControls({
  lines,
  setLines,
  width,
  setWidth,
  height,
  setHeight,
  margin,
  setMargin,
  data,
}: LineChartControlsProps) {
  const handleLineChange = <K extends keyof typeof lines[number]>(index: number, key: K, value: typeof lines[number][K]) => {
    const updatedLines = [...lines];
    updatedLines[index][key] = value;
    setLines(updatedLines);
  };

  const handleMarginChange = (side: keyof typeof margin, value: number) => {
    setMargin({ ...margin, [side]: value });
  };

  const hasNullValues = (dataKey: string): boolean => {
    return data.some(item => item[dataKey] === undefined || item[dataKey] === null);
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mb-5 max-w-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Line Chart Settings</h2>
      <form className="space-y-6">
        <div className="space-y-4">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                />
              </div>
            ))}
          </div>
        </div>

        {lines.map((line, index) => (
          <div key={line.id} className="bg-gray-50 p-4 rounded-lg mb-4 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Line {index + 1} Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stroke Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={line.stroke}
                    onChange={(e) => handleLineChange(index, 'stroke', e.target.value)}
                    className="w-8 h-8 border-none rounded-md cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-600">{line.stroke}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interpolation Type</label>
                <select
                  value={line.type}
                  onChange={(e) => handleLineChange(index, 'type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                >
                  {interpolationOptions.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {hasNullValues(line.dataKey) && (
                <label className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-lg p-2 transition duration-300 ease-in-out cursor-pointer">
                  <input
                    type="checkbox"
                    checked={line.connectNulls}
                    onChange={(e) => handleLineChange(index, 'connectNulls', e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded transition duration-300 ease-in-out"
                  />
                  <span className="text-sm font-medium">Connect Null Values</span>
                </label>
              )}
            </div>
          </div>
        ))}
      </form>
    </div>
  );
}