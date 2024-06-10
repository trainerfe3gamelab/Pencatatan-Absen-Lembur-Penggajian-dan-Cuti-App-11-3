import React from 'react';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Success from '../../Image/success.png';
import Failed from '../../Image/failed.png';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './lembur.css';

function Cuti  ()  {

    const [show, setShow] = useState(false);
    const [tanggal, setTanggal] = useState('');
    const [waktumasuk, setWaktuMasuk] = useState('');
    const [waktukeluar, setWaktuKeluar] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [initialData, setInitialData] = useState([
      { id: 1, tanggal: '2023-01-01', waktumasuk: '09:00', waktukeluar: '17:00' },
      { id: 2, tanggal: '2023-03-01', waktumasuk: '09:00', waktukeluar: '17:00' },
      { id: 3, tanggal: '2023-05-01', waktumasuk: '09:00', waktukeluar: '17:00' },
      { id: 4, tanggal: '2023-07-01', waktumasuk: '09:00', waktukeluar: '17:00' },
      { id: 5, tanggal: '2023-09-01', waktumasuk: '09:00', waktukeluar: '17:00' },
      { id: 6, tanggal: '2023-11-01', waktumasuk: '09:00', waktukeluar: '17:00' },
      { id: 7, tanggal: '2024-01-01', waktumasuk: '09:00', waktukeluar: '17:00' },
      { id: 8, tanggal: '2024-03-01', waktumasuk: '09:00', waktukeluar: '17:00' },
      { id: 9, tanggal: '2024-05-01', waktumasuk: '09:00', waktukeluar: '17:00' },
      { id: 10, tanggal: '2024-07-01', waktumasuk: '09:00', waktukeluar: '17:00' },
      { id: 11, tanggal: '2024-09-01', waktumasuk: '09:00', waktukeluar: '17:00' },
      { id: 12, tanggal: '2024-11-01', waktumasuk: '09:00', waktukeluar: '17:00' },
    ]);

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [date, setDate] = useState('');
    const [data, setData] = useState(initialData);
    const [showFilter, setShowFilter] = useState(false);


    const handleCloseFilter = () => setShowFilter(false);
    const handleShowFilter = () => setShowFilter(true);


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
        filtered = filtered.filter(item => {
          const itemDate = new Date(item.tanggal).toISOString().split('T')[0]; // Format to YYYY-MM-DD
          return itemDate === date;
        });
      }

      setInitialData(filtered); 
      setData(filtered);
      handleCloseFilter(); // Tutup modal setelah memfilter
    };

  
    const handleClose = () => {
      setShow(false);
      setSelectedRow(null);
      setTanggal('');
      setWaktuMasuk('');
      setWaktuKeluar('');
    };

    const handleShow = (row) => {
      if (row) {
        setSelectedRow(row);
        setTanggal(row.tanggal);
        setWaktuMasuk(row.waktumasuk);
        setWaktuKeluar(row.waktukeluar);
      } else {
        setSelectedRow(null);
        setTanggal('');
        setWaktuMasuk('');
        setWaktuKeluar('');
      }
      setShow(true);
    };

  const handleSubmit = () => {
    if (selectedRow) {
      // Edit existing data
      const updatedData = initialData.map(row => 
        row.id === selectedRow.id ? { ...row, tanggal, waktumasuk, waktukeluar } : row
      );
      setInitialData(updatedData);
      toast.success('Berhasil Terupdate!');
    } else {
      // Add new data
      const newData = {
        id: initialData.length + 1,
        tanggal: tanggal,
        waktumasuk: waktumasuk,
        waktukeluar: waktukeluar
      };
      const updatedData = [...initialData, newData];
      console.log('Adding new data:', newData);
      setInitialData(updatedData);
      toast.success('Berhasil Tersimpan!');
    }
    handleClose();
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
          name: "Waktu Masuk",
          selector: row => row.waktumasuk,
          sortable: true
        },
        {
          name: "Waktu Keluar",
          selector: row => row.waktukeluar,
          sortable: true
        },
        {
          name: "Actions",
          cell: row => (
            <>
              <button 
                onClick={() => handleShow(row)} 
                style={{ 
                  background: 'linear-gradient(135deg, #FFA726, #FF7043)', 
                  color: 'white', 
                  border: 'none', 
                  padding: '5px 10px', 
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Edit
              </button>
            </>
          )
        }
    ];
  
    const customStyle = {
        table: {
            style: {
                width: '100%',
                height: '140px',
            },
        },
        headRow: {
            style: {
                backgroundColor: '#f4f4f4',
            },
        },
        rows: {
            style: {
                fontSize: '14px',
                padding: '10px 20px',
                margin: '5px 0',
            },
        },
        headCells: {
            style: {
                fontSize: '12px',
                fontWeight: 'bold',
                padding: '12px 12px',
            },
        },
        cells: {
            style: {
                padding: '12px 12px',
                margin: '5px 0',
            },
        },
    };

    return (
      <div>
        <button className="btn btn-plus" onClick={() => handleShow(null)}>
          <i className="bi bi-plus-circle-fill" style={{color: '#004E5E'}}></i> Tambah
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedRow ? 'Edit Data' : 'Tambah Data Baru'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTanggal">
                <Form.Label>Tanggal</Form.Label>
                <Form.Control type="date" value={tanggal || ''} onChange={e => setTanggal(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formWaktuMasuk">
                <Form.Label>Waktu Masuk</Form.Label>
                <Form.Control type="time" value={waktumasuk || ''} onChange={e => setWaktuMasuk(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formWaktuKeluar">
                <Form.Label>Waktu Keluar</Form.Label>
                <Form.Control type="time" value={waktukeluar || ''} onChange={e => setWaktuKeluar(e.target.value)} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Tutup
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal>

        <button className="btn btn-filter" onClick={handleShowFilter}>
              <i className="bi bi-filter"></i>
              FILTER
            </button>

            <Modal show={showFilter} onHide={handleCloseFilter}>
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
                <Button variant="secondary" onClick={handleCloseFilter}>
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
  

export default Cuti;
