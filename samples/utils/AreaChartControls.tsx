import React from 'react';
import ChartControls from './ChartControls';

interface AreaChartControlsProps {
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
  showTooltip: boolean;
  setShowTooltip: (value: boolean) => void;
  strokeColor: string;
  setStrokeColor: (value: string) => void;
  fillColor: string;
  setFillColor: (value: string) => void;
}

const AreaChartControls: React.FC<AreaChartControlsProps> = ({
  strokeColor,
  setStrokeColor,
  fillColor,
  setFillColor,
  ...props
}) => {
  return (
    <div>
      <ChartControls {...props} />
      <div className="p-4 bg-gray-50 rounded-lg">
        <label htmlFor="strokeColor" className="block text-sm font-medium text-gray-700 mb-1">
          Stroke Color
        </label>
        <input
          id="strokeColor"
          type="color"
          value={strokeColor}
          onChange={(e) => setStrokeColor(e.target.value)}
          className="w-full"
        />

        <label htmlFor="fillColor" className="block text-sm font-medium text-gray-700 mt-4">
          Fill Color
        </label>
        <input
          id="fillColor"
          type="color"
          value={fillColor}
          onChange={(e) => setFillColor(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default AreaChartControls;
