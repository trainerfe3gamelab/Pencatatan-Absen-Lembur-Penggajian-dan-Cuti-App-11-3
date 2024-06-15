import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Pastikan ini ada
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './absen.css';
import { API_URL } from "../../../helpers/networt";
import axios from "axios";
import { useMediaQuery } from '@mui/material';

const Absen = () => {

    const [initialData, setInitialData] = useState([]);

    const koneksi = async () => {
        const token = localStorage.getItem('token');
    
        try {
          const response = await axios.get(`${API_URL}/api/employee/attendances/`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Accept': 'application/json'
            }
          });
    
          const fetchedData = response.data.data.attendances; // Pastikan ini sesuai dengan struktur data dari API Anda
    
          if (Array.isArray(fetchedData)) {
            setInitialData(fetchedData); // Mengatur data yang akan digunakan untuk tabel
          } else {
            console.error("Data yang diambil bukan array:", fetchedData);
          }
    
          console.log(fetchedData);
        } catch (error) {
          console.error("Kesalahan saat mengambil data", error);
        }
      };
    
      useEffect(() => {
        koneksi();
      }, []);



    const isMobile = window.innerWidth <= 600;
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            sortable: true
        },
        {
            name: "Tanggal",
            selector: row => row.date,
            sortable: true
        },
        {
            name: "Presensi Masuk",
            selector: row => row.time_in,
            sortable: true
        },
        {
            name: "Presensi Keluar",
            selector: row => row.time_out,
            sortable: true
        },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true
        },
    ];

    const customStyle = {
        table: {
            style: {
                width: '100%', // Atur lebar tabel
                height: '140px', 
            },
        },
        tableWrapper: {
            style: {
                maxHeight: '470px'
            },
          },
        headRow: {
            style: {
                backgroundColor: '#f4f4f4', // Warna latar untuk header
            },
        },
        rows: {
            style: {
                fontSize: isMobile ? '10px' : '14px',
                padding: isMobile ? '8px 16px' : '10px 20px',
                margin: '5px 0',
              },
        },
        headCells: {
            style: {
                fontSize: isMobile ? '10px' : '12px',
                fontWeight: 'bold',
                padding: isMobile ? '6px 6px' : '12px 12px',
              },
        },
        cells: {
            style: {
                padding: isMobile ? '8px 8px' : '12px 12px',
                margin: '5px 0',
              },
        },
    };
    

    const [data, setData] = useState(initialData);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [date, setDate] = useState('');
    const [show, setShow] = useState(false);
    const [filteredData, setFilteredData] = useState(initialData);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleFilter = () => {
        const filtered = initialData.filter(row => {
          return date ? row.date === date : true;
        });
        setInitialData(filtered);
        handleClose();
      };

    return (
        <div>
            <button className="btn btn-filter" onClick={handleShow}>
                <i className="bi bi-filter" ></i>
                FILTER
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Filter Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label>
                            Date:
                            <input
                                type="date"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                            />
                        </label>    
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleFilter}>
                        Apply Filter
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='table-container'>
                <DataTable
                    columns={columns}
                    data={initialData}
                    fixedHeader
                    pagination
                    customStyles={customStyle}
                />
            </div>
        </div>
    );
}

export default Absen;
