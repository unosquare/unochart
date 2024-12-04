import React, { ReactNode } from 'react';
import PolarGrid from '../PolarGrid';
import PolarAngleAxis from '../PolarAngleAxis';
import PolarRadiusAxis from '../PolarRadiusAxis';
import Radar from '../Radar';
import Legend from '../Legend';
import Tooltip from '../Tooltip';

interface RadarChartProps {
    data: Array<{ [key: string]: any }>;
    width: number;
    height: number;
    outerRadius?: number;
    children: ReactNode;
}

const RadarChart: React.FC<RadarChartProps> = ({ 
    data, 
    width, 
    height, 
    outerRadius, 
    children 
}) => {
    // Calculate center points based on width and height
    const cx = width / 2;
    const cy = height / 2;
    // Use the smaller dimension to ensure chart fits
    const maxRadius = Math.min(width, height) / 2;
    const validOuterRadius = outerRadius || maxRadius * 0.8; // 80% of max by default

    const processedChildren = React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;

        const childProps: { [key: string]: any } = {};

        if (child.type === PolarGrid || child.type === PolarAngleAxis || child.type === PolarRadiusAxis) {
            childProps.cx = cx;
            childProps.cy = cy;
            childProps.radius = validOuterRadius;
        }

        if (child.type === PolarAngleAxis) {
            childProps.data = data;
        }

        if (child.type === PolarRadiusAxis) {
            childProps.angle = 0;
            childProps.domain = [0, 150];
        }

        if (child.type === Radar) {
            childProps.radius = validOuterRadius;
            childProps.data = data;
        }

        if (child.type === Legend || child.type === Tooltip) {
            childProps.data = data;
        }

        return React.cloneElement(child, childProps);
    });

    return (
        <svg 
            width={width} 
            height={height} 
            className="bg-white"
            viewBox={`0 0 ${width} ${height}`}
        >
            <g transform={`translate(${cx}, ${cy})`}>
                {processedChildren}
            </g>
        </svg>
    );
};

export default RadarChart;