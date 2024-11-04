import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface XAxisProps {
    data?: Array<{ [key: string]: any }>;
    width?: number;
    height?: number;
    dataKey?: string;
    maxValue?: number;
    minValue?: number;
    layout?: 'horizontal' | 'vertical';
    type?: 'monotone' | 'number';
}

const XAxis: React.FC<XAxisProps> = ({
    data = [],
    width = 0,
    height = 0,
    dataKey = 'name',
    maxValue = 0,
    minValue = 0,
    layout = 'horizontal',
    type = 'monotone',
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
                x1={x}
                y1={height}
                x2={x}
                y2={height + 6}
                stroke="#374151"
                strokeWidth={1}
            />
            {/* Label text */}
            <text
                x={x}
                y={height + 20}
                textAnchor="middle"
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
            y1={height}
            x2={width}
            y2={height}
            stroke="#374151"
            strokeWidth={1}
        />
    );

    if (type === 'number') {
        return (
            <g className="x-axis" aria-label="X Axis">
                {axisLine}
                {minValue < 0 &&
                    new Array(negativeLines).fill(null).map((_, index) => {
                        const value = -negativeRange * (negativeLines - index);
                        return renderText((index * width) / totalLines, height, formatValue(value));
                    })}

                {new Array(positiveLines + 1).fill(null).map((_, index) => {
                    const value = positiveRange * index;
                    return renderText(((index + negativeLines) * width) / totalLines, height, formatValue(value));
                })}
            </g>
        );
    }

    return (
        <g className="x-axis" aria-label="X Axis">
            {axisLine}
            {layout === 'horizontal' ? (
                data.map((entry, index) => 
                    renderText((index + 0.5) * (width / data.length), height, entry[dataKey])
                )
            ) : (
                <>
                    {minValue < 0 &&
                        new Array(negativeLines).fill(null).map((_, index) => {
                            const value = -negativeRange * (negativeLines - index);
                            return renderText((index * width) / totalLines, height, formatValue(value));
                        })}

                    {new Array(positiveLines + 1).fill(null).map((_, index) => {
                        const value = positiveRange * index;
                        return renderText(((index + negativeLines) * width) / totalLines, height, formatValue(value));
                    })}
                </>
            )}
        </g>
    );
};

export default XAxis;