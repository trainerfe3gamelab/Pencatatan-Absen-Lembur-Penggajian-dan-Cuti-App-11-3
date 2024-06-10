'use client';

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const productSales = [
  {
    name: 'Jan',
    product1: 400,
    product2: 240,
  },
  {
    name: 'Feb',
    product1: 300,
    product2: 221,
  },
  {
    name: 'Mar',
    product1: 200,
    product2: 229,
  },
  {
    name: 'Apr',
    product1: 278,
    product2: 200,
  },
  {
    name: 'May',
    product1: 189,
    product2: 218,
  },
  {
    name: 'Jun',
    product1: 239,
    product2: 250,
  },
];

const AreaChartComponent = () => {
  return (
    <ResponsiveContainer width={600} height={100}>
      <AreaChart
        width={600}
        height={100}
        data={productSales}
        margin={{ right: 30 }}
      >
        <YAxis />
        <XAxis dataKey="name" />
        <CartesianGrid strokeDasharray="5 5" />

        <Tooltip content={<CustomTooltip />} />
        <Legend />

        <Area
          type="monotone"
          dataKey="product1"
          stroke="#2563eb"
          fill="#3b82f6"
          stackId="1"
        />

        <Area
          type="monotone"
          dataKey="product2"
          stroke="#7c3aed"
          fill="#8b5cf6"
          stackId="1"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Product 1:
          <span className="ml-2">${payload[0].value}</span>
        </p>
        <p className="text-sm text-indigo-400">
          Product 2:
          <span className="ml-2">${payload[1].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default AreaChartComponent;
