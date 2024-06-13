import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../helpers/networt'; // Adjust the path as necessary
import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

const BarChartComponent = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const response = await axios.get(`${API_URL}/api/admin/dashboards`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('API Response:', response.data); // Log the entire response data
        
        const { data } = response.data;

        // Map API data to chartData structure
        const newData = {
          name: 'API Data',
          employees: parseInt(data.employees) || 0,
          admins: parseInt(data.admins) || 0,
          positions: parseInt(data.positions) || 0,
          attendances: parseInt(data.attendances) || 0,
        };

        console.log('New Data:', newData); // Log the transformed newData

        setChartData([newData]);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width={400} height={200}>
      <BarChart
        width={400}
        height={300}
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="employees" fill="#2563eb" />
        <Bar dataKey="admins" fill="#8b5cf6" />
        <Bar dataKey="positions" fill="#82ca9d" />
        <Bar dataKey="attendances" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
