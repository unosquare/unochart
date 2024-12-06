import React from 'react';
import { render } from '@testing-library/react';
import PolarRadiusAxis from './index';

describe('PolarRadiusAxis', () => {
    it('renders without crashing', () => {
        const { container } = render(<PolarRadiusAxis angle={0} domain={[0, 150]} radius={100} />);
        expect(container).toBeInTheDocument();
    });

    it('renders the correct number of labels', () => {
        const { container } = render(<PolarRadiusAxis angle={0} domain={[0, 150]} radius={100} />);
        const labels = container.querySelectorAll('line');
        expect(labels.length).toBe(6);
    });
});
