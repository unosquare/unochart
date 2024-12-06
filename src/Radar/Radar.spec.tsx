import React from 'react';
import { render } from '@testing-library/react';
import Radar from './index';
import { mockData } from '../constants';

describe('Radar', () => {
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
