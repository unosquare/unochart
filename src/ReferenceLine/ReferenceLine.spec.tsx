import React from 'react';
import { render } from '@testing-library/react';
import ReferenceLine from './index';

describe('ReferenceLine', () => {
    const mockProps = {
        chartWidth: 500,
        chartHeight: 300,
        xScale: (value: number | string) => typeof value === 'number' ? value * 100 : 0,
        yScale: (value: number) => value * 2
    };

    it('renders vertical line when x is provided', () => {
        const { container } = render(
            <svg>
                <ReferenceLine x={2} {...mockProps} />
            </svg>
        );
        const line = container.querySelector('line');
        expect(line).toHaveAttribute('x1', '200');
        expect(line).toHaveAttribute('x2', '200');
    });

    it('renders horizontal line when y is provided', () => {
        const { container } = render(
            <svg>
                <ReferenceLine y={100} {...mockProps} />
            </svg>
        );
        const line = container.querySelector('line');
        expect(line).toHaveAttribute('y1', '200');
        expect(line).toHaveAttribute('y2', '200');
    });

    it('renders label when provided', () => {
        const { container } = render(
            <svg>
                <ReferenceLine x={2} label="Test Label" {...mockProps} />
            </svg>
        );
        const text = container.querySelector('text');
        expect(text).toHaveTextContent('Test Label');
    });

    it('applies custom stroke color', () => {
        const { container } = render(
            <svg>
                <ReferenceLine x={2} stroke="#ff0000" {...mockProps} />
            </svg>
        );
        const line = container.querySelector('line');
        expect(line).toHaveAttribute('stroke', '#ff0000');
    });
});