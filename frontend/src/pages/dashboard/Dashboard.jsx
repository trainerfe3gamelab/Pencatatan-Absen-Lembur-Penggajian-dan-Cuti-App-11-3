import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Card from '../../components/card_dashboard/card';
import CardTitle from '../../components/card_title_dashboard/card_title';
import BarChart from '../../components/charts/BarChart';
import PieChart from '../../components/charts/PieChart';
import logoadmin from '../../image/admin.png';
import logopegawai from '../../image/pegawai.png';
import logojabatan from '../../image/jabatan.png';
import logokehadiran from '../../image/kehadiran.png';
import axios from 'axios';
import { API_URL } from '../../helpers/networt';

const Dashboard = () => {
  const [data, setData] = useState({
    employees: 0,
    admins: 0,
    positions: 0,
    attendances: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token'); // Adjust according to your token storage method
    try {
      const response = await axios.get(`${API_URL}/api/admin/dashboards`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <div className='container'>
      <h1 className='mt-3 mb-3'><b>Dashboard</b></h1>
      <div className='row mt-5 mb-5 h-100'>
        <div className='col-12 col-md-6  rounded-4  '>
          <div className='row p-5'>
            <div className='col-12 col-md-6'>
              <GridItem title="Bar Chart">
                <BarChart /> {/* Pass data if needed */}
              </GridItem>
            </div>
            <div className='col-12 col-md-6'>
              <GridItem title="Pie Chart">
                <PieChart /> {/* Pass data if needed */}
              </GridItem>
            </div>
          </div>
        </div>
        <div className='col-12 col-md-6'>
          <CardTitle />
        </div>
      </div>
      <div className="row mt-5">
        <Card imgSrc={logopegawai} countName="Pegawai" countNumber={data.employees} />
        <Card imgSrc={logoadmin} countName="Admin" countNumber={data.admins} />
        <Card imgSrc={logojabatan} countName="Jabatan" countNumber={data.positions} />
        <Card imgSrc={logokehadiran} countName="Kehadiran" countNumber={data.attendances} />
      </div>
    </div>
  );
};

function GridItem({ title, children }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-4  h-100">
      <h3 className="text-2xl font-semibold text-black mb-4 text-center">{title}</h3>
      {children}
    </div>
  );
}

export default Dashboard;
