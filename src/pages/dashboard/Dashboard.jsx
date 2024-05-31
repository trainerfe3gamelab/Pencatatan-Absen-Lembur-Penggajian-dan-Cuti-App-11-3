import React from 'react';
import './Dashboard.css'
import Card from '../../components/card_dashboard/card';
import CardTitle from '../../components/card_title_dashboard/card_title';
import BarChart from '../../components/charts/BarChart';
import PieChart from '../../components/charts/PieChart';
import logoadmin from '../../image/admin.png';
import logopegawai from '../../image/pegawai.png';
import logojabatan from '../../image/jabatan.png';
import logokehadiran from '../../image/kehadiran.png';

const Dashboard = () => {
  return (
    <div className='container'>
      <h1 className='mt-3 mb-3'><b>Dashboard</b></h1>
      <div className='row mt-5 mb-5 h-100'>
        <div className='col-12 col-md-6  rounded-4  '>
          <div className='row p-5'>
            <div className='col-12 col-md-6  '>
              <GridItem title="Bar Chart">
                <BarChart />
              </GridItem>
            </div>
            <div className='col-12 col-md-6'>
              <GridItem title="Pie Chart">
                <PieChart />
              </GridItem>
            </div>
          </div>
        </div>
        <div className='col-12 col-md-6'>
          <CardTitle />
        </div>
      </div>
      <div className="row mt-5">
        <Card imgSrc={logopegawai} countName="Pegawai" countNumber="200" />
        <Card imgSrc={logoadmin} countName="Admin" countNumber="150" />
        <Card imgSrc={logojabatan} countName="Jabatan" countNumber="120" />
        <Card imgSrc={logokehadiran} countName="Kehadiran" countNumber="300" />
      </div>
    </div>
  );
}

function GridItem({ title, children }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-4  h-100">
      <h3 className="text-2xl font-semibold text-black mb-4 text-center">{title}</h3>
      {children}
    </div>
  );
}

export default Dashboard;
