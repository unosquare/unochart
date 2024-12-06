import React from 'react';
import { render } from '@testing-library/react';
import PolarAngleAxis from './index';
import { mockData } from '../constants';

describe('PolarAngleAxis', () => {
    it('renders without crashing', () => {
        const { container } = render(<PolarAngleAxis dataKey="subject" data={mockData} />);
        expect(container).toBeInTheDocument();
    });

    it('renders the correct number of labels', () => {
        const { container } = render(<PolarAngleAxis dataKey="subject" data={mockData} />);
        const labels = container.querySelectorAll('text');
        expect(labels.length).toBe(mockData.length);
    });

    it('applies the correct label text', () => {
        const { container } = render(<PolarAngleAxis dataKey="subject" data={mockData} />);
        const labels = container.querySelectorAll('text');
        expect(labels[0]).toHaveTextContent('Math');
    });
});
