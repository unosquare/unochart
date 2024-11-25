import { BarChart3, LineChart, PieChart, ScatterChart } from 'lucide-react';
import type React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const categories = [
        {
            name: 'Bar Charts',
            path: '/normal-bar',
            icon: BarChart3,
            description: 'Normal, Stacked, and Ranged',
        },
        {
            name: 'Pie Charts',
            path: '/pie-chart',
            icon: PieChart,
            description: 'Simple, Double Layer, and Custom',
        },
        {
            name: 'Line Charts',
            path: '/line-chart',
            icon: LineChart,
            description: 'Basic, Dashed, and with Reference Lines',
        },
        {
            name: 'Scatter Charts',
            path: '/scatter-chart',
            icon: ScatterChart,
            description: 'Interactive Scatter Plots',
        },
    ];

    return (
        <div className='min-h-[calc(100vh-64px)] bg-gradient-to-br from-indigo-100 to-blue-100'>
            <div className='max-w-6xl mx-auto px-4 py-12'>
                <div className='text-center mb-12'>
                    <h1 className='text-5xl font-extrabold text-gray-900 mb-3'>UnoChart</h1>
                    <p className='text-xl text-gray-600 font-medium'>React 19 Rechart Replica</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
                    {categories.map((category) => (
                        <Link
                            key={category.path}
                            to={category.path}
                            className='group bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1'
                        >
                            <div className='p-6'>
                                <div className='flex items-center gap-4 mb-3'>
                                    <div className='p-3 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 transition-colors'>
                                        <category.icon className='h-6 w-6 text-indigo-600' />
                                    </div>
                                    <h2 className='text-xl font-semibold text-gray-900'>{category.name}</h2>
                                </div>
                                <p className='text-gray-600'>{category.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
