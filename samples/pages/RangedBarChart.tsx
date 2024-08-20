import React, { useState } from 'react';
import BarChartWrapper from '../utils/BarChartWrapper';
import { Bar } from '../../src';


const RangedBarChart = () => {
    const data = [
        { name: '05-01', temperature: [-6, 12] },
        { name: '05-02', temperature: [6, 12] },
        { name: '05-03', temperature: [3, 12] },
        { name: '05-04', temperature: [4, 12] },
        { name: '05-05', temperature: [12, 15] },
        { name: '05-06', temperature: [5, 15] },
        { name: '05-07', temperature: [3, 12] },
        { name: '05-08', temperature: [0, 8] },
        { name: '05-09', temperature: [-3, 5] },
    ];

    return (
        <div>
      <BarChartWrapper data={data}>
        <Bar dataKey="temperature" fill="#8884d8" />
      </BarChartWrapper>
    </div>
    );
};



export default RangedBarChart;
