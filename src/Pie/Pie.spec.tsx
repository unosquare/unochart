import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pie from './index';

describe('Pie', () => {
    const mockData = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
    ];

    it('renders without crashing', () => {
        const { container } = render(
            <svg>
                <Pie data={mockData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" />
            </svg>
        );
        expect(container).toBeInTheDocument();
    });

    it('displays the correct number of pie segments', () => {
        const { container } = render(
            <svg>
                <Pie data={mockData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" />
            </svg>
        );
        const paths = container.querySelectorAll('path');
        expect(paths.length).toBe(mockData.length);
    });

    it('changes shape when activeShape is true', () => {
        const { container } = render(
          <Pie
            data={mockData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            activeShape={true}
          />
        );
        
        const path = container.querySelector('path');
        fireEvent.mouseEnter(path!);
        
        setTimeout(() => {
          expect(path).toHaveStyle('transform: scale(1.05)');
        }, 200);
      });
});
