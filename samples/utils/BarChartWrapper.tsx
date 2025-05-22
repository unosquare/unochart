import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from '../../src';
import BarChartControls from './BarChartControls';
import { BAR_DATA, NAV_SECTIONS } from './constants';
import type { BarChartWrapperProps } from './types';

export default function BarChartWrapper({
    data = BAR_DATA,
    children,
    initialWidth = 600,
    initialHeight = 400,
    initialMargin = { top: 5, right: 5, bottom: 5, left: 5 },
}: BarChartWrapperProps) {
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

    const barChartTypes = NAV_SECTIONS.find((section) => section.category === 'Bar Charts')?.items || [];

    return (
        <div className='p-6'>
            <div className='flex gap-6'>
                <div className='w-64 shrink-0'>
                    <div className='bg-white rounded-lg shadow-xs border border-gray-100'>
                        <div className='p-4 border-b border-gray-100'>
                            <h3 className='font-semibold text-gray-900'>Bar Chart Types</h3>
                        </div>
                        <ul className='p-2'>
                            {barChartTypes.map((chart) => (
                                <li key={chart.path}>
                                    <Link
                                        to={chart.path}
                                        className={`block px-3 py-2 rounded-md text-sm ${
                                            location.pathname === chart.path
                                                ? 'bg-blue-50 text-blue-600 font-medium'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        } transition-colors duration-200`}
                                    >
                                        {chart.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='flex-1 min-w-0'>
                    <div className='bg-white rounded-lg shadow-xs border border-gray-100 p-4'>
                        <BarChart
                            data={data}
                            width={width}
                            height={height}
                            margin={margin}
                            barCategoryGap={barCategoryGap}
                            barGap={barGap}
                            layout={layout}
                            //onClick={onClick}
                        >
                            {showCartesianGrid && <CartesianGrid strokeDasharray='3 3' />}
                            {showXAxis && <XAxis />}
                            {showYAxis && <YAxis />}
                            {showTooltip && <Tooltip />}
                            {showLegend && <Legend />}
                            {children}
                        </BarChart>
                    </div>
                </div>

                <div className='w-80 shrink-0'>
                    <div className='bg-white rounded-lg shadow-xs border border-gray-100'>
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
                </div>
            </div>
        </div>
    );
}
