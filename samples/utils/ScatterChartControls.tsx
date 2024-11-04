import React from 'react';

interface ScatterChartControlsProps {
  data: Array<{ x: number; y: number; z?: number }>;
  setData: React.Dispatch<React.SetStateAction<Array<{ x: number; y: number; z?: number }>>>;
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  height: number;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  margin: { top: number; right: number; bottom: number; left: number };
  setMargin: React.Dispatch<
    React.SetStateAction<{ top: number; right: number; bottom: number; left: number }>
  >;
}

const ScatterChartControls: React.FC<ScatterChartControlsProps> = ({
  data,
  setData,
  width,
  setWidth,
  height,
  setHeight,
  margin,
  setMargin,
}) => {
  const handleMarginChange = (side: keyof typeof margin, value: number) => {
    setMargin({ ...margin, [side]: value });
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg mb-5 max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">Scatter Chart Settings</h2>
      <form className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Width</label>
        <input
          type="range"
          min="400"
          max="1200"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
        />
        <span>{width}px</span>

        <label className="block text-sm font-medium text-gray-700">Height</label>
        <input
          type="range"
          min="200"
          max="800"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
        />
        <span>{height}px</span>

        {['top', 'right', 'bottom', 'left'].map((side) => (
          <div key={side} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">{side}</label>
            <input
              type="number"
              value={margin[side as keyof typeof margin]}
              onChange={(e) => handleMarginChange(side as keyof typeof margin, Number(e.target.value))}
              className="p-1 border border-gray-300 rounded"
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default ScatterChartControls;
