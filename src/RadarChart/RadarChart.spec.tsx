import React from 'react';
import { render } from '@testing-library/react';
import RadarChart from './index';
import PolarGrid from '../PolarGrid';
import PolarAngleAxis from '../PolarAngleAxis';
import PolarRadiusAxis from '../PolarRadiusAxis';
import Radar from '../Radar';
import Legend from '../Legend';
import Tooltip from '../Tooltip';
import { mockData } from '../constants';

const renderRadarChart = () => {
    return render(
        <RadarChart data={mockData} width={500} height={500}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" data={mockData} />
            <PolarRadiusAxis angle={30} domain={[0, 150]} radius={100} />
            <Radar name="Mike" dataKey="A" data={mockData} stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Legend />
            <Tooltip />
        </RadarChart>
    );
};

describe('RadarChart', () => {
    it('renders without crashing', () => {
        const { container } = renderRadarChart();
        expect(container).toBeInTheDocument();
    });

    it('renders the correct number of radar shapes', () => {
        const { container } = renderRadarChart();
        const radarShapes = container.querySelectorAll('path');
        expect(radarShapes.length).toBe(1);
    });

    it('applies the correct color to radar shapes', () => {
        const { container } = renderRadarChart();
        const radarShape = container.querySelector('path');
        expect(radarShape).toHaveAttribute('fill', '#8884d8');
    });
});
