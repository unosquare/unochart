import React from 'react';
import { render } from '@testing-library/react';
import PolarAngleAxis from './index';

describe('PolarAngleAxis', () => {
    const mockData = [
        { subject: 'Math', A: 120, B: 110, fullMark: 150 },
        { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
        { subject: 'English', A: 86, B: 130, fullMark: 150 },
        { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
        { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
        { subject: 'History', A: 65, B: 85, fullMark: 150 },
    ];

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
