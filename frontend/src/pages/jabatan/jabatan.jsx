import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import SearchBox from '../../components/search/SearchBox';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Success from '../../image/success.png';
import Failed from '../../image/failed.png';
import axios from 'axios';
import { API_URL } from '../../helpers/networt';


const Jabatan = () => {


    const koneksi = async () => {
        const token = localStorage.getItem('token'); 
        try {
            const response = await axios.get(`${API_URL}/api/admin/positions`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setRecords(response.data.data);

        } catch (error) {
            console.error("Error fetching data", error);
        }
    };


    useEffect(() => {
        koneksi();
    }, []);


    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            sortable: true
        },
        {
            name: "Nama Jabatan",
            selector: row => row.position_name,
            sortable: true
        },
        {
            name: "Deskripsi",
            selector: row => row.description,
            sortable: true
        },
        {
            name: "Gaji Pokok",
            selector: row => row.base_salary,
            sortable: true
        },
        {
            name: "Tunjangan Tranportasi",
            selector: row => row.transport_allowance,
            sortable: true
        },
        {
            name: "Uang Makan",
            selector: row => row.meal_allowance,
            sortable: true
        },
        {
            name: "Actions",
            cell: row => (
                <>
                    <Button variant="success" onClick={() => handleEdit(row)} className="me-2 "><i className="bi bi-pencil-fill text-white"></i></Button>
                    <Button variant="danger" onClick={() => handleDelete(row.id)} ><i className="bi bi-trash3-fill"></i></Button>

                </>
            )
        }
    ];


    const [errorMessage, setErrorMessage] = useState("");
    const [records, setRecords] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [editData, setEditData] = useState({ id: '', position_name: '', description: '', base_salary: '', transport_allowance: '', meal_allowance: '' });
    const [newData, setNewData] = useState({ position_name: '', description: '', base_salary: '', transport_allowance: '', meal_allowance: '' });

    const handleCloseEdit = () => setShowEditModal(false);
    const handleShowEdit = () => setShowEditModal(true);

    const handleCloseAdd = () => setShowAddModal(false);
    const handleShowAdd = () => setShowAddModal(true);

    const handleCloseSuccess = () => setShowSuccessModal(false);
    const handleShowSuccess = () => setShowSuccessModal(true);

    const handleCloseFailed = () => setShowFailedModal(false);
    const handleShowFailed = () => setShowFailedModal(true);

    const handleEdit = (row) => {
        setEditData(row);
        handleShowEdit();
    };

    const handleSaveEdit = async () => {
        const token = localStorage.getItem('token');
        const userId = editData.id;
        const updatedUserData = {
            position_name: editData.position_name,
            description: editData.description,
            base_salary: editData.base_salary,
            transport_allowance: editData.transport_allowance,
            meal_allowance: editData.meal_allowance,
        };

        try {
            const response = await axios.put(`${API_URL}/api/admin/positions/${userId}`, updatedUserData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("User data updated successfully:", response.data);
            handleCloseEdit();
            koneksi();
            handleShowSuccess();
        } catch (error) {
            console.error("Error updating user data:", error);
            handleCloseAdd();
            setErrorMessage(error.response?.data?.message || "Terjadi kesalahan");
            handleShowFailed();
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');

        try {
            // Send a DELETE request to the API endpoint
            await axios.delete(`${API_URL}/api/admin/positions/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // Update the records state to remove the deleted record
            setRecords(records.filter(record => record.id !== id));
            console.log(`Data with ID ${id} deleted successfully.`);
        } catch (error) {
            console.error("Error deleting data:", error);
            setErrorMessage(error.response?.data?.message || "Terjadi kesalahan");
            handleShowFailed();
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
    
            const newDataToSend = {
                position_name: newData.position_name,
                description: newData.description,
                base_salary: newData.base_salary,
                transport_allowance: newData.transport_allowance,
                meal_allowance: newData.meal_allowance
            };
    
            const response = await axios.post(`${API_URL}/api/admin/positions`, newDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            console.log('Response:', response.data);
    
            handleCloseAdd();
            koneksi();
            handleShowSuccess();
        } catch (error) {
            console.error("Error adding position:", error);
            handleCloseAdd();
            setErrorMessage(error.response?.data?.message || "Terjadi kesalahan");
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

    return (
        <div className='container'>
            <h1 className='mt-3 mb-3'><b>Jabatan</b></h1>
            <div className='d-flex justify-content-between mb-3'>
                <Button variant="primary" className="text-white me-2 " style={{ borderRadius: '15px', height: '30px', backgroundColor: '#18C89E' }} onClick={handleShowAdd}>
                    <i className="bi bi-plus-circle-fill" aria-hidden="true"></i> Tambah
                </Button>

                <div>
                    <SearchBox onChange={handleFilter} />
                </div>
            </div>
            <div className='bg-white border rounded-4'>
                <DataTable
                    columns={columns}
                    data={records}
                    fixedHeader
                    pagination
                />
            </div>







            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>{"Edit Jabatan"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Jabatan</Form.Label>
                            <Form.Control
                                type="text"
                                name="position_name"
                                value={editData.position_name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Deskripsi</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={editData.description}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gaji Pokok</Form.Label>
                            <Form.Control
                                type="number"
                                name="base_salary"
                                value={editData.base_salary}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tunjangan Transportasi</Form.Label>
                            <Form.Control
                                type="number"
                                name="transport_allowance"
                                value={editData.transport_allowance}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Uang Makan</Form.Label>
                            <Form.Control
                                type="number"
                                name="meal_allowance"
                                value={editData.meal_allowance}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Simpan
                    </Button>
                </Modal.Footer>
            </Modal>










            {/* Add Modal */}
            <Modal show={showAddModal} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Jabatan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Jabatan</Form.Label>
                            <Form.Control
                                type="text"
                                name="position_name"
                                value={newData.position_name}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Deskripsi</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={newData.description}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gaji Pokok</Form.Label>
                            <Form.Control
                                type="number"
                                name="base_salary"
                                value={newData.base_salary}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tunjangan Transportasi</Form.Label>
                            <Form.Control
                                type="number"
                                name="transport_allowance"
                                value={newData.transport_allowance}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Uang Makan</Form.Label>
                            <Form.Control
                                type="number"
                                name="meal_allowance"
                                value={newData.meal_allowance}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSaveAdd}>
                        Tambahkan
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
                    <p>{errorMessage}</p>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: 'none' }}>
                    <Button variant="primary" onClick={handleCloseFailed}>
                        Tutup
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default Jabatan;