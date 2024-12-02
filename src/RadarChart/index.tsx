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
    outerRadius: number;
    children: ReactNode;
}

const RadarChart: React.FC<RadarChartProps> = ({ data, width, height, outerRadius, children }) => {
    const cx = isNaN(width / 2) ? 0 : width / 2;
    const cy = isNaN(height / 2) ? 0 : height / 2;
    const validOuterRadius = isNaN(outerRadius) ? 0 : outerRadius;

    const processedChildren = React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;

        const childProps: { [key: string]: any } = {};

        if (child.type === PolarGrid || child.type === PolarAngleAxis || child.type === PolarRadiusAxis) {
            childProps.cx = cx;
            childProps.cy = cy;
            childProps.outerRadius = validOuterRadius;
        }

        if (child.type === PolarAngleAxis) {
            childProps.data = data;
        }

        if (child.type === PolarRadiusAxis) {
            childProps.angle = 0; // Añadir un valor por defecto para angle
            childProps.domain = [0, 150]; // Añadir un valor por defecto para domain
            childProps.radius = validOuterRadius; // Asegúrate de que radius se pase correctamente
        }

        if (child.type === Radar) {
            childProps.cx = cx;
            childProps.cy = cy;
            childProps.outerRadius = validOuterRadius;
            childProps.data = data;
        }

        if (child.type === Legend || child.type === Tooltip) {
            childProps.data = data;
        }

        return React.cloneElement(child, childProps);
    });

    return (
        <svg width={width} height={height} className="bg-white">
            <g transform={`translate(${cx}, ${cy})`}>{processedChildren}</g>
        </svg>
    );
};

export default RadarChart;
