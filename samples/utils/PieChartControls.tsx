import React from 'react';

interface PieChartControlsProps {
  pies: Array<{
    id: number;
    innerRadius?: number;
    outerRadius?: number;
    cx?: string | number;
    cy?: string | number;
    showLabels?: boolean;
    startAngle?: number;
    endAngle?: number;
    label?: 'percent' | string[] | boolean;
    paddingAngle?: number;
    activeShape?: boolean;
  }>;
  setPies: React.Dispatch<React.SetStateAction<Array<{
    id: number;
    innerRadius?: number;
    outerRadius?: number;
    cx?: string | number;
    cy?: string | number;
    showLabels?: boolean;
    startAngle?: number;
    endAngle?: number;
    label?: 'percent' | string[] | boolean;
    paddingAngle?: number;
    activeShape?: boolean;
  }>>>;
  showPolarGrid?: boolean;
  setShowPolarGrid?: (show: boolean) => void;
}

export default function PieChartControls({ pies, setPies, showPolarGrid, setShowPolarGrid }: PieChartControlsProps) {
  const handlePieChange = <K extends keyof typeof pies[number]>(index: number, key: K, value: typeof pies[number][K]) => {
    const updatedPies = [...pies];
    updatedPies[index][key] = value;
    setPies(updatedPies);
  };

  const handleLabelChange = (index: number, value: string) => {
    const updatedPies = [...pies];
    if (value === 'percent') {
      updatedPies[index].label = 'percent';
    } else if (value) {
      updatedPies[index].label = value.split(',');
    } else {
      updatedPies[index].label = true;
    }
    setPies(updatedPies);
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mb-5 max-w-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Pie Chart Settings</h2>
      <form className="space-y-6">
        {setShowPolarGrid && (
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-lg p-2 transition duration-300 ease-in-out cursor-pointer">
              <input
                type="checkbox"
                checked={showPolarGrid}
                onChange={(e) => setShowPolarGrid?.(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600 rounded transition duration-300 ease-in-out"
              />
              <span className="text-sm font-medium">Show Polar Grid</span>
            </label>
          </div>
        )}
        {pies.map((pie, index) => (
          <div key={pie.id} className="bg-gray-50 p-4 rounded-lg mb-4 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Pie {index + 1} Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              {pie.innerRadius !== undefined && (
                <div>
                  <label htmlFor={`innerRadius-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Inner Radius</label>
                  <input
                    id={`innerRadius-${index}`}
                    type="number"
                    value={pie.innerRadius}
                    onChange={(e) => handlePieChange(index, 'innerRadius', parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  />
                </div>
              )}
              {pie.outerRadius !== undefined && (
                <div>
                  <label htmlFor={`outerRadius-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Outer Radius</label>
                  <input
                    id={`outerRadius-${index}`}
                    type="number"
                    value={pie.outerRadius}
                    onChange={(e) => handlePieChange(index, 'outerRadius', parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  />
                </div>
              )}
              {pie.startAngle !== undefined && (
                <div>
                  <label htmlFor={`startAngle-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Start Angle</label>
                  <input
                    type="number"
                    value={pie.startAngle}
                    onChange={(e) => handlePieChange(index, 'startAngle', parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  />
                </div>
              )}
              {pie.endAngle !== undefined && (
                <div>
                  <label htmlFor={`endAngle-${index}`} className="block text-sm font-medium text-gray-700 mb-1">End Angle</label>
                  <input
                    id={`endAngle-${index}`}
                    type="number"
                    value={pie.endAngle}
                    onChange={(e) => handlePieChange(index, 'endAngle', parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  />
                </div>
              )}
              {pie.cx !== undefined && (
                <div>
                  <label htmlFor={`cx-${index}`} className="block text-sm font-medium text-gray-700 mb-1">cx</label>
                  <input
                    id={`cx-${index}`}
                    type="text"
                    value={pie.cx}
                    onChange={(e) => handlePieChange(index, 'cx', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  />
                </div>
              )}
              {pie.cy !== undefined && (
                <div>
                  <label htmlFor={`cy-${index}`} className="block text-sm font-medium text-gray-700 mb-1">cy</label>
                  <input
                    type="text"
                    value={pie.cy}
                    onChange={(e) => handlePieChange(index, 'cy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  />
                </div>
              )}
              {pie.paddingAngle !== undefined && (
                <div>
                  <label htmlFor={`paddingAngle-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Padding Angle</label>
                  <input
                    id={`paddingAngle-${index}`}
                    type="number"
                    value={pie.paddingAngle}
                    onChange={(e) => handlePieChange(index, 'paddingAngle', parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  />
                </div>
              )}
              {pie.showLabels !== undefined && (
                <label className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-lg p-2 transition duration-300 ease-in-out cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pie.showLabels}
                    onChange={(e) => handlePieChange(index, 'showLabels', e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded transition duration-300 ease-in-out"
                  />
                  <span className="text-sm font-medium">Show Labels</span>
                </label>
              )}
              {pie.label !== undefined && (
                <div className="col-span-2">
                  <label htmlFor={`label-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Labels (percent or comma-separated)</label>
                  <input
                    id={`label-${index}`}
                    type="text"
                    placeholder="percent or values"
                    onChange={(e) => handleLabelChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  />
                </div>
              )}
              {pie.activeShape !== undefined && (
                <label className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-lg p-2 transition duration-300 ease-in-out cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pie.activeShape}
                    onChange={(e) => handlePieChange(index, 'activeShape', e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded transition duration-300 ease-in-out"
                  />
                  <span className="text-sm font-medium">Active Shape</span>
                </label>
              )}
            </div>
          </div>
        ))}
      </form>
    </div>
  );
}