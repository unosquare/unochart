// LineChartControls.tsx
import React from 'react';

interface LineChartControlsProps {
  lines: Array<{ id: number; dataKey: string; stroke: string }>;
  setLines: React.Dispatch<React.SetStateAction<Array<{ id: number; dataKey: string; stroke: string }>>>;
}

const LineChartControls: React.FC<LineChartControlsProps> = ({ lines, setLines }) => {
  const handleLineChange = (index: number, key: keyof typeof lines[number], value: string) => {
    const updatedLines = [...lines];
    updatedLines[index][key] = value;
    setLines(updatedLines);
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mb-5 max-w-md">
      <h2 className="text-2xl font-semibold mb-6 text-purple-600">Line Chart Settings</h2>
      <form className="space-y-6">
        {lines.map((line, index) => (
          <div key={line.id} className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-medium text-purple-600 mb-2">Line {index + 1} Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-purple-600 mb-1">Data Key</label>
                <input
                  type="text"
                  value={line.dataKey}
                  onChange={(e) => handleLineChange(index, 'dataKey', e.target.value)}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-600 mb-1">Stroke Color</label>
                <input
                  type="color"
                  value={line.stroke}
                  onChange={(e) => handleLineChange(index, 'stroke', e.target.value)}
                  className="w-full h-10 border-none rounded-lg"
                />
              </div>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default LineChartControls;
