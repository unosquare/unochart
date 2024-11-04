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
        <div className="bg-white p-6 shadow-lg rounded-lg mb-5 max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-700">Scatter Chart Settings</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Width</label>
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

            <div>
              <label className="block text-sm font-medium text-gray-700">Height</label>
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
                  <label className="block text-sm font-medium text-gray-700">{side.charAt(0).toUpperCase() + side.slice(1)}</label>
                  <input
                    type="number"
                    value={margin[side as keyof typeof margin]}
                    onChange={(e) => setMargin({ ...margin, [side]: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
  );
};

export default ScatterChartControls;
