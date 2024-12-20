import React, { Children, cloneElement, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import CartesianGrid from '../CartesianGrid';
import Legend from '../Legend';
import Scatter from '../Scatter';
import Tooltip from '../Tooltip';
import XAxis from '../XAxis';
import YAxis from '../YAxis';

interface ScatterChartProps {
    width: number;
    height: number;
    data: Array<{ [key: string]: any }>;
    margin?: { top?: number; right?: number; bottom?: number; left?: number };
    children: ReactNode;
    theme?: 'light' | 'dark';
}

export const getDataRange = (data: Array<{ [key: string]: any }>, key: string): { min: number; max: number } => {
    const values = data.map((d) => d[key]).filter((v) => typeof v === 'number');
    return {
        min: Math.min(...values),
        max: Math.max(...values),
    };
};

export const roundToNiceNumber = (value: number): number => {
    const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
    const normalizedValue = value / magnitude;
    const steps = Math.ceil(normalizedValue * 5) / 5;
    return Math.ceil((steps * magnitude) / 100) * 100;
};

const ScatterChart: React.FC<ScatterChartProps> = ({
    width,
    height,
    data,
    margin = { top: 20, right: 30, bottom: 20, left: 40 },
    children,
    theme = 'light',
}) => {
    const chartWidth = width - ((margin.left ?? 0) + (margin.right ?? 0) + 20);
    const chartHeight = height - ((margin.top ?? 0) + (margin.bottom ?? 0) + 20);

    const xRange = useMemo(() => getDataRange(data, 'x'), [data]);
    const yRange = useMemo(() => getDataRange(data, 'y'), [data]);

    const xMax = useMemo(() => roundToNiceNumber(xRange.max), [xRange.max]);
    const yMax = useMemo(() => roundToNiceNumber(yRange.max), [yRange.max]);

    const [leftMargin, setLeftMargin] = useState(margin.left);
    const svgRef = useRef<SVGSVGElement>(null);
    const [tooltipData, setTooltipData] = useState<{
        name: string;
        values: { key: string; value: number; color: string }[];
    } | null>(null);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

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
    const scatter = Children.toArray(children).find((child) => React.isValidElement(child) && child.type === Scatter);

    const scatterFill = React.isValidElement(scatter) ? scatter.props.fill : '#8884d8';

    const xScale = (value: number) => ((value - 0) / (xMax - 0)) * chartWidth;
    const yScale = (value: number) => chartHeight - ((value - 0) / (yMax - 0)) * chartHeight;

    const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
        const svgRect = svgRef.current?.getBoundingClientRect();
        if (!svgRect) return;

        const mouseX = event.clientX - svgRect.left - (leftMargin ?? 0);
        const mouseY = event.clientY - svgRect.top - (margin.top ?? 0);

        const closestPoint = data.reduce(
            (closest, point, index) => {
                const pointX = xScale(point.x);
                const pointY = yScale(point.y);
                const distance = Math.sqrt(Math.pow(mouseX - pointX, 2) + Math.pow(mouseY - pointY, 2));

                if (distance < closest.distance) {
                    return { point, distance, index };
                }
                return closest;
            },
            { point: null, distance: Number.POSITIVE_INFINITY, index: -1 },
        );

        if (closestPoint.point && closestPoint.distance < 50) {
            setTooltipData({
                name: 'Point',
                values: [
                    { key: 'x', value: closestPoint.point.x, color: 'blue' },
                    { key: 'y', value: closestPoint.point.y, color: 'green' },
                ],
            });
            setPosition({ x: event.clientX - svgRect.left, y: event.clientY - svgRect.top });
            setHoveredPoint(closestPoint.index);
        } else {
            setTooltipData(null);
            setHoveredPoint(null);
        }
    };

    const handleMouseLeave = () => {
        setTooltipData(null);
        setHoveredPoint(null);
    };

    return (
        <div className={`relative inline-block ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <svg
                ref={svgRef}
                width={width}
                height={height}
                className='bg-white transition-all duration-300 ease-in-out'
                style={{ overflow: 'visible' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <g transform={`translate(${(leftMargin ?? 0) + 10}, ${(margin.top ?? 0) + 10})`}>
                    {grid && cloneElement(grid as React.ReactElement, { width: chartWidth, height: chartHeight })}
                    {xAxis &&
                        cloneElement(xAxis as React.ReactElement, {
                            data,
                            width: chartWidth,
                            height: chartHeight,
                            maxValue: xMax,
                            minValue: 0,
                        })}
                    {yAxis &&
                        cloneElement(yAxis as React.ReactElement, {
                            height: chartHeight,
                            maxValue: yMax,
                            minValue: 0,
                        })}
                    {scatter &&
                        cloneElement(scatter as React.ReactElement, {
                            data,
                            xScale,
                            yScale,
                            hoveredPoint,
                        })}
                </g>
            </svg>
            {legend &&
                cloneElement(legend as React.ReactElement, {
                    items: [{ color: scatterFill, label: 'Scatter Points' }],
                })}
            {tooltip && <Tooltip tooltipData={tooltipData} position={position} />}
        </div>
    );
};

export default ScatterChart;
