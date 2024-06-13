import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import SearchBox from '../../components/search/SearchBox';
import { Modal, Button, Form } from 'react-bootstrap';
import Success from '../../image/success.png';
import Failed from '../../image/failed.png';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Excel from '../../image/Excel.png';
import Pdf from '../../image/PDF.png';
import axios from 'axios';
import { API_URL } from '../../helpers/networt';

const Lembur = () => {
    const [records, setRecords] = useState([]);
    const [positions, setPositions] = useState([]);
    const [users, setUsers] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [editData, setEditData] = useState({ id: '', user_id: '', date: '', time_in: '', time_out: ''});
    const [newData, setNewData] = useState({ user_id: '', date: '', time_in: '', time_out: ''});
    const [filteredRecords, setFilteredRecords] = useState(null);
    const [filterCriteria, setFilterCriteria] = useState({ date: '', position_name: '' });

    const koneksi = async () => {
        const token = localStorage.getItem('token');
        try {
            const [responseAbsensi, responseUser, responsePosition] = await Promise.all([
                axios.get(`${API_URL}/api/admin/overtimes`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get(`${API_URL}/api/admin/users`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get(`${API_URL}/api/admin/positions`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            const absensiData = responseAbsensi.data.data;
            const userData = responseUser.data.data;
            const positionsData = responsePosition.data.data;
            setPositions(positionsData);
            setUsers(userData);

            const records = absensiData.map(absensi => {
                const user = userData.find(user => user.id === absensi.user_id);
                const position = user ? positionsData.find(position => position.id === user.position_id) : null;
                return {
                    ...absensi,
                    name: user ? user.name : 'Unknown User',
                    gender: user ? user.gender : 'Unknown Gender',
                    position_name: position ? position.position_name : 'Unknown Position',
                    status: absensi.status,
                    time_in: absensi.time_in,
                    time_out: absensi.time_out
                };
            });

            setRecords(records);

        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        koneksi();
    }, []);

    const columns = [
        { name: "#", selector: (row, index) => index + 1, sortable: true },
        { name: "Nama Pegawai", selector: row => row.name, sortable: true },
        { name: "Jenis Kelamin", selector: row => row.gender, sortable: true },
        { name: "Jabatan", selector: row => row.position_name, sortable: true },
        { name: "Tanggal", selector: row => row.date, sortable: true },
        { name: "Waktu masuk", selector: row => row.time_in, sortable: true },
        { name: "Waktu keluar", selector: row => row.time_out, sortable: true },
        { name: "Actions", cell: row => (
            <>
                <Button variant="success" onClick={() => handleEdit(row)} className="me-2"><i className="bi bi-pencil-fill text-white"></i></Button>
                <Button variant="danger" onClick={() => handleDelete(row.id)}><i className="bi bi-trash3-fill"></i></Button>
            </>
        )}
    ];

    const handleCloseEdit = () => setShowEditModal(false);
    const handleShowEdit = () => setShowEditModal(true);

    const handleCloseAdd = () => setShowAddModal(false);
    const handleShowAdd = () => setShowAddModal(true);

    const handleCloseSuccess = () => setShowSuccessModal(false);
    const handleShowSuccess = () => setShowSuccessModal(true);

    const handleCloseFailed = () => setShowFailedModal(false);
    const handleShowFailed = () => setShowFailedModal(true);

    const handleCloseFilter = () => setShowFilterModal(false);
    const handleShowFilter = () => setShowFilterModal(true);

    const handleEdit = (row) => {
        setEditData(row);
        handleShowEdit();
    };

    const handleSaveEdit = async () => {
        const token = localStorage.getItem('token');
        const userId = editData.id;
        const updatedUserData = {
            user_id: editData.user_id, 
            date: editData.date,
            time_in: editData.time_in,
            time_out: editData.time_out,
        };

        try {
            await axios.put(`${API_URL}/api/admin/overtimes/${userId}`, updatedUserData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            handleCloseEdit();
            koneksi();
            handleShowSuccess();
        } catch (error) {
            console.error("Error updating user data:", error);
            handleCloseEdit();
            handleShowFailed();
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${API_URL}/api/admin/overtimes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setRecords(records.filter(record => record.id !== id));
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleNewInputChange = (event) => {
        const { name, value } = event.target;
        setNewData({ ...newData, [name]: value });
    };

    const handleSaveAdd = async () => {
        try {
            const token = localStorage.getItem('token'); 
            const requestData = {
                user_id: newData.user_id,
                date: newData.date,
                time_in: newData.time_in,
                time_out: newData.time_out
            };
            await axios.post(`${API_URL}/api/admin/overtimes`, requestData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            handleCloseAdd();
            koneksi();
            handleShowSuccess();
        } catch (error) {
            console.error("Error adding attendance data:", error);
            handleCloseAdd();
            handleShowFailed();
        }
    };

    const handleFilter = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        if (searchTerm === "") {
            koneksi(); 
        } else {
            const newData = records.filter(row => {
                return Object.values(row).some(value => 
                    typeof value === 'string' && value.toLowerCase().includes(searchTerm)
                );
            });
            setRecords(newData);
        }
    };

    const handleFilterCriteriaChange = (event) => {
        const { name, value } = event.target;
        setFilterCriteria({ ...filterCriteria, [name]: value });
    };

    const handleFilterButton = () => {
        let newFilteredRecords = records;

        if (filterCriteria.date) {
            newFilteredRecords = newFilteredRecords.filter(record => record.date === filterCriteria.date);
        }

        if (filterCriteria.position_name) { 
            newFilteredRecords = newFilteredRecords.filter(record => record.position_name === filterCriteria.position_name); 
        }

        setFilteredRecords(newFilteredRecords);
        setShowFilterModal(false);
    };

    const getFilterCriteriaText = () => {
        const { date, position_name } = filterCriteria; 
        const criteriaText = [];

        if (date) criteriaText.push(`Tanggal: ${date}`);
        if (position_name) criteriaText.push(`Jabatan: ${position_name}`);

        return criteriaText.length ? criteriaText.join(', ') : 'Tidak ada filter yang diterapkan';
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['#', 'Nama Pegawai', 'Jenis Kelamin', 'Jabatan', 'Tanggal', 'Waktu masuk', 'Waktu keluar']],
            body: (filteredRecords || records).map((row, index) => [index + 1, row.name, row.gender, row.position_name, row.date, row.time_in, row.time_out])
        });
        doc.save('table.pdf');
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet((filteredRecords || records).map((row, index) => ({
            "#": index + 1,
            "Nama Pegawai": row.name,
            "Jenis Kelamin": row.gender,
            "Jabatan": row.position_name,
            "Tanggal": row.date,
            "Waktu Masuk": row.time_in,
            "Waktu Keluar": row.time_out
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "table.xlsx");
    };

    return (
        <div className='container'>
            <h1 className='mt-3 mb-3'><b>Data Lembur</b></h1>
            <div className='d-flex justify-content-between mb-3'>
                <Button variant="primary" className="text-white me-2" style={{ borderRadius: '15px', height: '30px', backgroundColor: '#18C89E' }} onClick={handleShowAdd}>
                    <i className="bi bi-plus-circle-fill" aria-hidden="true"></i> Tambah
                </Button>
                <div>
                    <Button variant="primary" className="text-white me-2" style={{ borderRadius: '15px', height: '30px', backgroundColor: '#18C89E' }} onClick={handleShowFilter}>
                        <i className="bi bi-funnel-fill" aria-hidden="true"></i> Filter
                    </Button>
                    <Button variant="danger" className='btn btn-warning mx-3 text-white font-weight-bold rounded-5' onClick={exportToPDF}> <img src={Pdf} alt="" width={18} /> PDF</Button>
                    <Button variant="success" className='btn btn-success text-white font-weight-bold rounded-5' onClick={exportToExcel}> <img src={Excel} alt="" width={18} /> Excel</Button>
                    <SearchBox onChange={handleFilter} />
                </div>
            </div>
            {filteredRecords && (
                <div className='mb-2'>
                    <div className='col-6 text-success'>
                        <p>Filter berdasarkan {getFilterCriteriaText()}</p>
                    </div>
                </div>
            )}
            <div className='bg-white border rounded-4'>
                <DataTable
                    columns={columns}
                    data={filteredRecords || records}
                    fixedHeader
                    pagination
                />
            </div>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Absensi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNama">
                            <Form.Control
                                style={{ display: 'none' }}
                                type="text"
                                name="id"
                                value={editData.id}
                                onChange={handleInputChange}
                            />
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                as="select"
                                name="user_id"
                                value={editData.user_id}
                                onChange={handleInputChange}
                            >
                                <option value="">Pilih nama Pegawai</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formTanggal">
                            <Form.Label>Tanggal</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={editData.date}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTimein">
                            <Form.Label>Waktu Masuk</Form.Label>
                            <Form.Control
                                type="text"
                                name="time_in"
                                value={editData.time_in}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTimeout">
                            <Form.Label>Waktu Keluar</Form.Label>
                            <Form.Control
                                type="text"
                                name="time_out"
                                value={editData.time_out}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSaveEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add Modal */}
            <Modal show={showAddModal} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNama">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                as="select"
                                name="user_id"
                                value={newData.user_id}
                                onChange={handleNewInputChange}
                            >
                                <option value="">Pilih nama Pegawai</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formTanggal">
                            <Form.Label>Tanggal</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={newData.date}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTimein">
                            <Form.Label>Waktu Masuk</Form.Label>
                            <Form.Control
                                type="text"
                                name="time_in"
                                value={newData.time_in}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTimeout">
                            <Form.Label>Waktu Keluar</Form.Label>
                            <Form.Control
                                type="text"
                                name="time_out"
                                value={newData.time_out}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSaveAdd}>
                        Simpan
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={handleCloseSuccess}>
                <Modal.Body className="text-center mt-5">
                    <img src={Success} alt="success" width={70} />
                    <h5 className="mt-3">Berhasil</h5>
                    <p>Data berhasil disimpan</p>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: 'none' }}>
                    <Button variant="primary" onClick={handleCloseSuccess}>
                        Tutup
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Failed Modal */}
            <Modal show={showFailedModal} onHide={handleCloseFailed}>
                <Modal.Body className="text-center mt-5">
                    <img src={Failed} alt="Failed" width={70} />
                    <h5 className="mt-3">Gagal</h5>
                    <p>Data gagal disimpan</p>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: 'none' }}>
                    <Button variant="primary" onClick={handleCloseFailed}>
                        Tutup
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Filter Modal */}
            <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Filter Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTanggal">
                            <Form.Label>Tanggal</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={filterCriteria.date}
                                onChange={handleFilterCriteriaChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formJabatan">
                            <Form.Label>Jabatan</Form.Label>
                            <Form.Control
                                as="select"
                                name="position_name"
                                value={filterCriteria.position_name}
                                onChange={handleFilterCriteriaChange}
                            >
                                <option value="">Pilih jabatan</option>
                                {positions.map(position => (
                                    <option key={position.id} value={position.position_name}>
                                        {position.position_name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: 'none' }}>
                    <Button variant="primary" onClick={handleFilterButton}>
                        Filter
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Lembur;
