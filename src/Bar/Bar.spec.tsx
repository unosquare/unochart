import React from 'react';
import { render } from '@testing-library/react';
import Bar from './index';

describe('Bar', () => {
    const mockData = [{ name: 'Page A', uv: 4000 }];

    it('renders without crashing', () => {
        const { container } = render(<Bar data={mockData} dataKey="uv" fill="#8884d8" />);
        expect(container).toBeInTheDocument();
    } );

    it('renders the correct number of bars', () => {
        const { container } = render(<Bar data={mockData} dataKey="uv" fill="#8884d8" />);
        const bars = container.querySelectorAll('rect');
        expect(bars.length).toBe(1);
    });

    it('applies the correct color to bars', () => {
        const { container } = render(<Bar data={mockData} dataKey="uv" fill="#8884d8" />);
        const bar = container.querySelector('rect');
        expect(bar).toHaveAttribute('fill', '#8884d8');
    });
});
