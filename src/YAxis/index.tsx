import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { calculateAxisConfig, formatValue } from '../utils';

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
    dataKey = 'name',
}) => {
    const { positiveLines, negativeLines, totalLines, positiveRange, negativeRange } = calculateAxisConfig(
        maxValue,
        minValue,
    );

    const renderText = (x: number, y: number, value: string | number) => (
        <g key={uuidv4()}>
            <line x1={0} y1={y} x2={-6} y2={y} stroke='currentColor' strokeWidth={1} />
            <text x={x} y={y} textAnchor='end' dominantBaseline='middle' fill='currentColor' fontSize={12}>
                {value}
            </text>
        </g>
    );

    const axisLine = <line x1={0} y1={0} x2={0} y2={height} stroke='currentColor' strokeWidth={1} />;

    if (type === 'number') {
        return (
            <g>
                {axisLine}
                {minValue < 0 &&
                    new Array(negativeLines).fill(null).map((_, index) => {
                        const value = -negativeRange * (negativeLines - index);
                        return renderText(-10, height - (index * height) / totalLines, formatValue(value));
                    })}

                {new Array(positiveLines + 1).fill(null).map((_, index) => {
                    const value = positiveRange * index;
                    return renderText(
                        -10,
                        height - ((index + negativeLines) * height) / totalLines,
                        formatValue(value),
                    );
                })}
            </g>
        );
    }

    return (
        <g>
            {axisLine}
            {layout === 'horizontal' &&
                minValue < 0 &&
                new Array(negativeLines).fill(null).map((_, index) => {
                    const value = -negativeRange * (negativeLines - index);
                    return renderText(-10, height - (index * height) / totalLines, formatValue(value));
                })}

            {layout === 'horizontal' &&
                new Array(positiveLines + 1).fill(null).map((_, index) => {
                    const value = positiveRange * index;
                    return renderText(
                        -10,
                        height - ((index + negativeLines) * height) / totalLines,
                        formatValue(value),
                    );
                })}

            {layout !== 'horizontal' &&
                data.map((entry, index) => renderText(-10, (index + 0.5) * (height / data.length), entry[dataKey]))}
        </g>
    );
};

export default YAxis;
