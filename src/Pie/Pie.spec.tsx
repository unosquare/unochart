// Pie/Pie.spec.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pie from './index';

describe('Pie Component', () => {
  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
  ];

  it('renders correctly with required props', () => {
    render(
      <svg>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
      </svg>
    );
    const paths = screen.getAllByRole('path');
    expect(paths).toHaveLength(data.length);
  });

  it('displays labels when label prop is passed as percent', () => {
    render(
      <svg>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label="percent" />
      </svg>
    );
    expect(screen.getByText('57.1%')).toBeInTheDocument(); // Percentage label
  });

  it('highlights active shape on mouse over when activeShape is true', () => {
    render(
      <svg>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" activeShape />
      </svg>
    );
    const firstPath = screen.getAllByRole('path')[0];
    fireEvent.mouseEnter(firstPath);
    expect(firstPath).toHaveStyle('transform: scale(1.05)');
  });
});
