import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component'
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import { Button } from 'react-bootstrap';
import 'jspdf-autotable';
import './gaji.css';
import { Modal } from 'react-bootstrap'; 
import { API_URL } from "../../../helpers/networt";
import axios from "axios";
import { useMediaQuery } from '@mui/material';

const Gaji = () => {

    const [initialData, setInitialData] = useState([]);

    const koneksi = async () => {
        const token = localStorage.getItem('token');
    
        try {
          const response = await axios.get(`${API_URL}/api/employee/wages`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Accept': 'application/json'
            }
          });
    
          const fetchedData = response.data.data.wages; // Pastikan ini sesuai dengan struktur data dari API Anda
    
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

    const handlePrint = (row) => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Data Gaji Bulanan', 105, 20, null, null, 'center');

        // Garis Pembatas
        doc.setLineWidth(0.5);
        doc.line(10, 25, 200, 25);

        // Tabel
        doc.autoTable({
            startY: 30,
            head: [['Keterangan', 'Nilai']],
            body: [
                ['Bulan', row.bulan],
                ['Tahun', row.tahun],
                ['Gaji Pokok', row.gajipokok],
                ['Uang Transport', row.uangtransport],
                ['Uang Lembur', row.uanglembur],
                ['Potongan Gaji', row.potogangaji],
                ['Total Gaji', row.totalgaji],
            ],
            theme: 'grid',
            styles: { fontSize: 12 },
            headStyles: { fillColor: [100, 100, 255] },
            margin: { top: 20 },
        });

        doc.save(`gaji_${row.id}.pdf`);
    };

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
            name: "Jumlah",
            selector: row => row.amount,
            sortable: true
        },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true
        },
        {
            name: "Uang Transport",
            selector: row => row.uangtransport,
            sortable: true
        },
        {
            name: "Uang Lembur",
            selector: row => row.uanglembur,
            sortable: true
        },
        {
            name: "Potongan Gaji",
            selector: row => row.potogangaji,
            sortable: true
        },
        {
            name: "Total Gaji",
            selector: row => row.totalgaji,
            sortable: true
        },
        {
            name: "Actions",
            cell: row => (
                <>           
                    <Button className='btn-printer' onClick={() => handlePrint(row)}>
                        <i className="bi bi-printer"></i>
                    </Button>
                </>
              
            )
        }
    ];

    const customStyle = {
        table: {
            style: {
                width: '100%', // Atur lebar tabel
                height: '140px', // Atur tinggi tabel jika diperlukan
            },
        },
        headRow: {
            style: {
                backgroundColor: '#f4f4f4', // Warna latar untuk header
            },
        },
        rows: {
            style: {
                fontSize: isMobile ? '10px' : '14px', // Ukuran font untuk baris
                padding: '10px 20px', // Padding untuk baris
                margin: '5px 0', // Margin untuk baris
            },
        },
        headCells: {
            style: {
                fontSize: isMobile? '10px' : '12px',// Ukuran font untuk head cells
                fontWeight: 'bold', // Tebal font untuk head cells
                padding: '12px 12px', // Padding untuk head cells
            },
        },
        cells: {
            style: {
                padding: '12px 12px', // Padding untuk cells
                margin: '5px 0', // Margin untuk cells
            },
        },
    };

    // const initialData = [
    //     { id: 1, bulan: '2', tahun: '2016', gajipokok: 'staf admin', uangtransport: 'mei', uanglembur: '2023', potogangaji: '1.000.000', totalgaji:'1.000.000' },
    //     { id: 2, bulan: '2', tahun: '2014', gajipokok: 'manager', uangtransport: 'juni', uanglembur: '2023', potogangaji: '1.800.000', totalgaji:'1.000.000' },
    //     { id: 3, bulan: '2', tahun: '2016', gajipokok: 'security', uangtransport: 'juli', uanglembur: '2023', potogangaji: '1.500.000', totalgaji:'1.000.000' },
    //     { id: 4, bulan: '2', tahun: '2017', gajipokok: 'staf IT', uangtransport: 'agustus', uanglembur: '2023', potogangaji: '2.200.000', totalgaji:'1.000.000' },
    //     { id: 5, bulan: '12', tahun: '2022', gajipokok: 'staf HR', uangtransport: 'september', uanglembur: '2023', potogangaji: '1.900.000', totalgaji:'1.000.000' },
    //     { id: 6, bulan: '2', tahun: '2020', gajipokok: 'sekretaris', uangtransport: 'oktober', uanglembur: '2023', potogangaji: '2.100.000', totalgaji:'1.000.000' },
    //     { id: 7, bulan: '1', tahun: '2021', gajipokok: 'staf keuangan', uangtransport: 'november', uanglembur: '2023', potogangaji: '2.000.000', totalgaji:'1.000.000' },
    //     { id: 8, bulan: '1', tahun: '2016', gajipokok: 'kasir', uangtransport: 'desember', uanglembur: '2023', potogangaji: '1.700.000', totalgaji:'1.000.000' },
    //     { id: 9, bulan: '1', tahun: '2012', gajipokok: 'driver', uangtransport: 'januari', uanglembur: '2024', potogangaji: '1.600.000', totalgaji:'1.000.000' },
    //     { id: 10, bulan: '1', tahun: '2014', gajipokok: 'staf marketing', uangtransport: 'februari', uanglembur: '2024', potogangaji: '2.300.000', totalgaji:'1.000.000' },
    //     { id: 11, bulan: '2', tahun: '2014', gajipokok: 'staf produksi', uangtransport: 'maret', uanglembur: '2024', potogangaji: '2.100.000', totalgaji:'1.000.000' },
    //     { id: 12, bulan: '1', tahun: '2014', gajipokok: 'staf admin', uangtransport: 'april', uanglembur: '2024', potogangaji: '1.800.000', totalgaji:'1.000.000' },
    //     { id: 13, bulan: '1', tahun: '2014', gajipokok: 'staf gudang', uangtransport: 'mei', uanglembur: '2024', potogangaji: '2.200.000', totalgaji:'1.000.000' },
    // ];

    const [show, setShow] = useState(false);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [data, setData] = useState(initialData); // State untuk menyimpan data yang ditampilkan

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleFilter = () => {
        const filteredData = initialData.filter(item => {
            if (month && year) {
                return item.bulan === month && item.tahun === year;
            } else if (month) {
                return item.bulan === month;
            } else if (year) {
                return item.tahun === year;
            }
            return true; // Jika tidak ada filter, tampilkan semua data
        });

        setData(filteredData); // Simpan hasil filter di state data
        handleClose(); // Tutup modal setelah filter diterapkan
    };

  return (
    <div className='table-container'>
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
  )
}

export default Gaji
