import React from 'react';
import ChartControls from './ChartControls';

interface ScatterChartControlsProps {
  width: number;
  setWidth: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
  margin: { top: number; right: number; bottom: number; left: number };
  setMargin: (value: { top: number; right: number; bottom: number; left: number }) => void;
  fill: string;
  setFill: (value: string) => void;
}

const ScatterChartControls: React.FC<ScatterChartControlsProps> = ({ fill, setFill, ...props }) => {
  return (
    <div>
      <ChartControls {...props} />
      <div className="p-4 bg-gray-50 rounded-lg">
        <label htmlFor="point-color" className="block text-sm font-medium text-gray-700 mb-1">Point Color</label>
        <input
          id="point-color"
          type="color" value={fill} onChange={(e) => setFill(e.target.value)}
          className="w-8 h-8"
        />
      </div>
    </div>
  );
};

export default ScatterChartControls;
