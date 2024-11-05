import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LineChart from './index';
import Line from '../Line';

beforeEach(() => {
    (SVGElement.prototype as any).getBBox = jest.fn().mockReturnValue({
        x: 0,
        y: 0,
        width: 100,
        height: 50
    });
});

describe('LineChart', () => {
    const mockData = [
        { name: 'Page A', uv: 400, pv: 200 },
        { name: 'Page B', uv: 300, pv: 100 },
        { name: 'Page C', uv: 200, pv: 300 }
    ];

    it('renders without crashing', () => {
        const { container } = render(
            <LineChart width={500} height={300} data={mockData}>
                <Line dataKey="uv" stroke="#8884d8" data={mockData} xScale={(value) => value} yScale={(value) => value} />
            </LineChart>
        );
        expect(container).toBeInTheDocument();
    });

    it('renders multiple lines correctly', () => {
        const { container } = render(
            <LineChart width={500} height={300} data={mockData}>
                <Line dataKey="uv" stroke="#8884d8" data={mockData} xScale={(value) => value} yScale={(value) => value} />
                <Line dataKey="pv" stroke="#82ca9d" data={mockData} xScale={(value) => value} yScale={(value) => value} />
            </LineChart>
        );
        const paths = container.querySelectorAll('path');
        expect(paths.length).toBeGreaterThan(1);
    });

    it('handles mouse movement for tooltip', () => {
        const { container } = render(
            <LineChart width={500} height={300} data={mockData}>
                <Line dataKey="uv" stroke="#8884d8" data={mockData} xScale={(value) => value} yScale={(value) => value} />
            </LineChart>
        );
        const svg = container.querySelector('svg');
        if (svg) {
            fireEvent.mouseMove(svg, { clientX: 250, clientY: 150 });
            fireEvent.mouseLeave(svg);
        }
    });

});