import type React from 'react';
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
    layout: 'horizontal' | 'vertical';
    setLayout: (value: 'horizontal' | 'vertical') => void;
}

const BarChartControls: React.FC<BarChartControlsProps> = ({ layout, setLayout, ...props }) => {
    return (
        <div>
            <ChartControls {...props} />
            <div className='p-4 bg-gray-50 rounded-lg'>
                <label htmlFor='barCategoryGap' className='block text-sm font-medium text-gray-700 mb-1'>
                    Bar Category Gap
                </label>
                <input
                    id='barCategoryGap'
                    type='text'
                    value={props.barCategoryGap}
                    onChange={(e) => props.setBarCategoryGap(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                />

                <label htmlFor='barGap' className='block text-sm font-medium text-gray-700 mt-4'>
                    Bar Gap
                </label>
                <input
                    id='barGap'
                    type='number'
                    value={props.barGap}
                    onChange={(e) => props.setBarGap(Number(e.target.value))}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                />

                <label htmlFor='layout' className='block text-sm font-medium text-gray-700 mt-4'>
                    Layout
                </label>
                <select
                    id='layout'
                    value={layout}
                    onChange={(e) => setLayout(e.target.value as 'horizontal' | 'vertical')}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                >
                    <option value='horizontal'>Horizontal</option>
                    <option value='vertical'>Vertical</option>
                </select>
            </div>
        </div>
    );
};

export default BarChartControls;
