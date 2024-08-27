import React from 'react';
import { render } from '@testing-library/react';
import XAxis from './index';

describe('XAxis', () => {
    const mockData = [
        { name: 'Jan', value: 30 },
        { name: 'Feb', value: 20 },
    ];

    it('renders without crashing', () => {
        const { container } = render(
            <svg>
                <XAxis width={400} height={50} data={mockData} dataKey="name" />
            </svg>
        );
        expect(container).toBeInTheDocument();
    });

    it('renders the correct number of labels', () => {
        const { container } = render(
            <svg>
                <XAxis width={400} height={50} data={mockData} dataKey="name" />
            </svg>
        );
        const labels = container.querySelectorAll('text');
        expect(labels.length).toBe(2);
    });

    it('renders labels at the correct positions', () => {
        const { container } = render(
            <svg>
                <XAxis width={400} height={50} data={mockData} dataKey="name" />
            </svg>
        );
        const labelPositions = Array.from(container.querySelectorAll('text')).map(label => label.getAttribute('x'));
        expect(labelPositions.every(pos => parseInt(pos || '0') >= 0)).toBe(true);
    });
});
