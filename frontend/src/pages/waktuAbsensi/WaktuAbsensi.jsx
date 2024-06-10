import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import SearchBox from '../../components/search/SearchBox';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Success from '../../image/success.png';
import Failed from '../../image/failed.png';

const WaktuAbsensi = () => {
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
            selector: row => row.timeStart,
            sortable: true
        },
        {
            name: "Waktu Selesai",
            selector: row => row.timeFinis,
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

    const initialData = [
        { id: 1, name: 'hari raya', timeStart: '03:22', timeFinis: '04:23' },
    ];

    const [records, setRecords] = useState(initialData);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [editData, setEditData] = useState({ id: '', name: '', timeStart: '', timeFinis: '' });
    const [newData, setNewData] = useState({ name: '', timeStart: '', timeFinis: '' });

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

    const handleSaveEdit = () => {
        setRecords(records.map(record => (record.id === editData.id ? editData : record)));
        handleCloseEdit();
        handleShowSuccess();
    };

    const handleDelete = (id) => {
        setRecords(records.filter(record => record.id !== id));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleNewInputChange = (event) => {
        const { name, value } = event.target;
        setNewData({ ...newData, [name]: value });
    };

    const handleSaveAdd = () => {
        const newId = records.length ? records[records.length - 1].id + 1 : 1;
        const newRecord = { id: newId, ...newData };
        setRecords([...records, newRecord]);
        handleCloseAdd();
        handleShowSuccess();
    };

    const handleFailedAdd = () => {
        handleCloseAdd();
        handleShowFailed();
    };

    const handleFailedEdit = () => {
        handleCloseEdit();
        handleShowFailed();
    };


    function handleFilter(event) {
        const newData = initialData.filter(row => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setRecords(newData);
    }

    return (
        <div className='container'>
            <h1 className='mt-3 mb-3'><b>Waktu Absensi</b></h1>
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
                    <Modal.Title>Edit Jabatan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Jabatan</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={editData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Waktu Mulai</Form.Label>
                            <Form.Control
                                type="time"
                                name="timeStart"
                                value={editData.timeStart}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Waktu Selesai</Form.Label>
                            <Form.Control
                                type="time"
                                name="timeFinis"
                                value={editData.timeFinis}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleFailedEdit}>
                        Batal
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Simpan Perubahan
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add Modal */}
            <Modal show={showAddModal} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={newData.name}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Waktu Mulai</Form.Label>
                            <Form.Control
                                type="time"
                                name="timeStart"
                                value={newData.timeStart}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Waktu Selesai</Form.Label>
                            <Form.Control
                                type="time"
                                name="timeFinis"
                                value={newData.timeFinis}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleFailedAdd} >
                        Batal
                    </Button>
                    <Button variant="primary" onClick={handleSaveAdd}>
                        Tambahkan
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