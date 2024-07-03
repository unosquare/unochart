import React from 'react';
import { render } from '@testing-library/react';
import BarChart from './index';

describe('BarChart', () => {
    const data = [
        { name: 'A', value: 30 },
        { name: 'B', value: 80 },
        { name: 'C', value: 45 },
        { name: 'D', value: 60 },
    ];

    it('renders the correct number of bars', () => {
        const { container } = render(<BarChart data={data} />);
        expect(container.querySelectorAll('rect').length).toBe(data.length);
    });

    it('renders bars with correct height', () => {
        const { container } = render(<BarChart data={data} />);
        const rects = container.querySelectorAll('rect');
        const maxValue = Math.max(...data.map(d => d.value));
        
        rects.forEach((rect, index) => {
            const expectedHeight = (data[index].value / maxValue) * 300; // Assuming default height 300
            expect(parseFloat(rect.getAttribute('height') || '')).toBeCloseTo(expectedHeight, 1);
        });
    });

    it('applies the correct bar color', () => {
        const barColor = '#82ca9d';
        const { container } = render(<BarChart data={data} barColor={barColor} />);
        const rects = container.querySelectorAll('rect');
        
        rects.forEach(rect => {
            expect(rect.getAttribute('fill')).toBe(barColor);
        });
    });
});
