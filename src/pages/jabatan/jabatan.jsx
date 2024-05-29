import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import SearchBox from '../../components/search/SearchBox';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Excel from '../../image/Excel.png';
import Pdf from '../../image/PDF.png';


const Jabatan = () => {
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            sortable: true
        },
        {
            name: "Nama Jabatan",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "Deskripsi",
            selector: row => row.deskripsi,
            sortable: true
        },
        {
            name: "Gaji Pokok",
            selector: row => row.gajipokok,
            sortable: true
        },
        {
            name: "Tunjangan Tranportasi",
            selector: row => row.tunjangan,
            sortable: true
        },
        {
            name: "Uang Makan",
            selector: row => row.uangmakan,
            sortable: true
        },
        {
            name: "Actions",
            cell: row => (
                <>
                    <Button variant="warning" onClick={() => handleEdit(row)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(row.id)} className="ms-2">Delete</Button>
                </>
            )
        }
    ];

    const initialData = [
        { id: 1, name: 'John Doe', deskripsi: 'johndoe@example.com', gajipokok: 30, tunjangan: 30, uangmakan: 30 },
        { id: 2, name: 'Jane Smith', deskripsi: 'janesmith@example.com', gajipokok: 25, tunjangan: 30, uangmakan: 30 },
        { id: 3, name: 'Michael Johnson', deskripsi: 'michaeljohnson@example.com', gajipokok: 40, tunjangan: 30, uangmakan: 30 },
        { id: 4, name: 'Emily Brown', deskripsi: 'emilybrown@example.com', gajipokok: 35, tunjangan: 30, uangmakan: 30 },
        { id: 5, name: 'David Lee', deskripsi: 'davidlee@example.com', gajipokok: 28, tunjangan: 30, uangmakan: 30 },
        { id: 6, name: 'Sarah Wilson', deskripsi: 'sarahwilson@example.com', gajipokok: 32, tunjangan: 30, uangmakan: 30 },
        { id: 7, name: 'James Taylor', deskripsi: 'jamestaylor@example.com', gajipokok: 45, tunjangan: 30, uangmakan: 30 },
        { id: 8, name: 'Emma Martinez', deskripsi: 'emmartinez@example.com', gajipokok: 27, tunjangan: 30, uangmakan: 30 },
        { id: 9, name: 'Daniel Anderson', deskripsi: 'danielanderson@example.com', gajipokok: 38, tunjangan: 30, uangmakan: 30 },
        { id: 10, name: 'Olivia Garcia', deskripsi: 'oliviagarcia@example.com', gajipokok: 29, tunjangan: 30, uangmakan: 30 },
        { id: 11, name: 'Olivia Garcia2', deskripsi: 'oliviagarcia@example.com', gajipokok: 29, tunjangan: 30, uangmakan: 30 },
        { id: 12, name: 'Olivia Garcia2', deskripsi: 'oliviagarcia@example.com', gajipokok: 29, tunjangan: 30, uangmakan: 30 },
    ];

    const [records, setRecords] = useState(initialData);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editData, setEditData] = useState({ id: '', name: '', deskripsi: '', gajipokok: '', tunjangan: '', uangmakan: '' });
    const [newData, setNewData] = useState({ name: '', deskripsi: '', gajipokok: '', tunjangan: '', uangmakan: '' });

    const handleCloseEdit = () => setShowEditModal(false);
    const handleShowEdit = () => setShowEditModal(true);

    const handleCloseAdd = () => setShowAddModal(false);
    const handleShowAdd = () => setShowAddModal(true);

    const handleEdit = (row) => {
        setEditData(row);
        handleShowEdit();
    };

    const handleSaveEdit = () => {
        setRecords(records.map(record => (record.id === editData.id ? editData : record)));
        handleCloseEdit();
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
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['#', 'Nama Jabatan', 'Deskripsi', 'Gaji Pokok', 'Tunjangan Transportasi', 'Uang Makan']],
            body: records.map((row, index) => [index + 1, row.name, row.deskripsi, row.gajipokok, row.tunjangan, row.uangmakan])
        });
        doc.save('table.pdf');
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(records.map((row, index) => ({
            "#": index + 1,
            "Nama Jabatan": row.name,
            "Deskripsi": row.deskripsi,
            "Gaji Pokok": row.gajipokok,
            "Tunjangan Transportasi": row.tunjangan,
            "Uang Makan": row.uangmakan
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "table.xlsx");
    };

    function handleFilter(event) {
        const newData = initialData.filter(row => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setRecords(newData);
    }

    return (
        <div className='container'>
            <h1 className='mt-3 mb-3'><b>Jabatan</b></h1>
            <div className='d-flex justify-content-between mb-3'>
                <Button className='btn btn-success ms-2' onClick={handleShowAdd}>Tambah</Button>
                <div>
                <Button className='btn btn-success ms-2' onClick={handleShowAdd}>Filter</Button>
                    <Button className='btn btn-warning mx-3 text-white font-weight-bold' style={{  backgroundColor: '#D4FF78' }} onClick={exportToPDF}> <img src={Pdf} alt="" width={18} /> PDF</Button>
                    <Button className='btn btn-success' style={{  backgroundColor: '#78FFD6' }} onClick={exportToExcel}> <img src={Excel} alt="" width={18} /> Excel</Button>
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
                            <Form.Label>Deskripsi</Form.Label>
                            <Form.Control
                                type="text"
                                name="deskripsi"
                                value={editData.deskripsi}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gaji Pokok</Form.Label>
                            <Form.Control
                                type="number"
                                name="gajipokok"
                                value={editData.gajipokok}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tunjangan Transportasi</Form.Label>
                            <Form.Control
                                type="number"
                                name="tunjangan"
                                value={editData.tunjangan}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Uang Makan</Form.Label>
                            <Form.Control
                                type="number"
                                name="uangmakan"
                                value={editData.uangmakan}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Save Changes
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
                                name="name"
                                value={newData.name}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Deskripsi</Form.Label>
                            <Form.Control
                                type="text"
                                name="deskripsi"
                                value={newData.deskripsi}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gaji Pokok</Form.Label>
                            <Form.Control
                                type="number"
                                name="gajipokok"
                                value={newData.gajipokok}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tunjangan Transportasi</Form.Label>
                            <Form.Control
                                type="number"
                                name="tunjangan"
                                value={newData.tunjangan}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Uang Makan</Form.Label>
                            <Form.Control
                                type="number"
                                name="uangmakan"
                                value={newData.uangmakan}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveAdd}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Jabatan;