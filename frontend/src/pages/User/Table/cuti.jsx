import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "../../../helpers/networt";
import axios from "axios";

const Cuti = () => {

  const koneksi = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`${API_URL}/api/employee/leaves`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      const fetchedData = response.data.data.leaves;

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

  const [show, setShow] = useState(false);
  const [mulaicuti, setMulaiCuti] = useState('');
  const [berakhircuti, setBerakhirCuti] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [pertimbangan, setPertimbangan] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [initialData, setInitialData] = useState([]);
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
        const itemMonth = new Date(item.mulaicuti).getMonth() + 1; // Months are 0-based
        return itemMonth === parseInt(month);
      });
    }
  
    if (year) {
      filtered = filtered.filter(item => {
        const itemYear = new Date(item.mulaicuti).getFullYear();
        return itemYear === parseInt(year);
      });
    }
  
    if (date) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.mulaicuti).toISOString().split('T')[0]; // Format to YYYY-MM-DD
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
    setMulaiCuti('');
    setBerakhirCuti('');
    setKeterangan('');
    setPertimbangan('');
  };

  const handleShow = (row) => {
    if (row) {
      setSelectedRow(row);
      setMulaiCuti(row.mulaicuti);
      setBerakhirCuti(row.berakhircuti);
      setKeterangan(row.keterangan);
      setPertimbangan(row.pertimbangan);
    } else {
      setSelectedRow(null);
      setMulaiCuti('');
      setBerakhirCuti('');
      setKeterangan('');
      setPertimbangan(''); // Ubah dari 'pending' ke string kosong untuk konsistensi
    }
    setShow(true);
  };
  

  const handleDelete = (id) => {
    const updatedData = initialData.filter(row => row.id !== id);
    setInitialData(updatedData);
    setData(updatedData); // Perbarui data juga
  };
  

  const handleSubmit = async () => {
    let updatedData;

    if (selectedRow) {
        // Edit existing data
        updatedData = initialData.map(row =>
            row.id === selectedRow.id ? { ...row, mulaicuti, berakhircuti, keterangan, pertimbangan } : row
        );
        setInitialData(updatedData);
        toast.success('Berhasil Diupdate!');
    } else {
        // Add new data
        const requestData = {
            user_id: "tes1",
            type: "sakit",
            reasoning: keterangan,
            start_date: mulaicuti,
            end_date: berakhircuti
        };

        console.log('Request data being sent to API:', requestData);

        try {
            const response = await fetch('http://localhost:9000/api/employee/leaves', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlczEiLCJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE3MTg0MzkzMjksImV4cCI6MTcxODUyNTcyOX0.ZH8s9xyYn-ccxT8_SfvG8x1EW4CwY8PUwHdxoNaaCIo'
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                const result = await response.json();
                updatedData = [...initialData, { ...requestData, id: result.id }];
                setInitialData(updatedData);
                toast.success('Berhasil Tersimpan!');
            } else {
                const errorResponse = await response.json();
                console.error('Failed to add new data:', errorResponse);
                toast.error(`Gagal menyimpan data! ${errorResponse.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Terjadi kesalahan saat menyimpan data!');
        }
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
            name: "Mulai Cuti",
            selector: row => row.start_date,
            sortable: true
        },
        {
            name: "Berakhir Cuti",
            selector: row => row.end_date,
            sortable: true
        },
        {
            name: "Keterangan",
            selector: row => row.reasoning,
            sortable: true
        },
        {
            name: "Pertimbangan",
            selector: row => row.status,
            sortable: true
        },
        {
            name: "Actions",
            cell: row => (
                <>
              <button 
                onClick={() => handleDelete(row.id)} 
                style={{ 
                  background: 'linear-gradient(135deg, #0CAD7F, #5AC9C3)', 
                  color: 'white', 
                  border: 'none', 
                  padding: '5px 6px', 
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '5px'
                }}
              >
                Hapus
              </button>
              <button 
                onClick={() => handleShow(row)} 
                style={{ 
                  background: 'linear-gradient(135deg, #FFA726, #FF7043)', 
                  color: 'white', 
                  border: 'none', 
                  padding: '5px 6px', 
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
              fontSize: isMobile ? '10px' : '14px',
                padding: '10px 20px', // Padding untuk baris
                margin: '5px 0', // Margin untuk baris
            },
        },
        headCells: {
            style: {
                fontSize: isMobile? '10px' : '12px', // Ukuran font untuk head cells
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

   

    return (
        <div>
            <button className="btn btn-plus" onClick={() => handleShow(null)}>
              <i className="bi bi-plus-circle-fill" style={{ color: '#004E5E' }}></i>
              Tambah
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedRow ? 'Edit Data' : 'Tambah Data Baru'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formWaktuMasuk">
                            <Form.Label>Waktu Masuk :</Form.Label>
                            <Form.Control
                                type="date"
                                value={mulaicuti || ''}
                                onChange={e => setMulaiCuti(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formWaktuKeluar">
                            <Form.Label>Waktu Keluar :</Form.Label>
                            <Form.Control
                                type="date"
                                value={berakhircuti || ''}
                                onChange={e => setBerakhirCuti(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formKeterangan">
                            <Form.Label>Keterangan :</Form.Label>
                            <Form.Control
                                type="input"
                                value={keterangan || ''}
                                onChange={e => setKeterangan(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPertimbangan">
                            <Form.Label>Pertimbangan :</Form.Label>
                            <Form.Control
                                type="input"
                                value={pertimbangan || ''}
                                onChange={e => setPertimbangan(e.target.value)}
                            />
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
                    data={initialData}
                    fixedHeader
                    pagination
                    customStyles={customStyle}
                />
            </div>
        </div>
    );
}

export default Cuti;
