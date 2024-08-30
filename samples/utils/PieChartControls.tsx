import React from 'react';

interface PieChartControlsProps {
  pies: Array<{
    id: number;
    innerRadius: number;
    outerRadius: number;
    cx: string | number;
    cy: string | number;
    showLabels: boolean;
  }>;
  setPies: React.Dispatch<React.SetStateAction<Array<{
    id: number;
    innerRadius: number;
    outerRadius: number;
    cx: string | number;
    cy: string | number;
    showLabels: boolean;
  }>>>;
  showPolarGrid: boolean;
  setShowPolarGrid: (show: boolean) => void;
}

const PieChartControls: React.FC<PieChartControlsProps> = ({ pies, setPies, showPolarGrid, setShowPolarGrid }) => {
  const handlePieChange = (index: number, key: keyof typeof pies[number], value: string | number | boolean) => {
    const updatedPies = [...pies];
    updatedPies[index][key] = value;
    setPies(updatedPies);
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mb-5 max-w-md">
      <h2 className="text-2xl font-semibold mb-6 text-purple-600">Chart Settings</h2>
      <form className="space-y-6">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-purple-600 hover:bg-purple-100 rounded-lg p-2 transition duration-300 ease-in-out">
            <input
              type="checkbox"
              checked={showPolarGrid}
              onChange={(e) => setShowPolarGrid(e.target.checked)}
              className="form-checkbox h-5 w-5 text-purple-600 rounded transition duration-300 ease-in-out"
            />
            <span className="text-sm">Show Polar Grid</span>
          </label>
        </div>
        {pies.map((pie, index) => (
          <div key={pie.id} className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-medium text-purple-600 mb-2">Pie {index + 1} Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-purple-600 mb-1">Inner Radius</label>
                <input
                  type="number"
                  value={pie.innerRadius}
                  onChange={(e) => handlePieChange(index, 'innerRadius', parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-600 mb-1">Outer Radius</label>
                <input
                  type="number"
                  value={pie.outerRadius}
                  onChange={(e) => handlePieChange(index, 'outerRadius', parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-600 mb-1">cx</label>
                <input
                  type="text"
                  value={pie.cx}
                  onChange={(e) => handlePieChange(index, 'cx', e.target.value)}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-600 mb-1">cy</label>
                <input
                  type="text"
                  value={pie.cy}
                  onChange={(e) => handlePieChange(index, 'cy', e.target.value)}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
                />
              </div>
              <label className="flex items-center space-x-2 text-purple-600 hover:bg-purple-100 rounded-lg p-2 transition duration-300 ease-in-out">
                <input
                  type="checkbox"
                  checked={pie.showLabels}
                  onChange={(e) => handlePieChange(index, 'showLabels', e.target.checked)}
                  className="form-checkbox h-5 w-5 text-purple-600 rounded transition duration-300 ease-in-out"
                />
                <span className="text-sm">Show Labels</span>
              </label>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default PieChartControls;
