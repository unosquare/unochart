// PolarGrid/PolarGrid.spec.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import PolarGrid from './index';

describe('PolarGrid Component', () => {
  it('renders the correct number of radial lines', () => {
    render(<svg><PolarGrid radialLines={8} /></svg>);
    const lines = screen.getAllByRole('line');
    expect(lines).toHaveLength(8);
  });

  it('renders the correct number of concentric circles', () => {
    render(<svg><PolarGrid concentricCircles={4} /></svg>);
    const circles = screen.getAllByRole('circle');
    expect(circles).toHaveLength(4);
  });

  it('applies the correct stroke color', () => {
    const { container } = render(<svg><PolarGrid stroke="#ff0000" /></svg>);
    const line = container.querySelector('line');
    const circle = container.querySelector('circle');
    expect(line).toHaveAttribute('stroke', '#ff0000');
    expect(circle).toHaveAttribute('stroke', '#ff0000');
  });
});
