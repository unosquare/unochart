import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CartesianGrid from '../CartesianGrid';
import XAxis from '../XAxis';
import YAxis from '../YAxis';
import Tooltip from '../Tooltip';
import Legend from '../Legend';

interface ScatterChartProps {
    data: Array<{ x: number; y: number; z?: number }>;
    width?: number;
    height?: number;
    margin?: { top?: number; right?: number; bottom?: number; left?: number };
    children?: React.ReactNode;
}

const ScatterChart = ({
    data,
    width = 500,
    height = 400,
    margin = { top: 20, right: 20, bottom: 20, left: 20 },
    children,
}: ScatterChartProps) => {
    const [tooltipData, setTooltipData] = useState<{ x: number; y: number; z?: number } | null>(null);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const svgRef = useRef<SVGSVGElement>(null);

    const maxX = Math.max(...data.map((d) => d.x));
    const minX = Math.min(...data.map((d) => d.x));
    const maxY = Math.max(...data.map((d) => d.y));
    const minY = Math.min(...data.map((d) => d.y));

    const handleMouseOver = (event: React.MouseEvent, entry: { x: number; y: number; z?: number }) => {
        setTooltipData(entry);
        const svgRect = svgRef.current?.getBoundingClientRect();
        if (svgRect) {
            setPosition({ x: event.clientX - svgRect.left, y: event.clientY - svgRect.top });
        }
    };

    const handleMouseOut = () => {
        setTooltipData(null);
    };

    return (
        <div className='relative inline-block'>
            <svg
                ref={svgRef}
                width={width}
                height={height}
                style={{
                    margin: `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`,
                }}
            >
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <CartesianGrid width={width - (margin.left ?? 0) - (margin.right ?? 0)} height={height - (margin.top ?? 0) - (margin.bottom ?? 0)} />
                    
                    <XAxis
                        dataKey="x"
                        width={width - (margin.left ?? 0) - (margin.right ?? 0)}
                        height={height - (margin.top ?? 0) - (margin.bottom ?? 0)}
                        minValue={minX}
                        maxValue={maxX}
                    />
                    
                    <YAxis
                        height={height - (margin.top ?? 0) - (margin.bottom ?? 0)}
                        width={width - (margin.left ?? 0) - (margin.right ?? 0)}
                        minValue={minY}
                        maxValue={maxY}
                    />

                    {data.map((point) => (
                        <circle
                            key={uuidv4()}
                            cx={((point.x - minX) / (maxX - minX)) * (width - (margin.left ?? 0) - (margin.right ?? 0))}
                            cy={height - (margin.bottom ?? 0) - ((point.y - minY) / (maxY - minY)) * (height - (margin.top ?? 0) - (margin.bottom ?? 0))}
                            r={5}
                            fill="#8884d8"
                            onMouseOver={(event) => handleMouseOver(event, point)}
                            onMouseOut={handleMouseOut}
                        />
                    ))}
                </g>
            </svg>
            
            {tooltipData && (
                <Tooltip
                    tooltipData={{
                        name: `Point (${tooltipData.x}, ${tooltipData.y})`,
                        values: [
                            { key: 'x', value: tooltipData.x, color: '#8884d8' },
                            { key: 'y', value: tooltipData.y, color: '#82ca9d' },
                            ...(tooltipData.z ? [{ key: 'z', value: tooltipData.z, color: '#ffc658' }] : []),
                        ],
                    }}
                    position={position}
                />
            )}
            {children}
        </div>
    );
};

export default ScatterChart;
