import React from 'react';
import { LineChartControlsProps } from './types';

const interpolationOptions = [
  'linear', 'basis', 'basisClosed', 'basisOpen', 'bumpX', 'bumpY', 'natural', 'monotoneX', 'monotoneY', 'step', 'stepBefore', 'stepAfter',
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
      <h2 className="text-2xl font-semibold mb-6 text-indigo-700">Line Chart Settings</h2>
      <form className="space-y-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Width</label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="400"
              max="1200"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-600">{width}px</span>
          </div>

          <label className="block text-sm font-medium text-gray-700">Height</label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="200"
              max="800"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-600">{height}px</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {['top', 'right', 'bottom', 'left'].map((side) => (
              <div key={side}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {side.charAt(0).toUpperCase() + side.slice(1)}
                </label>
                <input
                  type="number"
                  value={margin[side as keyof typeof margin]}
                  onChange={(e) => handleMarginChange(side as keyof typeof margin, Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                />
              </div>
            ))}
          </div>
        </div>

        {lines.map((line, index) => (
          <div key={line.id} className="bg-gray-50 p-4 rounded-lg mb-4 shadow-sm">
            <h3 className="text-lg font-medium text-indigo-700 mb-2">Line {index + 1} Settings</h3>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                >
                  {interpolationOptions.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {hasNullValues(line.dataKey) && (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`connectNulls-${index}`}
                    checked={line.connectNulls}
                    onChange={(e) => handleLineChange(index, 'connectNulls', e.target.checked)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`connectNulls-${index}`}
                    className="text-sm font-medium text-gray-700"
                  >
                    Connect Null Values
                  </label>
                </div>
              )}
            </div>
          </div>
        ))}
      </form>
    </div>
  );
}