import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import SearchBox from '../../components/search/SearchBox';
import { Modal, Button, Form } from 'react-bootstrap';
import Success from '../../image/success.png';
import Failed from '../../image/failed.png';
import axios from 'axios';
import { API_URL } from '../../helpers/networt';

const PotonganGaji = () => {



    const koneksi = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${API_URL}/api/admin/salarycuts`, {
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
            name: "Jenis Potongan",
            selector: row => row.type,
            sortable: true
        },
        {
            name: "Jumlah Potongan",
            selector: row => row.cut,
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



    const [records, setRecords] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [editData, setEditData] = useState({ id: '', type: '', cut: '' });
    const [newData, setNewData] = useState({ type: '', cut: '' });

    const handleCloseEdit = () => setShowEditModal(false);
    const handleShowEdit = () => setShowEditModal(true);

    const handleCloseAdd = () => setShowAddModal(false);
    const handleShowAdd = () => setShowAddModal(true);

    const handleCloseSuccess = () => setShowSuccessModal(false);
    const handleShowSuccess = () => setShowSuccessModal(true);


    const handleShowFailed = () => setShowFailedModal(true);

    const handleEdit = (row) => {
        setEditData(row);
        handleShowEdit();
    };

    const handleSaveEdit = async () => {
        const token = localStorage.getItem('token');
        const userId = editData.id;
        const updatedUserData = {
            type: editData.type,
            cut: editData.cut,
        };

        try {
            const response = await axios.put(`${API_URL}/api/admin/salarycuts/${userId}`, updatedUserData, {
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
            handleShowFailed();
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');

        try {
            // Send a DELETE request to the API endpoint
            await axios.delete(`${API_URL}/api/admin/salarycuts/${id}`, {
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
                type: newData.type,
                cut: newData.cut,
            };
    
            const response = await axios.post(`${API_URL}/api/admin/salarycuts`, newDataToSend, {
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
            <h1 className='mt-3 mb-3'><b>Potongan Gaji</b></h1>
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
                    <Modal.Title>Edit Potongan Gaji</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Jenis Potongan</Form.Label>
                            <Form.Control
                                type="text"
                                name="type"
                                value={editData.type}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Jumlah Potongan</Form.Label>
                            <Form.Control
                                type="number"
                                name="cut"
                                value={editData.cut}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Simpan Perubahan
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* Failed Notification Modal */}
            <Modal show={showAddModal} onHide={handleCloseAdd}>
    <Modal.Header closeButton>
        <Modal.Title>Tambahkan Potongan Gaji</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Jenis Potongan</Form.Label>
                <Form.Control
                    type="text"
                    name="type"
                    value={newData.type}
                    onChange={handleNewInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Jumlah Potongan</Form.Label>
                <Form.Control
                    type="number"
                    name="cut"
                    value={newData.cut}
                    onChange={handleNewInputChange}
                />
            </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="primary" onClick={handleSaveAdd}>
            Tambahkan Potongan
        </Button>
    </Modal.Footer>
</Modal>



            {/* Success Notification Modal */}
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
        </div>
    );
};

export default PotonganGaji;
