import React, { Children, cloneElement, ReactNode, useEffect, useRef, useState } from 'react';
import CartesianGrid from '../CartesianGrid';
import XAxis from '../XAxis';
import YAxis from '../YAxis';
import Tooltip from '../Tooltip';
import Legend from '../Legend';
import Scatter from '../Scatter';

interface ScatterChartProps {
    width: number;
    height: number;
    data: Array<{ [key: string]: any }>;
    margin?: { top?: number; right?: number; bottom?: number; left?: number };
    children: ReactNode;
}

export const getDataRange = (data: Array<{ [key: string]: any }>, key: string): { min: number; max: number } => {
    const values = data.map(d => d[key]).filter(v => typeof v === 'number');
    return {
        min: Math.min(...values),
        max: Math.max(...values)
    };
};

export const roundToNiceNumber = (value: number): number => {
    const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
    const normalizedValue = value / magnitude;
    const steps = Math.ceil(normalizedValue * 5) / 5;
    return Math.ceil(steps * magnitude / 100) * 100;
};

const ScatterChart: React.FC<ScatterChartProps> = ({
    width,
    height,
    data,
    margin = { top: 20, right: 30, bottom: 20, left: 40 },
    children,
}) => {
    const chartWidth = width - ((margin.left ?? 0) + (margin.right ?? 0));
    const chartHeight = height - ((margin.top ?? 0) + (margin.bottom ?? 0));

    const xRange = getDataRange(data, 'x');
    const yRange = getDataRange(data, 'y');

    const xMax = roundToNiceNumber(xRange.max);
    const yMax = roundToNiceNumber(yRange.max);

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
    const scatter = Children.toArray(children).find((child) => React.isValidElement(child) && child.type === Scatter);

    const scatterFill = React.isValidElement(scatter) ? scatter.props.fill : '#8884d8';

    const xScale = (value: number) => (value - 0) / (xMax - 0) * chartWidth;
    const yScale = (value: number) => chartHeight - ((value - 0) / (yMax - 0) * chartHeight);

    const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
        const svgRect = svgRef.current?.getBoundingClientRect();
        if (!svgRect) return;

        const mouseX = event.clientX - svgRect.left - (leftMargin ?? 0);
        const mouseY = event.clientY - svgRect.top - (margin.top ?? 0);

        const closestPoint = data.reduce((closest, point) => {
            const pointX = xScale(point.x);
            const pointY = yScale(point.y);
            const distance = Math.sqrt(Math.pow(mouseX - pointX, 2) + Math.pow(mouseY - pointY, 2));
            
            if (distance < closest.distance) {
                return { point, distance };
            }
            return closest;
        }, { point: null, distance: Infinity });

        if (closestPoint.point && closestPoint.distance < 50) {
            setTooltipData({
                name: 'Point',
                values: [
                    { key: 'x', value: closestPoint.point.x, color: 'blue' },
                    { key: 'y', value: closestPoint.point.y, color: 'green' }
                ]
            });
            setPosition({ x: event.clientX - svgRect.left, y: event.clientY - svgRect.top });
        } else {
            setTooltipData(null);
        }
    };

    const handleMouseLeave = () => {
        setTooltipData(null);
    };

    return (
        <div className='relative inline-block'>
            <svg
                ref={svgRef}
                width={width + width * 0.1}
                height={height + height * 0.1}
                className='bg-white'
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <g transform={`translate(${leftMargin}, ${(margin.top ?? 0) + height * 0.05})`}>
                    {grid && cloneElement(grid as React.ReactElement, { width: chartWidth, height: chartHeight })}
                    {xAxis && cloneElement(xAxis as React.ReactElement, {
                        data,
                        width: chartWidth,
                        height: chartHeight,
                        maxValue: xMax,
                        minValue: 0
                    })}
                    {yAxis && cloneElement(yAxis as React.ReactElement, {
                        height: chartHeight,
                        maxValue: yMax,
                        minValue: 0
                    })}
                    {scatter && cloneElement(scatter as React.ReactElement, { data, xScale, yScale })}
                </g>
            </svg>
            {legend && cloneElement(legend as React.ReactElement, {
                items: [{ color: scatterFill, label: 'Scatter Points' }]
            })}
            {tooltip && <Tooltip tooltipData={tooltipData} position={position} />}
        </div>
    );
};

export default ScatterChart;
