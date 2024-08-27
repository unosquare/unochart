import React from 'react';
import { render } from '@testing-library/react';
import CartesianGrid from './index';

describe('CartesianGrid', () => {

    it('renders without crashing', () => {
        const { container } = render(<CartesianGrid width={400} height={300} />);
        expect(container).toBeInTheDocument();
    });

    it('renders the correct number of grid lines', () => {
        const { container } = render(<CartesianGrid width={400} height={300} />);
        const lines = container.querySelectorAll('line');
        expect(lines.length).toBeGreaterThan(0);
    });

    it('renders grid lines with correct strokeDasharray', () => {
        const { container } = render(<CartesianGrid width={400} height={300} strokeDasharray="3 3" />);
        const line = container.querySelector('line');
        expect(line).toHaveAttribute('stroke-dasharray', '3 3');
    });
});
