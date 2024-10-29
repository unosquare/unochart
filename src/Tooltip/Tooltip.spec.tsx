import React from 'react';
import { render, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tooltip from './index';

describe('Tooltip', () => {
    const mockTooltipData = {
        name: 'Page A',
        values: [{ key: 'uv', value: 4000, color: '#8884d8' }],
    };

    it('renders without crashing', () => {
        const { container } = render(<Tooltip tooltipData={mockTooltipData} />);
        expect(container).toBeInTheDocument();
    });

    it('displays the correct name', () => {
        const { getByText } = render(<Tooltip tooltipData={mockTooltipData} />);
        expect(getByText(mockTooltipData.name)).toBeInTheDocument();
    });

    it('displays the correct values with the correct color', () => {
        const { container } = render(<Tooltip tooltipData={mockTooltipData} />);
        mockTooltipData.values.forEach(item => {
            // Buscar el elemento que contiene la key
            const keyElement = within(container).getByText(`${item.key}:`);
            expect(keyElement).toBeInTheDocument();
            expect(keyElement).toHaveStyle(`color: ${item.color}`);
            
            // Buscar el elemento que contiene el valor
            const valueElement = within(container).getByText(item.value.toLocaleString());
            expect(valueElement).toBeInTheDocument();
        });
    });
});