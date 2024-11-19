import React from 'react';
import { render } from '@testing-library/react';
import Scatter from '../Scatter';
import LabelList from '../LabelList';

describe('Scatter Component', () => {
  const mockData = [
    { x: 10, y: 20 },
    { x: 30, y: 40 },
    { x: 50, y: 60 },
  ];

  const mockXScale = (value: number) => value * 2;
  const mockYScale = (value: number) => value * 3;

  it('renders without crashing', () => {
    const { container } = render(
      <Scatter 
        data={mockData} 
        xScale={mockXScale} 
        yScale={mockYScale} 
        fill="#ff0000" 
      />
    );
    expect(container).toBeInTheDocument();
  });

  it('renders correct number of points', () => {
    const { container } = render(
      <Scatter 
        data={mockData} 
        xScale={mockXScale} 
        yScale={mockYScale} 
      />
    );
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBe(3);
  });

  it('renders lines between points when "line" prop is true', () => {
    const { container } = render(
      <Scatter 
        data={mockData} 
        xScale={mockXScale} 
        yScale={mockYScale} 
        line 
      />
    );
    const lines = container.querySelectorAll('line');
    expect(lines.length).toBe(2); // Número de líneas = puntos - 1
  });

  it('renders labels when LabelList is provided as children', () => {
    const { container } = render(
      <Scatter 
        data={mockData} 
        xScale={mockXScale} 
        yScale={mockYScale}
      >
        <LabelList dataKey="x" data={mockData} xScale={mockXScale} yScale={mockYScale} />
      </Scatter>
    );
    const labels = container.querySelectorAll('text');
    expect(labels.length).toBe(3);
  });

  it('applies the correct fill color to points', () => {
    const { container } = render(
      <Scatter 
        data={mockData} 
        xScale={mockXScale} 
        yScale={mockYScale} 
        fill="#ff0000" 
      />
    );
    const circles = container.querySelectorAll('circle');
    circles.forEach((circle) => {
      expect(circle).toHaveAttribute('fill', '#ff0000');
    });
  });
});