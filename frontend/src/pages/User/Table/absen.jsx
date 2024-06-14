import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Pastikan ini ada
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './absen.css';
import { useMediaQuery } from '@mui/material';

const Absen = () => {
    const isMobile = window.innerWidth <= 600;
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            sortable: true
        },
        {
            name: "Tanggal",
            selector: row => row.tanggal,
            sortable: true
        },
        {
            name: "Presensi Masuk",
            selector: row => row.presensimasuk,
            sortable: true
        },
        {
            name: "Presensi Keluar",
            selector: row => row.presensikeluar,
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
    

    const initialData = [
        { id: 1, tanggal: '01/01/2023', presensimasuk: '01/02/2023', presensikeluar: 'staf admin' },
        { id: 2, tanggal: '02/03/2023', presensimasuk: '01/04/2023', presensikeluar: 'manager' },
        { id: 3, tanggal: '01/05/2023', presensimasuk: '01/06/2023', presensikeluar: 'security' },
        { id: 4, tanggal: '01/07/2023', presensimasuk: '01/08/2023', presensikeluar: 'staf IT' },
        { id: 5, tanggal: '01/09/2023', presensimasuk: '01/10/2023', presensikeluar: 'staf HR' },
        { id: 6, tanggal: '01/11/2023', presensimasuk: '01/12/2023', presensikeluar: 'sekretaris' },
        { id: 7, tanggal: '01/01/2024', presensimasuk: '01/02/2024', presensikeluar: 'staf keuangan' },
        { id: 8, tanggal: '01/03/2024', presensimasuk: '01/04/2024', presensikeluar: 'kasir' },
        { id: 9, tanggal: '01/05/2024', presensimasuk: '01/06/2024', presensikeluar: 'driver' },
        { id: 10, tanggal: '01/07/2024', presensimasuk: '01/08/2024', presensikeluar: 'staf marketing', },
        { id: 11, tanggal: '01/09/2024', presensimasuk: '01/10/2024', presensikeluar: 'staf produksi', },
        { id: 12, tanggal: '01/11/2024', presensimasuk: '01/12/2024', presensikeluar: 'staf gudang', },
    ];
    

    const [data, setData] = useState(initialData);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [date, setDate] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleFilter = () => {
        let filtered = initialData;

        if (month) {
            filtered = filtered.filter(item => {
                const itemMonth = new Date(item.tanggal).getMonth() + 1; // Months are 0-based
                return itemMonth === parseInt(month);
            });
        }

        if (year) {
            filtered = filtered.filter(item => {
                const itemYear = new Date(item.tanggal).getFullYear();
                return itemYear === parseInt(year);
            });
        }

        if (date) {
            filtered = filtered.filter(item => item.tanggal === date);
        }

        setData(filtered);
        handleClose(); // Tutup modal setelah memfilter
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
                            Bulan:
                            <input
                                type="number"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                placeholder="MM"
                                min="1"
                                max="12"
                            />
                        </label>
                        <label>
                            Tahun:
                            <input
                                type="number"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                placeholder="YYYY"
                            />
                        </label>
                        <label>
                            Tanggal:
                            <input
                                type="text"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                placeholder="DD/MM/YYYY"
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
                    data={data}
                    fixedHeader
                    pagination
                    customStyles={customStyle}
                />
            </div>
        </div>
    );
}

export default Absen;
