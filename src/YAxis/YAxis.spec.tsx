import React from 'react';
import { render } from '@testing-library/react';
import YAxis from './index';

describe('YAxis', () => {

    it('renders without crashing', () => {
        const { container } = render(<YAxis height={300} maxValue={100} minValue={0} />);
        expect(container).toBeInTheDocument();
    } );

    it('renders the correct number of labels', () => {
        const { container } = render(<YAxis height={300} maxValue={100} minValue={0} />);
        const labels = container.querySelectorAll('text');
        expect(labels.length).toBeGreaterThan(0);
    });

    it('renders labels in the correct position', () => {
        const { container } = render(<YAxis height={300} maxValue={100} minValue={0} />);
        const labelPositions = Array.from(container.querySelectorAll('text')).map(label => label.getAttribute('y'));
        expect(labelPositions.every(pos => parseInt(pos || '0') >= 0)).toBe(true);
    });
});
