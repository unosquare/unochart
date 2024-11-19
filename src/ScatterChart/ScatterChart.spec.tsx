import React from 'react';
import { render } from '@testing-library/react';
import ScatterChart from '../ScatterChart';
import Scatter from '../Scatter';
import Tooltip from '../Tooltip';

describe('ScatterChart Component', () => {
  const mockData = [
    { x: 10, y: 20 },
    { x: 30, y: 40 },
    { x: 50, y: 60 },
  ];

  it('renders without crashing', () => {
    const { container } = render(
      <ScatterChart width={600} height={500} data={mockData}>
        <Scatter data={mockData} xScale={(val) => val} yScale={(val) => val} />
      </ScatterChart>
    );
    expect(container).toBeInTheDocument();
  });

  it('renders with correct width and height', () => {
    const { container } = render(
      <ScatterChart width={600} height={500} data={mockData}>
        <Scatter data={mockData} xScale={(val) => val} yScale={(val) => val} />
      </ScatterChart>
    );
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '600');
    expect(svg).toHaveAttribute('height', '500');
  });

  it('renders the correct number of points in Scatter component', () => {
    const { container } = render(
      <ScatterChart width={500} height={400} data={mockData}>
        <Scatter data={mockData} xScale={(val) => val} yScale={(val) => val} hoveredPoint={null} />
      </ScatterChart>
    );
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBe(3);
  });


});
