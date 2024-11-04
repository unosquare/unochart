import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface YAxisProps {
    data?: Array<{ [key: string]: any }>;
    height?: number;
    maxValue?: number;
    minValue?: number;
    width?: number;
    layout?: 'horizontal' | 'vertical';
    type?: 'monotone' | 'number';
    dataKey?: string;
}

const YAxis: React.FC<YAxisProps> = ({
    data = [],
    height = 0,
    width = 0,
    maxValue = 0,
    minValue = 0,
    layout = 'horizontal',
    type = 'monotone',
    dataKey = 'name'
}) => {
    const positiveLines = 5;
    const negativeLines = minValue < 0 ? 5 : 0;
    const totalLines = minValue < 0 ? 10 : positiveLines;

    const positiveRange = maxValue / positiveLines;
    const negativeRange = minValue < 0 ? Math.abs(minValue) / negativeLines : 0;

    const formatValue = (value: number) => (value % 1 === 0 ? value.toString() : value.toFixed(2));

    const renderText = (x: number, y: number, value: string | number) => (
        <g key={uuidv4()}>
            {/* Tick mark line */}
            <line
                x1={-6}
                y1={y}
                x2={0}
                y2={y}
                stroke="#374151"
                strokeWidth={1}
            />
            {/* Label text */}
            <text
                x={-12}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                className="text-xs fill-gray-600 font-medium"
            >
                {value}
            </text>
        </g>
    );

    // Main axis line
    const axisLine = (
        <line
            x1={0}
            y1={0}
            x2={0}
            y2={height}
            stroke="#374151"
            strokeWidth={1}
        />
    );

    if (type === 'number') {
        return (
            <g className="y-axis" aria-label="Y Axis">
                {axisLine}
                {minValue < 0 &&
                    new Array(negativeLines).fill(null).map((_, index) => {
                        const value = -negativeRange * (negativeLines - index);
                        return renderText(-10, height - (index * height) / totalLines, formatValue(value));
                    })}

                {new Array(positiveLines + 1).fill(null).map((_, index) => {
                    const value = positiveRange * index;
                    return renderText(-10, height - ((index + negativeLines) * height) / totalLines, formatValue(value));
                })}
            </g>
        );
    }

    return (
        <g className="y-axis" aria-label="Y Axis">
            {axisLine}
            {layout === 'horizontal' && minValue < 0 &&
                new Array(negativeLines).fill(null).map((_, index) => {
                    const value = -negativeRange * (negativeLines - index);
                    return renderText(-10, height - (index * height) / totalLines, formatValue(value));
                })}

            {layout === 'horizontal' &&
                new Array(positiveLines + 1).fill(null).map((_, index) => {
                    const value = positiveRange * index;
                    return renderText(-10, height - ((index + negativeLines) * height) / totalLines, formatValue(value));
                })}

            {layout !== 'horizontal' &&
                data.map((entry, index) => 
                    renderText(-10, (index + 0.5) * (height / data.length), entry[dataKey])
                )}
        </g>
    );
};

export default YAxis;