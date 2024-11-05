import React from 'react';
import ChartControls from './ChartControls';

interface BarChartControlsProps {
  width: number;
  setWidth: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
  margin: { top: number; right: number; bottom: number; left: number };
  setMargin: (value: { top: number; right: number; bottom: number; left: number }) => void;
  showXAxis: boolean;
  setShowXAxis: (value: boolean) => void;
  showYAxis: boolean;
  setShowYAxis: (value: boolean) => void;
  showCartesianGrid: boolean;
  setShowCartesianGrid: (value: boolean) => void;
  showTooltip: boolean;
  setShowTooltip: (value: boolean) => void;
  showLegend: boolean;
  setShowLegend: (value: boolean) => void;
  barCategoryGap: string;
  setBarCategoryGap: (value: string) => void;
  barGap: number;
  setBarGap: (value: number) => void;
}

const BarChartControls: React.FC<BarChartControlsProps> = (props) => {
  return (
    <div>
      <ChartControls {...props} />
      <div className="p-4 bg-gray-50 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-1">Bar Category Gap</label>
        <input
          type="text" value={props.barCategoryGap} onChange={(e) => props.setBarCategoryGap(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <label className="block text-sm font-medium text-gray-700 mt-4">Bar Gap</label>
        <input
          type="number" value={props.barGap} onChange={(e) => props.setBarGap(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default BarChartControls;
