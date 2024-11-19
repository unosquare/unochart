import React from 'react';
import { render } from '@testing-library/react';
import LabelList from '../LabelList';

describe('LabelList Component', () => {
  const mockData = [
    { x: 10, y: 20, value: 100 },
    { x: 30, y: 40, value: 200 },
    { x: 50, y: 60, value: 300 }
  ];

  const mockXScale = (value: number) => value * 2;
  const mockYScale = (value: number) => value * 2;

  it('renders without crashing', () => {
    const { container } = render(
      <LabelList 
        data={mockData} 
        xScale={mockXScale} 
        yScale={mockYScale} 
        dataKey="value" 
      />
    );
    expect(container).toBeInTheDocument();
  });

  it('renders correct number of labels', () => {
    const { container } = render(
      <LabelList 
        data={mockData} 
        xScale={mockXScale} 
        yScale={mockYScale} 
        dataKey="value" 
      />
    );
    const labels = container.querySelectorAll('text');
    expect(labels.length).toBe(3);
  });

  it('skips rendering labels for undefined or null values', () => {
    const incompleteData = [
      { x: 10, y: 20, value: 100 },
      { x: 30, y: 40, value: null },
      { x: 50, y: 60, value: undefined }
    ];

    const { container } = render(
      <LabelList 
        data={incompleteData} 
        xScale={mockXScale} 
        yScale={mockYScale} 
        dataKey="value" 
      />
    );
    const labels = container.querySelectorAll('text');
    expect(labels.length).toBe(1);
  });

  it('uses custom styling props', () => {
    const { container } = render(
      <LabelList 
        data={mockData} 
        xScale={mockXScale} 
        yScale={mockYScale} 
        dataKey="value"
        fill="#ff0000"
        fontSize={16}
        offsetX={10}
        offsetY={-5}
      />
    );
    const labels = container.querySelectorAll('text');
    
    labels.forEach(label => {
      expect(label).toHaveAttribute('fill', '#ff0000');
      expect(label).toHaveAttribute('font-size', '16');
    });
  });

  it('renders correct label values', () => {
    const { getByText } = render(
      <LabelList 
        data={mockData} 
        xScale={mockXScale} 
        yScale={mockYScale} 
        dataKey="value" 
      />
    );
    
    expect(getByText('100')).toBeInTheDocument();
    expect(getByText('200')).toBeInTheDocument();
    expect(getByText('300')).toBeInTheDocument();
  });
});