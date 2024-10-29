import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Line from './index';

describe('Line', () => {
    const mockData = [
        { name: 'Page A', value: 400 },
        { name: 'Page B', value: 300 },
        { name: 'Page C', value: 200 }
    ];

    const mockScales = {
        xScale: (value: string | number) => typeof value === 'number' ? value * 100 : parseFloat(value) * 100,
        yScale: (value: number) => value
    };

    it('renders without crashing', () => {
        const { container } = render(
            <svg>
                <Line
                    data={mockData}
                    dataKey="value"
                    stroke="#000"
                    xScale={mockScales.xScale}
                    yScale={mockScales.yScale}
                />
            </svg>
        );
        expect(container).toBeInTheDocument();
    });

    it('renders correct number of points', () => {
        const { container } = render(
            <svg>
                <Line
                    data={mockData}
                    dataKey="value"
                    stroke="#000"
                    xScale={mockScales.xScale}
                    yScale={mockScales.yScale}
                />
            </svg>
        );
        const points = container.querySelectorAll('circle');
        expect(points).toHaveLength(3);
    });

    it('handles mouse events', () => {
        const mockMouseOver = jest.fn();
        const mockMouseOut = jest.fn();

        const { container } = render(
            <svg>
                <Line
                    data={mockData}
                    dataKey="value"
                    stroke="#000"
                    xScale={mockScales.xScale}
                    yScale={mockScales.yScale}
                    onMouseOver={mockMouseOver}
                    onMouseOut={mockMouseOut}
                />
            </svg>
        );

        const point = container.querySelector('circle');
        if (point) {
            fireEvent.mouseOver(point);
            expect(mockMouseOver).toHaveBeenCalled();
            
            fireEvent.mouseOut(point);
            expect(mockMouseOut).toHaveBeenCalled();
        }
    });

    it('renders labels when enabled', () => {
        const { container } = render(
            <svg>
                <Line
                    data={mockData}
                    dataKey="value"
                    stroke="#000"
                    xScale={mockScales.xScale}
                    yScale={mockScales.yScale}
                    label={true}
                />
            </svg>
        );
        const labels = container.querySelectorAll('text');
        expect(labels).toHaveLength(3);
    });
});