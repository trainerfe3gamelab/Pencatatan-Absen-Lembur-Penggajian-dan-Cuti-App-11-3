import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { API_URL } from '../../helpers/networt'; // Adjust the path as necessary

const PieChartComponent = () => {
  const [records, setRecords] = useState([]);

  // Function to fetch data from API
  const fetchData = async () => {
    const token = localStorage.getItem('token'); // Adjust according to your token storage method
    try {
      const response = await axios.get(`${API_URL}/api/admin/dashboards`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRecords(response.data.data); // Set fetched data into state
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // useEffect to fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Define RADIAN for label positioning
  const RADIAN = Math.PI / 180;

  // Data array for PieChart component
  const data = [
    { name: 'Group A', value: parseInt(records.employees) || 0 },
    { name: 'Group B', value: parseInt(records.admins) || 0 },
    { name: 'Group C', value: records.positions || 0 },
    { name: 'Group D', value: records.attendances || 0 },
  ];

  // COLORS array for different sections of PieChart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Function to render customized label inside PieChart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Rendering the PieChart component
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))
          }
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
