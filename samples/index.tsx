import React from 'react';
import ReactDOM from 'react-dom/client';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from '../src';

const data1 = [
  { name: 'Page A', uv: 4000, pv: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398 },
  { name: 'Page C', uv: 2000, pv: 9700 },
  { name: 'Page D', uv: 2780, pv: 3908 },
  { name: 'Page E', uv: 1890, pv: 4800 },
  { name: 'Page F', uv: 2390, pv: 3800 },
  { name: 'Page G', uv: 3420, pv: 4300 }
];





const App = () => (
  <div className="p-4">
    <h1 className="text-xl font-bold mb-4">BarChart Example</h1>
    <div className="mb-8">
      <BarChart width={730} height={250} data={data1}>
        <CartesianGrid strokeDasharray="2 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="blue" />
        <Bar dataKey="pv" fill="red" />
      </BarChart>
    </div>
   
  </div>
);

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}