import React from 'react';
import { render } from '@testing-library/react';
import Radar from './index';

describe('Radar', () => {
    const mockData = [
        { subject: 'Math', A: 120, B: 110, fullMark: 150 },
        { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
        { subject: 'English', A: 86, B: 130, fullMark: 150 },
        { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
        { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
        { subject: 'History', A: 65, B: 85, fullMark: 150 },
    ];

    it('renders without crashing', () => {
        const { container } = render(
            <Radar name="Mike" dataKey="A" data={mockData} stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        );
        expect(container).toBeInTheDocument();
    });

    it('renders the correct number of radar shapes', () => {
        const { container } = render(
            <Radar name="Mike" dataKey="A" data={mockData} stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        );
        const radarShapes = container.querySelectorAll('path');
        expect(radarShapes.length).toBe(1);
    });

    it('applies the correct color to radar shapes', () => {
        const { container } = render(
            <Radar name="Mike" dataKey="A" data={mockData} stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        );
        const radarShape = container.querySelector('path');
        expect(radarShape).toHaveAttribute('fill', '#8884d8');
    });
});
