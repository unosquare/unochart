import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; // Asegúrate de importar esto
import Legend from './index';

describe('Legend', () => {
    const mockItems = [
        { color: '#8884d8', label: 'uv' },
        { color: '#82ca9d', label: 'pv' },
    ];

    it('renders without crashing', () => {
        const { container } = render(<Legend items={mockItems} />);
        expect(container).toBeInTheDocument();
    });

    it('renders the correct number of items', () => {
        const { getAllByTestId } = render(<Legend items={mockItems} />);
        const legendItems = getAllByTestId('legend-item');
        expect(legendItems.length).toBe(mockItems.length);
    });

    it('renders items with correct color and label', () => {
        const { getByText } = render(<Legend items={mockItems} />);
        mockItems.forEach(item => {
            const legendItem = getByText(item.label);
            expect(legendItem).toBeInTheDocument();
            const colorDiv = legendItem.previousSibling;
            expect(colorDiv).toHaveStyle(`background-color: ${item.color}`);
        });
    });
});