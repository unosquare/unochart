import React from 'react';

interface ChartControlsProps {
  width: number;
  setWidth: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
  margin: { top: number; right: number; bottom: number; left: number };
  setMargin: (value: { top: number; right: number; bottom: number; left: number }) => void;
  showXAxis?: boolean;
  setShowXAxis?: (value: boolean) => void;
  showYAxis?: boolean;
  setShowYAxis?: (value: boolean) => void;
  showCartesianGrid?: boolean;
  setShowCartesianGrid?: (value: boolean) => void;
  showTooltip?: boolean;
  setShowTooltip?: (value: boolean) => void;
  showLegend?: boolean;
  setShowLegend?: (value: boolean) => void;
}

const ChartControls: React.FC<ChartControlsProps> = ({
  width, setWidth, height, setHeight, margin, setMargin,
  showXAxis, setShowXAxis, showYAxis, setShowYAxis,
  showCartesianGrid, setShowCartesianGrid, showTooltip,
  setShowTooltip, showLegend, setShowLegend
}) => {
  const handleMarginChange = (side: keyof typeof margin, value: number) => {
    setMargin({ ...margin, [side]: value });
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mb-5 max-w-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Chart Settings</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Width: {width}px</label>
          <input
            type="range" min="400" max="800" value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Height: {height}px</label>
          <input
            type="range" min="200" max="800" value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
            <div key={side}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {side} Margin: {margin[side]}px
              </label>
              <input
                type="range" min="0" max="100" value={margin[side]}
                onChange={(e) => handleMarginChange(side, Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {[{ label: 'Show X Axis', value: showXAxis, setValue: setShowXAxis },
            { label: 'Show Y Axis', value: showYAxis, setValue: setShowYAxis },
            { label: 'Show Cartesian Grid', value: showCartesianGrid, setValue: setShowCartesianGrid },
            { label: 'Show Tooltip', value: showTooltip, setValue: setShowTooltip },
            { label: 'Show Legend', value: showLegend, setValue: setShowLegend }]
            .map((control) => (
              control.value !== undefined && control.setValue !== undefined && (
                <label key={control.label} className="flex items-center space-x-2 text-gray-700">
                  <input
                    type="checkbox" checked={control.value} onChange={(e) => control.setValue(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="text-sm font-medium">{control.label}</span>
                </label>
              )
          ))}
        </div>
      </form>
    </div>
  );
};

export default ChartControls;
