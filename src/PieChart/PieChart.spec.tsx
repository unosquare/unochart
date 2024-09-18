import React from 'react';
import { render } from '@testing-library/react';
import PieChart from './index';
import Pie from '../Pie';

describe('PieChart', () => {
    const mockData = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
    ];

    it('renders without crashing', () => {
        const { container } = render(
            <PieChart width={500} height={400}>
                <Pie data={mockData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" />
            </PieChart>
        );
        expect(container).toBeInTheDocument();
    });

    it('renders with correct width and height', () => {
        const { container } = render(
            <PieChart width={500} height={400}>
                <Pie data={mockData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" />
            </PieChart>
        );
        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('width', '500');
        expect(svg).toHaveAttribute('height', '400');
    });
});
