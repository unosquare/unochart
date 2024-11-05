import React from 'react';
import { BarChartControlsProps } from './types';

export default function BarChartControls({
  width,
  height,
  barCategoryGap,
  barGap,
  layout,
  margin,
  showXAxis,
  showYAxis,
  showCartesianGrid,
  showTooltip,
  showLegend,
  setWidth,
  setHeight,
  setBarCategoryGap,
  setBarGap,
  setLayout,
  setMargin,
  setShowXAxis,
  setShowYAxis,
  setShowCartesianGrid,
  setShowTooltip,
  setShowLegend,
}: BarChartControlsProps) {
  const handleMarginChange = (side: keyof typeof margin, value: number) => {
    setMargin({ ...margin, [side]: value });
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mb-5 max-w-md">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-700">Bar Chart Settings</h2>
      <form className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">
              Width: {width}px
            </label>
            <input
              id="width"
              type="range"
              min="200"
              max="1000"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
              Height: {height}px
            </label>
            <input
              id="height"
              type="range"
              min="200"
              max="800"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="barCategoryGap" className="block text-sm font-medium text-gray-700 mb-1">
              Bar Category Gap
            </label>
            <input
              id="barCategoryGap"
              type="text"
              value={barCategoryGap}
              onChange={(e) => setBarCategoryGap(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            />
          </div>
          <div>
            <label htmlFor="barGap" className="block text-sm font-medium text-gray-700 mb-1">
              Bar Gap
            </label>
            <input
              id="barGap"
              type="number"
              value={barGap}
              onChange={(e) => setBarGap(parseInt(e.target.value, 10))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            />
          </div>
        </div>

        <div>
          <label htmlFor="layout" className="block text-sm font-medium text-gray-700 mb-1">
            Layout
          </label>
          <select
            id="layout"
            value={layout}
            onChange={(e) => setLayout(e.target.value as 'horizontal' | 'vertical')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
          >
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
        </div>

        <div>
          <h3 className="text-lg font-medium text-indigo-700 mb-2">Margin</h3>
          <div className="grid grid-cols-2 gap-4">
            {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
              <div key={side}>
                <label htmlFor={`margin-${side}`} className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {side}: {margin[side]}px
                </label>
                <input
                  id={`margin-${side}`}
                  type="range"
                  min="0"
                  max="100"
                  value={margin[side]}
                  onChange={(e) => handleMarginChange(side, parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {[
            { id: 'showXAxis', label: 'Show X Axis', checked: showXAxis, onChange: setShowXAxis },
            { id: 'showYAxis', label: 'Show Y Axis', checked: showYAxis, onChange: setShowYAxis },
            { id: 'showCartesianGrid', label: 'Show Cartesian Grid', checked: showCartesianGrid, onChange: setShowCartesianGrid },
            { id: 'showTooltip', label: 'Show Tooltip', checked: showTooltip, onChange: setShowTooltip },
            { id: 'showLegend', label: 'Show Legend', checked: showLegend, onChange: setShowLegend },
          ].map((item) => (
            <label
              key={item.id}
              htmlFor={item.id}
              className="flex items-center space-x-2 text-gray-700 hover:bg-indigo-50 rounded-lg p-2 transition duration-300 ease-in-out cursor-pointer"
            >
              <input
                id={item.id}
                type="checkbox"
                checked={item.checked}
                onChange={(e) => item.onChange(e.target.checked)}
                className="form-checkbox h-5 w-5 text-indigo-600 rounded transition duration-300 ease-in-out"
              />
              <span className="text-sm font-medium">{item.label}</span>
            </label>
          ))}
        </div>
      </form>
    </div>
  );
}