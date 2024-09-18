import React from 'react';
import { render } from '@testing-library/react';
import PolarGrid from './index';

describe('PolarGrid', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <svg>
                <PolarGrid cx="50%" cy="50%" />
            </svg>
        );
        expect(container).toBeInTheDocument();
    });

    it('renders correct number of radial lines and concentric circles', () => {
        const { container } = render(
            <svg>
                <PolarGrid cx="50%" cy="50%" radialLines={8} concentricCircles={4} />
            </svg>
        );
        const lines = container.querySelectorAll('line');
        const circles = container.querySelectorAll('circle');
        expect(lines.length).toBe(8);
        expect(circles.length).toBe(4);
    });

    it('applies correct stroke color', () => {
        const { container } = render(
            <svg>
                <PolarGrid cx="50%" cy="50%" stroke="#123456" />
            </svg>
        );
        const lines = container.querySelector('line');
        const circles = container.querySelector('circle');
        expect(lines).toHaveAttribute('stroke', '#123456');
        expect(circles).toHaveAttribute('stroke', '#123456');
    });
});
