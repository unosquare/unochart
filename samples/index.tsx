import React from 'react';
import ReactDOM from 'react-dom/client';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from '../src';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];





const App = () => (
  <div className="p-4">
    <h1 className="text-xl font-bold mb-4">BarChart Example</h1>
    <div className="mb-8">
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="2 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="blue" />
        <Bar dataKey="pv" fill="red" />
      </BarChart>

      <div>
        <h1 className="text-2xl font-bold">BarChart Stacked</h1>
        <BarChart width={730} height={250} data={data} barCategoryGap="10%" barGap={2}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" stackId="a" fill="#8884d8" />
          <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
          <Bar dataKey="uv" fill="#ffc658" />
        </BarChart>
      </div>


    </div>
   
  </div>
);

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}