import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; // Asegúrate de importar esto
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
        const { getByText } = render(<Tooltip tooltipData={mockTooltipData} />);
        mockTooltipData.values.forEach(item => {
            const valueElement = getByText(`${item.key}: ${item.value}`);
            expect(valueElement).toBeInTheDocument();
            expect(valueElement).toHaveStyle(`color: ${item.color}`);
        });
    });
});