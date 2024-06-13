import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Success from '../../image/success.png';
import Failed from '../../image/failed.png';
import axios from 'axios';
import { API_URL } from '../../helpers/networt';

const WaktuAbsensi = () => {


    const koneksi = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${API_URL}/api/admin/attendance-times`, {
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
            name: "Nama",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "Waktu Mulai",
            selector: row => row.start_time,
            sortable: true
        },
        {
            name: "Waktu Selesai",
            selector: row => row.end_time,
            sortable: true
        },
        {
            name: "Actions",
            cell: row => (
                <>
                 <Button variant="success" onClick={() => handleEdit(row)} className="me-2 "><i className="bi bi-pencil-fill text-white"></i></Button>
                
                    
                </>
            )
        }
    ];



    const [records, setRecords] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [editData, setEditData] = useState({ id: '', name: '', start_time: '', end_time: '' });
   

    const handleCloseEdit = () => setShowEditModal(false);
    const handleShowEdit = () => setShowEditModal(true);

    

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
            start_time: editData.start_time,
            end_time: editData.end_time,
        };

        try {
            const response = await axios.put(`${API_URL}/api/admin/attendance-times/${userId}`, updatedUserData, {
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
            handleShowFailed();
        }
    };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditData({ ...editData, [name]: value });
    };

 



 

    return (
        <div className='container'>
            <h1 className='mt-3 mb-3'><b>Waktu Absensi</b></h1>
           
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
        <Modal.Title>Edit Waktu</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Waktu Mulai (HH:mm:ss)</Form.Label>
                <Form.Control
                    type="text"
                    name="start_time"
                    value={editData.start_time}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Waktu Selesai (HH:mm:ss)</Form.Label>
                <Form.Control
                    type="text"
                    name="end_time"
                    value={editData.end_time}
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

export default WaktuAbsensi;