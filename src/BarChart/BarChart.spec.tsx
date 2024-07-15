import React from 'react';
import { render } from '@testing-library/react';
import BarChart from './index';
import Bar from '../Bar';
import CartesianGrid from '../CartesianGrid';
import XAxis from '../XAxis';
import YAxis from '../YAxis';
import Tooltip from '../Tooltip';
import Legend from '../Legend';

describe('BarChart', () => {
    const data = [
        { name: 'A', uv: 30, pv: 40 },
        { name: 'B', uv: 80, pv: 90 },
        { name: 'C', uv: 45, pv: 60 },
        { name: 'D', uv: 60, pv: 70 },
    ];

    it('renders the correct number of bars', () => {
        const { container } = render(
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis data={data} dataKey="name" width={400} height={300} layout="horizontal" />
                <YAxis height={300} maxValue={100} layout="horizontal" />
                <Tooltip />
                <Legend />
                <Bar dataKey="uv" fill="#8884d8" />
                <Bar dataKey="pv" fill="#82ca9d" />
            </BarChart>
        );
        expect(container.querySelectorAll('rect').length).toBe(data.length * 2);
    });

    it('renders bars with correct height', () => {
        const { container } = render(
            <BarChart data={data} height={300}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis data={data} dataKey="name" width={400} height={300} layout="horizontal" />
                <YAxis height={300} maxValue={100} layout="horizontal" />
                <Tooltip />
                <Legend />
                <Bar dataKey="uv" fill="#8884d8" />
                <Bar dataKey="pv" fill="#82ca9d" />
            </BarChart>
        );
        const rects = container.querySelectorAll('rect');
        const maxValue = Math.max(...data.map(d => Math.max(d.uv, d.pv)));
        
        rects.forEach((rect, index) => {
            const entry = data[Math.floor(index / 2)];
            const value = index % 2 === 0 ? entry.uv : entry.pv;
            const expectedHeight = (value / maxValue) * 300; // Assuming height is 300
            expect(parseFloat(rect.getAttribute('height') || '')).toBeCloseTo(expectedHeight, 1);
        });
    });

    it('applies the correct bar color', () => {
        const { container } = render(
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis data={data} dataKey="name" width={400} height={300} layout="horizontal" />
                <YAxis height={300} maxValue={100} layout="horizontal" />
                <Tooltip />
                <Legend />
                <Bar dataKey="uv" fill="#8884d8" />
                <Bar dataKey="pv" fill="#82ca9d" />
            </BarChart>
        );
        const rects = container.querySelectorAll('rect');
        
        rects.forEach((rect, index) => {
            const expectedColor = index % 2 === 0 ? '#8884d8' : '#82ca9d';
            expect(rect.getAttribute('fill')).toBe(expectedColor);
        });
    });
});
