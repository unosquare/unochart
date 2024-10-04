import React, { Children, cloneElement, ReactNode, useEffect, useRef, useState } from 'react';
import CartesianGrid from '../CartesianGrid';
import XAxis from '../XAxis';
import YAxis from '../YAxis';
import Tooltip from '../Tooltip';
import Legend from '../Legend';
import Line from '../Line';

interface LineChartProps {
    width: number;
    height: number;
    data: Array<{ [key: string]: any }>;
    margin?: { top?: number; right?: number; bottom?: number; left?: number };
    children: ReactNode;
}


// Función para encontrar el valor mínimo
const findMinValue = (data: Array<{ [key: string]: any }>): number => {
    return Math.floor(
        Math.min(
            ...data.map(d =>
                Math.min(...Object.values(d).map(v => (typeof v === 'number' ? v : Infinity))),
            ),
        ),
    );
};

// Función para redondear el valor máximo
const roundMaxValue = (data: Array<{ [key: string]: any }>): { maxValue: number; minValue: number } => {
    const minValue = findMinValue(data);
    const maxValue = Math.max(
        ...data.map(d =>
            Math.max(...Object.values(d).map(v => (typeof v === 'number' ? v : -Infinity))),
        ),
    );

    const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue)));
    const factor = maxValue / magnitude;

    let finalMaxValue;
    if (factor <= 1.5) {
        finalMaxValue = 1.5 * magnitude;
    } else if (factor <= 3) {
        finalMaxValue = 3 * magnitude;
    } else if (factor <= 7) {
        finalMaxValue = 7 * magnitude;
    } else {
        finalMaxValue = 10 * magnitude;
    }

    // Si el valor mínimo es negativo, ajustar para que sean simétricos
    const finalMinValue = minValue < 0 ? -finalMaxValue : 0;

    return {
        maxValue: Math.ceil(finalMaxValue),
        minValue: finalMinValue,
    };
};

const LineChart: React.FC<LineChartProps> = ({
    width,
    height,
    data,
    margin = { top: 20, right: 30, bottom: 20, left: 40 },
    children,
}) => {
    const chartWidth = width - ((margin.left ?? 0) + (margin.right ?? 0));
    const chartHeight = height - ((margin.top ?? 0) + (margin.bottom ?? 0));

    const { maxValue, minValue } = roundMaxValue(data);
    const [leftMargin, setLeftMargin] = useState(margin.left);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (svgRef.current) {
            const yAxisLabels = svgRef.current.querySelectorAll('.y-axis text');
            const maxWidth = Array.from(yAxisLabels).reduce((maxWidth, text) => {
                const width = (text as SVGTextElement).getBBox().width;
                return Math.max(maxWidth, width);
            }, 0);
            setLeftMargin(maxWidth + (margin.left ?? 0) * 0.5);
        }
    }, [data, margin.left]);


    const xAxis = Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === XAxis
    );
    const yAxis = Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === YAxis
    );
    const grid = Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === CartesianGrid
    );
    const tooltip = Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === Tooltip
    );
    const legend = Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === Legend
    );

    return (
        <div className='relative inline-block'>
            <svg ref={svgRef} width={width} height={height + height * 0.1} className='bg-white'>
                <g transform={`translate(${leftMargin}, ${(margin.top ?? 0) + height * 0.05})`}>
                    {grid && cloneElement(grid as React.ReactElement, { width: chartWidth, height: chartHeight })}
                    {xAxis && cloneElement(xAxis as React.ReactElement, { data, width: chartWidth, height: chartHeight })}
                    {yAxis && cloneElement(yAxis as React.ReactElement, { height: chartHeight, minValue, maxValue })}
                    {Children.map(children, (child) =>
                        React.isValidElement(child) && child.type === Line
                            ? cloneElement(child, { data, chartWidth, chartHeight })
                            : child
                    )}
                </g>
            </svg>
            {legend && cloneElement(legend as React.ReactElement)}
            {tooltip && cloneElement(tooltip as React.ReactElement, { tooltipData: null, position: { x: 0, y: 0 } })}
        </div>
    );
};

export default LineChart;
