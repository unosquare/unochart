import React from 'react';

interface BarChartControlsProps {
  width: number;
  height: number;
  barCategoryGap: string;
  barGap: number;
  layout: 'horizontal' | 'vertical';
  margin: { top: number; right: number; bottom: number; left: number };
  showXAxis: boolean;
  showYAxis: boolean;
  showCartesianGrid: boolean;
  showTooltip: boolean;
  showLegend: boolean;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setBarCategoryGap: (gap: string) => void;  // Actualiza a solo string
  setBarGap: (gap: number) => void;          // Actualiza a solo number
  setLayout: (layout: 'horizontal' | 'vertical') => void;
  setMargin: (margin: { top: number; right: number; bottom: number; left: number }) => void;
  setShowXAxis: (show: boolean) => void;
  setShowYAxis: (show: boolean) => void;
  setShowCartesianGrid: (show: boolean) => void;
  setShowTooltip: (show: boolean) => void;
  setShowLegend: (show: boolean) => void;
}

const BarChartControls: React.FC<BarChartControlsProps> = ({
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
}) => {
  const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>, side: string) => {
    const value = parseInt(e.target.value, 10);
    setMargin({ ...margin, [side]: value });
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mb-5 max-w-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-700">Chart Settings</h2>
      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value, 10))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value, 10))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bar Category Gap</label>
          <input
            type="text"
            value={barCategoryGap}
            onChange={(e) => setBarCategoryGap(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bar Gap</label>
          <input
            type="number"
            value={barGap}
            onChange={(e) => setBarGap(parseInt(e.target.value, 10))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Layout</label>
          <select
            value={layout}
            onChange={(e) => setLayout(e.target.value as 'horizontal' | 'vertical')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
          >
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Margin</h3>
          <div className="grid grid-cols-2 gap-4">
            {['top', 'right', 'bottom', 'left'].map((side) => (
              <div key={side}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{side}</label>
                <input
                  type="number"
                  value={margin[side as keyof typeof margin]}
                  onChange={(e) => handleMarginChange(e, side)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {[
            { label: 'Show X Axis', checked: showXAxis, onChange: setShowXAxis },
            { label: 'Show Y Axis', checked: showYAxis, onChange: setShowYAxis },
            { label: 'Show Cartesian Grid', checked: showCartesianGrid, onChange: setShowCartesianGrid },
            { label: 'Show Tooltip', checked: showTooltip, onChange: setShowTooltip },
            { label: 'Show Legend', checked: showLegend, onChange: setShowLegend },
          ].map((item) => (
            <label key={item.label} className="flex items-center space-x-2 text-gray-700 hover:bg-purple-100 rounded-lg p-2 transition duration-300 ease-in-out">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(e) => item.onChange(e.target.checked)}
                className="form-checkbox h-5 w-5 text-purple-600 rounded transition duration-300 ease-in-out"
              />
              <span className="text-sm">{item.label}</span>
            </label>
          ))}
        </div>
      </form>
    </div>
  );
};

export default BarChartControls;
