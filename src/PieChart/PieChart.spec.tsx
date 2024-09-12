// PieChart/PieChart.spec.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import PieChart from './index';
import Pie from '../Pie/index';

describe('PieChart Component', () => {
  it('renders children correctly', () => {
    render(
      <PieChart width={400} height={400}>
        <Pie data={[{ name: 'Group A', value: 100 }]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
      </PieChart>
    );
    expect(screen.getByRole('svg')).toBeInTheDocument();
    expect(screen.getByRole('path')).toBeInTheDocument();
  });

  it('sets the correct width and height', () => {
    const { container } = render(
      <PieChart width={300} height={300}>
        <Pie data={[{ name: 'Group A', value: 100 }]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
      </PieChart>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('width', '300');
    expect(svgElement).toHaveAttribute('height', '300');
  });
});
