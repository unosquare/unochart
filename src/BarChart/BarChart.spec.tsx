import React from 'react';
import { render } from '@testing-library/react';
import BarChart from './index';
import Bar from '../Bar';
import { ChartData } from '../constants';

describe('BarChart', () => {
    const mockData: ChartData = [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    ];

    it('renders without crashing', () => {
        const { container } = render(
            <BarChart data={mockData}>
                <Bar dataKey="pv" fill="#8884d8" />
            </BarChart>
        );
        expect(container).toBeInTheDocument();
    } );

    it('displays the correct number of bars', () => {
        const { container } = render(
            <BarChart data={mockData}>
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
        );
        const bars = container.querySelectorAll('rect');
        expect(bars.length).toBe(4); // 2 data points * 2 bars
    });

    it('has the correct width and height attributes', () => {
        const { container } = render(
            <BarChart data={mockData} width={500} height={400}>
                <Bar dataKey="pv" fill="#8884d8" />
            </BarChart>
        );
        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('width', '500');
        expect(svg).toHaveAttribute('height', '440');
    });
});
