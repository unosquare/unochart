import React, { ReactNode } from 'react';

interface PieChartProps {
    width: number;
    height: number;
    children: ReactNode;
}

const PieChart: React.FC<PieChartProps> = ({ width, height, children }) => (
    <svg width={width} height={height}>
        {children}
    </svg>
);

export default PieChart;
