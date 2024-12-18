import React, { useState } from 'react';
import Tooltip from '../Tooltip';
import Legend from '../Legend';

interface RadialBarChartProps {
    width: number;
    height: number;
    innerRadius: string | number;
    outerRadius: string | number;
    data: Array<any>;
    startAngle?: number;
    endAngle?: number;
    children: React.ReactNode;
}

const RadialBarChart: React.FC<RadialBarChartProps> = ({
    width,
    height,
    innerRadius,
    outerRadius,
    data,
    startAngle = 180,
    endAngle = 0,
    children,
}) => {
    const cx = width / 2;
    const cy = height / 2;
    const [tooltipData, setTooltipData] = useState<any>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event: React.MouseEvent<SVGElement>) => {
        const target = event.target as SVGElement;
        if (target.tagName === 'path') {
            const name = target.getAttribute('data-name');
            const value = target.getAttribute('data-value');
            const color = target.getAttribute('fill');

            if (name && value && color) {
                const rect = (event.currentTarget as SVGElement).getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                setTooltipData({
                    name,
                    values: [{
                        key: name,
                        value: parseFloat(value),
                        color,
                    }],
                });
                setTooltipPosition({ x, y });
            }
        }
    };

    const handleMouseLeave = () => {
        setTooltipData(null);
    };

    return (
        <div className="relative w-full flex flex-col items-center justify-center gap-4">
            <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                className="overflow-visible"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <g transform={`translate(${cx}, ${cy})`}>
                    {React.Children.map(children, (child) => {
                        if (!React.isValidElement(child)) return null;
                        
                        if (child.type === Tooltip) {
                            return React.cloneElement(child, {
                                tooltipData,
                                position: tooltipPosition,
                            });
                        }
                        
                        if (child.type === Legend) {
                            return null; // Don't render legend inside SVG
                        }
                        
                        return React.cloneElement(child, {
                            data,
                            cx,
                            cy,
                            innerRadius,
                            outerRadius,
                            startAngle,
                            endAngle,
                        });
                    })}
                </g>
            </svg>
            {/* Render legend outside of SVG */}
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === Legend) {
                    return React.cloneElement(child, {
                        items: data.map((item) => ({ color: item.fill, label: item.name }))
                    });
                }
                return null;
            })}
            {tooltipData && (
                <Tooltip
                    tooltipData={tooltipData}
                    position={tooltipPosition}
                />
            )}
        </div>
    );
};

export default RadialBarChart;

