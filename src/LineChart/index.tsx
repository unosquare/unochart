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

const findMinValue = (data: Array<{ [key: string]: any }>): number =>
    Math.floor(
        Math.min(...data.map((d) => Math.min(...Object.values(d).map((v) => (typeof v === 'number' ? v : Infinity))))),
    );

const roundMaxValue = (data: Array<{ [key: string]: any }>): { maxValue: number; minValue: number } => {
    const minValue = findMinValue(data);
    const maxValue = Math.max(
        ...data.map((d) => Math.max(...Object.values(d).map((v) => (typeof v === 'number' ? v : -Infinity)))),
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
    const [tooltipData, setTooltipData] = useState<{
        name: string;
        values: { key: string; value: number; color: string }[];
    } | null>(null);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

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

    const xAxis = Children.toArray(children).find((child) => React.isValidElement(child) && child.type === XAxis);
    const yAxis = Children.toArray(children).find((child) => React.isValidElement(child) && child.type === YAxis);
    const grid = Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === CartesianGrid,
    );
    const tooltip = Children.toArray(children).find((child) => React.isValidElement(child) && child.type === Tooltip);
    const legend = Children.toArray(children).find((child) => React.isValidElement(child) && child.type === Legend);

    const lineComponents = Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === Line,
    );

    const legendItems = lineComponents.map((child) => {
        if (React.isValidElement(child)) {
            const lineChild = child as React.ReactElement;
            return { color: lineChild.props.stroke, label: lineChild.props.dataKey };
        }
        return { color: '', label: '' };
    });

    const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
        const svgRect = svgRef.current?.getBoundingClientRect();
        if (!svgRect) return;

        const mouseX = event.clientX - svgRect.left - leftMargin;
        const xScale = chartWidth / (data.length - 1);
        const index = Math.round(mouseX / xScale);

        if (index >= 0 && index < data.length) {
            const entry = data[index];
            const values = lineComponents
                .map((child) => {
                    if (React.isValidElement(child)) {
                        const lineChild = child as React.ReactElement;
                        const dataKey = lineChild.props.dataKey;
                        return {
                            key: dataKey,
                            value: entry[dataKey],
                            color: lineChild.props.stroke,
                        };
                    }
                    return null;
                })
                .filter((v): v is { key: string; value: number; color: string } => v !== null);

            setTooltipData({ name: entry.name, values });
            setPosition({ x: event.clientX - svgRect.left, y: event.clientY - svgRect.top });
        }
    };

    const handleMouseLeave = () => {
        setTooltipData(null);
    };

    return (
        <div className='relative inline-block'>
            <svg
                ref={svgRef}
                width={width}
                height={height + height * 0.1}
                className='bg-white'
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <g transform={`translate(${leftMargin}, ${(margin.top ?? 0) + height * 0.05})`}>
                    {grid && cloneElement(grid as React.ReactElement, { width: chartWidth, height: chartHeight })}
                    {xAxis &&
                        cloneElement(xAxis as React.ReactElement, { data, width: chartWidth, height: chartHeight })}
                    {yAxis && cloneElement(yAxis as React.ReactElement, { height: chartHeight, minValue, maxValue })}
                    {Children.map(children, (child) =>
                        React.isValidElement(child) && child.type === Line
                            ? cloneElement(child, { data, chartWidth, chartHeight })
                            : child,
                    )}
                </g>
            </svg>
            {legend && cloneElement(legend as React.ReactElement, { items: legendItems })}
            {tooltip && <Tooltip tooltipData={tooltipData} position={position} />}
        </div>
    );
};

export default LineChart;
