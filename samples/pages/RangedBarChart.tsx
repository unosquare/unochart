import React, { useState } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from '../../src';
import BarChartControls from '../utils/BarChartControls';

const RangedBarChart = () => {
    const [width, setWidth] = useState(600);
    const [height, setHeight] = useState(400);
    const [barCategoryGap, setBarCategoryGap] = useState('10%');
    const [barGap, setBarGap] = useState(4);
    const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal');
    const [margin, setMargin] = useState({ top: 5, right: 5, bottom: 5, left: 5 });
    const [showXAxis, setShowXAxis] = useState(true);
    const [showYAxis, setShowYAxis] = useState(true);
    const [showCartesianGrid, setShowCartesianGrid] = useState(true);
    const [showTooltip, setShowTooltip] = useState(true);
    const [showLegend, setShowLegend] = useState(true);

    const data = [
        { day: '05-01', temperature: [-1, 10] },
        { day: '05-02', temperature: [2, 15] },
        { day: '05-03', temperature: [3, 12] },
        { day: '05-04', temperature: [4, 12] },
        { day: '05-05', temperature: [12, 16] },
        { day: '05-06', temperature: [5, 16] },
        { day: '05-07', temperature: [3, 12] },
        { day: '05-08', temperature: [0, 8] },
        { day: '05-09', temperature: [-3, 5] },
    ];

    return (
        <div>
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
                {showXAxis && <XAxis dataKey="day" />}
                {showYAxis && <YAxis />}
                {showTooltip && <Tooltip />}
                {showLegend && <Legend />}
                <Bar dataKey="temperature" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default RangedBarChart;
