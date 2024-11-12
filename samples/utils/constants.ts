const createNavSection = (category: string, items: { name: string, path: string }[]) => ({ category, items });

export const NAV_SECTIONS = [
    createNavSection('Bar Charts', [
        { name: 'Normal BarChart', path: '/normal-bar' },
        { name: 'Stacked BarChart', path: '/stacked-bar' },
        { name: 'Ranged BarChart', path: '/ranged-bar' },
    ]),
    createNavSection('Pie Charts', [
        { name: 'Pie Chart', path: '/pie-chart' },
        { name: 'Double Layer Pie Chart', path: '/double-layer-pie' },
        { name: 'Straight Angle Pie Chart', path: '/straight-angle-pie' },
        { name: 'Pie Chart with Padding Angle', path: '/pie-chart-with-padding-angle' },
        { name: 'Pie Chart with Customized Label', path: '/pie-chart-with-customized-label' },
        { name: 'Custom Active Shape Pie Chart', path: '/custom-active-shape-pie' },
    ]),
    createNavSection('Line Charts', [
        { name: 'Line Chart', path: '/line-chart' },
        { name: 'Dashed Line Chart', path: '/dashed-line-chart' },
        { name: 'Reference Line Chart', path: '/reference-line-chart' },
        { name: 'Connect Nulls Chart', path: '/no-nulls' },
        { name: 'Line Chart with Labels', path: '/line-chart-with-labels' },
    ]),
    createNavSection('Scatter Charts', [
        { name: 'Scatter Chart', path: '/scatter-chart' },
        { name: 'Scatter Chart with Lines', path: '/scatter-chart-with-lines' },
    ]),
];


export const SCATTER_DATA = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ];
  
  export const LINE_DATA_WITH_NULLS = [
    { name: 'Page A', uv: 4000 },
    { name: 'Page B', uv: 3000 },
    { name: 'Page C', uv: 2000 },
    { name: 'Page D' },
    { name: 'Page E', uv: 1890 },
    { name: 'Page F', uv: 2390 },
    { name: 'Page G', uv: 3490 },
  ];
  
  export const LINE_DATA = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];
  
  export const LINE_CONFIG = [
    {
      id: 'uv',
      type: 'monotone',
      dataKey: 'uv',
      stroke: '#8884d8',
      strokeDasharray: '3 3',
      connectNulls: false,
      label: true
    },
    {
      id: 'pv',
      type: 'monotone',
      dataKey: 'pv',
      stroke: '#82ca9d',
      strokeDasharray: '3 3',
      connectNulls: false,
      label: true
    },
    {
      id: 'amt',
      type: 'monotone',
      dataKey: 'amt',
      stroke: '#ffc658',
      strokeDasharray: '3 3',
      connectNulls: false,
      label: true
    }
  ];
  
  export const BAR_DATA = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];