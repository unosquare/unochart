import React, { ReactNode } from 'react';
import Pie from '../Pie';
import PolarAngleAxis from '../PolarAngleAxis';
import PolarRadiusAxis from '../PolarRadiusAxis';
import Tooltip from '../Tooltip';
import Legend from '../Legend';
import PolarGrid from '../PolarGrid';

interface PieChartProps {
    width: number;
    height: number;
    children: ReactNode;
}

const PieChart: React.FC<PieChartProps> = ({ width, height, children }) => {
    return (
        <svg width={width} height={height}>
            {children}
        </svg>
    );
};

export default PieChart;
