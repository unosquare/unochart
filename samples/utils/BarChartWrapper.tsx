import React, { useState } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from '../../src';
import BarChartControls from './BarChartControls';
import { BAR_DATA } from './constants';
import { BarChartWrapperProps, DataPoint } from './types';

const BarChartWrapper: React.FC<BarChartWrapperProps> = ({
  data = BAR_DATA,
  children,
  initialWidth = 600,
  initialHeight = 400,
  initialMargin = { top: 5, right: 5, bottom: 5, left: 5 }
}) => {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [barCategoryGap, setBarCategoryGap] = useState<string>('10%');
  const [barGap, setBarGap] = useState<number>(4);
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal');
  const [margin, setMargin] = useState(initialMargin);
  const [showXAxis, setShowXAxis] = useState(true);
  const [showYAxis, setShowYAxis] = useState(true);
  const [showCartesianGrid, setShowCartesianGrid] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  const [showLegend, setShowLegend] = useState(true);

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <BarChartControls
            width={width}
            setWidth={setWidth}
            height={height}
            setHeight={setHeight}
            barCategoryGap={barCategoryGap}
            setBarCategoryGap={setBarCategoryGap}
            barGap={barGap}
            setBarGap={setBarGap}
            layout={layout}
            setLayout={setLayout}
            margin={margin}
            setMargin={setMargin}
            showXAxis={showXAxis}
            setShowXAxis={setShowXAxis}
            showYAxis={showYAxis}
            setShowYAxis={setShowYAxis}
            showCartesianGrid={showCartesianGrid}
            setShowCartesianGrid={setShowCartesianGrid}
            showTooltip={showTooltip}
            setShowTooltip={setShowTooltip}
            showLegend={showLegend}
            setShowLegend={setShowLegend}
          />
        </div>
        <div className="lg:w-2/3">
          <BarChart
            data={data}
            width={width}
            height={height}
            margin={margin}
            barCategoryGap={barCategoryGap}
            barGap={barGap}
            layout={layout}
          >
            {showCartesianGrid && <CartesianGrid strokeDasharray="3 3" />}
            {showXAxis && <XAxis />}
            {showYAxis && <YAxis />}
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {children}
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default BarChartWrapper;