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

const LineChart: React.FC<LineChartProps> = ({
    width,
    height,
    data,
    margin = { top: 20, right: 30, bottom: 20, left: 40 },
    children,
}) => {
    const chartWidth = width - ((margin.left ?? 0) + (margin.right ?? 0));
    const chartHeight = height - ((margin.top ?? 0) + (margin.bottom ?? 0));
    const [tooltipData, setTooltipData] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
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

    return (
        <div className='relative inline-block'>
            <svg ref={svgRef} width={width} height={height + height * 0.1} className='bg-white'>
                <g transform={`translate(${leftMargin}, ${margin.top + height * 0.05})`}>
                    <CartesianGrid width={chartWidth} height={chartHeight} layout='horizontal' />
                    <XAxis data={data} width={chartWidth} height={chartHeight} dataKey='name' layout='horizontal' />
                    <YAxis
                        height={chartHeight}
                        maxValue={Math.max(...data.map((d) => d.pv))}
                        minValue={0}
                        layout='horizontal'
                    />
                    {Children.map(children, (child) =>
                        React.isValidElement(child) && child.type === Line
                            ? cloneElement(child, { data, chartWidth, chartHeight })
                            : child,
                    )}
                </g>
            </svg>
            <Legend />
            {tooltipData && <Tooltip tooltipData={tooltipData} position={position} />}
        </div>
    );
};

export default LineChart;
