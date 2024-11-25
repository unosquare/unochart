import type React from 'react';
import ChartControls from './ChartControls';

interface LineConfig {
    id: number;
    stroke: string;
    type: string;
    connectNulls: boolean;
    dataKey: string;
}

interface LineChartControlsProps {
    width: number;
    setWidth: (value: number) => void;
    height: number;
    setHeight: (value: number) => void;
    margin: { top: number; right: number; bottom: number; left: number };
    setMargin: (value: { top: number; right: number; bottom: number; left: number }) => void;
    lines: LineConfig[];
    setLines: (value: LineConfig[]) => void;
    data: any[];
}

const interpolationOptions = [
    'linear',
    'bumpX',
    'bumpY',
    'natural',
    'monotoneX',
    'monotoneY',
    'step',
    'stepBefore',
    'stepAfter',
];

const LineChartControls: React.FC<LineChartControlsProps> = ({ lines, setLines, data, ...props }) => {
    const handleLineChange = (index: number, key: keyof LineConfig, value: any) => {
        const updatedLines = [...lines];
        updatedLines[index][key] = value;
        setLines(updatedLines);
    };

    const hasNullValues = (dataKey: string): boolean => {
        return data.some((item) => item[dataKey] === undefined || item[dataKey] === null);
    };

    return (
        <div>
            <ChartControls {...props} />
            <div className='p-4 bg-gray-50 rounded-lg'>
                {lines.map((line, index) => (
                    <div key={line.id} className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Line {index + 1} Stroke Color
                        </label>
                        <input
                            type='color'
                            value={line.stroke}
                            onChange={(e) => handleLineChange(index, 'stroke', e.target.value)}
                            className='w-8 h-8'
                        />

                        <label className='block text-sm font-medium text-gray-700 mt-4'>Interpolation Type</label>
                        <select
                            value={line.type}
                            onChange={(e) => handleLineChange(index, 'type', e.target.value)}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md'
                        >
                            {interpolationOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </option>
                            ))}
                        </select>

                        {hasNullValues(line.dataKey) && (
                            <label className='flex items-center space-x-2 text-gray-700 mt-4'>
                                <input
                                    type='checkbox'
                                    checked={line.connectNulls}
                                    onChange={(e) => handleLineChange(index, 'connectNulls', e.target.checked)}
                                    className='form-checkbox h-5 w-5 text-blue-600'
                                />
                                <span className='text-sm font-medium'>Connect Null Values</span>
                            </label>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LineChartControls;
