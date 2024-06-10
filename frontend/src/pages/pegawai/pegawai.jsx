import React, { useState } from 'react';
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


const Lembur = () => {
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            sortable: true
        },
        {
            name: "Nama Pegawai",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "Jenis Kelamin",
            selector: row => row.kelamin,
            sortable: true
        },
        {
            name: "Jabatan",
            selector: row => row.jabatan,
            sortable: true
        },
        {
            name: "Nomor Tlpn",
            selector: row => row.telepon,
            sortable: true
        },
        {
            name: "Alamat",
            selector: row => row.alamat,
            sortable: true
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true
        },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true
        },
        {
            name: "Role",
            selector: row => row.role,
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
        { id: 1, name: 'Alpa', kelamin: 'perempuan', jabatan: 'staf admin', telepon: '08214472642424', alamat: 'jalan sini had', email: 'mail@gmail.com', status:'pegawai', role:'admin' },
        { id: 2, name: 'Alpa', kelamin: 'laki-laki', jabatan: 'staf admin', telepon: '08214472642424', alamat: 'jalan sini had', email: 'mail@gmail.com', status:'pegawai', role:'admin' },
        { id: 3, name: 'Alpa', kelamin: 'laki-laki', jabatan: 'staf admin', telepon: '08214472642424', alamat: 'jalan sini had', email: 'mail@gmail.com', status:'pegawai', role:'admin' },
        { id: 4, name: 'Alpa', kelamin: 'laki-laki', jabatan: 'staf admin', telepon: '08214472642424', alamat: 'jalan sini had', email: 'mail@gmail.com', status:'pegawai', role:'admin' },
        { id: 5, name: 'Alpa', kelamin: 'laki-laki', jabatan: 'staf admin', telepon: '08214472642424', alamat: 'jalan sini had', email: 'mail@gmail.com', status:'pegawai', role:'admin' },
        { id: 6, name: 'Alpa', kelamin: 'laki-laki', jabatan: 'staf admin', telepon: '08214472642424', alamat: 'jalan sini had', email: 'mail@gmail.com', status:'pegawai', role:'admin' },
        { id: 7, name: 'Alpa', kelamin: 'laki-laki', jabatan: 'staf admin', telepon: '08214472642424', alamat: 'jalan sini had', email: 'mail@gmail.com', status:'pegawai', role:'admin' },
        { id: 8, name: 'Alpa', kelamin: 'laki-laki', jabatan: 'staf admin', telepon: '08214472642424', alamat: 'jalan sini had', email: 'mail@gmail.com', status:'pegawai', role:'admin' },
        { id: 9, name: 'Alpa', kelamin: 'laki-laki', jabatan: 'staf admin', telepon: '08214472642424', alamat: 'jalan sini had', email: 'mail@gmail.com', status:'pegawai', role:'admin' },
        { id: 10, name: 'Alpa', kelamin: 'laki-laki', jabatan: 'staf admin', telepon: '08214472642424', alamat: 'jalan sini had', email: 'mail@gmail.com', status:'pegawai', role:'admin' },
        { id: 11, name: 'Alpa', kelamin: 'laki-laki', jabatan: 'staf admin', telepon: '08214472642424', alamat: 'jalan sini had', email: 'mail@gmail.com', status:'pegawai', role:'admin' },
        { id: 12, name: 'Alpa', kelamin: 'laki-laki', jabatan: 'staf admin', telepon: '08214472642424', alamat: 'jalan sini had', email: 'mail@gmail.com', status:'pegawai', role:'admin' },
        { id: 13, name: 'Alpa', kelamin: 'laki-laki', jabatan: 'staf admin', telepon: '08214472642424', alamat: 'jalan sini had', email: 'mail@gmail.com', status:'pegawai', role:'admin' },
    ];
    

    const [records, setRecords] = useState(initialData);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [editData, setEditData] = useState({ id: '', name: '', kelamin: '', jabatan: '', telepon: '', alamat: '', email: '', status:'', role:'' });
    const [newData, setNewData] = useState({ name: '', kelamin: '', jabatan: '', telepon: '', alamat: '', email: '', status:'', role:''});
    const [filteredRecords, setFilteredRecords] = useState(null);
    const [filterCriteria, setFilterCriteria] = useState({  gender: '', position: '' });

    const handleFilterButton = () => {
        let filteredData = initialData;

        if (filterCriteria.date) {
            filteredData = filteredData.filter(record => record.tanggal === filterCriteria.date);
        }

        if (filterCriteria.gender && filterCriteria.gender !== 'semua') {
            filteredData = filteredData.filter(record => record.kelamin === filterCriteria.gender);
        }

        if (filterCriteria.position && filterCriteria.position !== 'semua') {
            filteredData = filteredData.filter(record => record.jabatan === filterCriteria.position);
        }

        setFilteredRecords(filteredData);
        setShowFilterModal(false);
    };

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

    const handleFilter = (event) => {
        const newData = initialData.filter(row => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setRecords(newData);
    };

    const handleFilterCriteriaChange = (event) => {
        const { name, value } = event.target;
        setFilterCriteria({ ...filterCriteria, [name]: value });
    };

    const getFilterCriteriaText = () => {
        const {  gender, position } = filterCriteria;
        const criteriaText = [];

        if (gender && gender !== 'semua') criteriaText.push(`Jenis Kelamin: ${gender}`);
        if (position && position !== 'semua') criteriaText.push(`Jabatan: ${position}`);

        return criteriaText.length ? criteriaText.join(', ') : 'Tidak ada filter yang diterapkan';
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['#', 'Nama Pegawai', 'Jenis Kelamin', 'Jabatan', 'Nomor Tlpn', 'Alamat', 'Status', 'Role']],
            body: (filteredRecords || records).map((row, index) => [index + 1, row.name, row.kelamin, row.jabatan, row.telepon, row.alamat, row.status, row.role])
        });
        doc.save('table.pdf');
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet((filteredRecords || records).map((row, index) => ({
            "#": index + 1,
            "Nama Pegawai": row.name,
            "Jenis Kelamin": row.kelamin,
            "Jabatan": row.jabatan,
            "Nomor Tlpn": row.telepon,
            "Status": row.status,
            "Role": row.role,
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "table.xlsx");
    };

    return (
        <div className='container'>
            <h1 className='mt-3 mb-3'><b>Data Pegawai</b></h1>
            <div className='d-flex justify-content-between mb-3'>
            <Button variant="primary" className="text-white me-2 " style={{ borderRadius: '15px', height: '30px', backgroundColor: '#18C89E' }} onClick={handleShowAdd}>
          <i className="bi bi-plus-circle-fill" aria-hidden="true"></i> Tambah
        </Button>
                <div>
                <Button variant="primary" className="text-white me-2 " style={{ borderRadius: '15px', height: '30px', backgroundColor: '#18C89E' }} onClick={handleShowFilter}>
                <i class="bi bi-funnel-fill" aria-hidden="true"></i> Filter
        </Button>
        <Button variant="danger"  className='btn btn-warning mx-3 text-white font-weight-bold rounded-5' onClick={exportToPDF}> <img src={Pdf} alt="" width={18} /> PDF</Button>
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
                    <Modal.Title>Edit Data Gaji</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNama">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={editData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formKelamin">
                            <Form.Label>Jenis Kelamin</Form.Label>
                            <Form.Control
                                as="select"
                                name="kelamin"
                                value={editData.kelamin}
                                onChange={handleInputChange}
                            >
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="laki-laki">Laki-laki</option>
                                <option value="perempuan">Perempuan</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formJabatan">
                            <Form.Label>Jabatan</Form.Label>
                            <Form.Control
                                type="text"
                                name="jabatan"
                                value={editData.jabatan}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTelepon">
                            <Form.Label>Nomor Telepon</Form.Label>
                            <Form.Control
                                type="number"
                                name="telepon"
                                value={editData.telepon}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAlamat">
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control
                                type="text"
                                name="alamat"
                                value={editData.alamat}
                                onChange={handleInputChange}
                            />

                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={editData.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>status</Form.Label>
                            <Form.Control
                                type="text"
                                name="status"
                                value={editData.status}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                name="role"
                                value={editData.role}
                                onChange={handleInputChange}
                            >
                                <option value="">Pilih role</option>
                                <option value="admin">admin</option>
                                <option value="user">user</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSaveEdit}>
                        Save Changes
                    </Button>
                    <Button variant="danger" onClick={handleFailedEdit}>
                        Failed
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
                                type="text"
                                name="name"
                                value={newData.name}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formKelamin">
                            <Form.Label>Jenis Kelamin</Form.Label>
                            <Form.Control
                                as="select"
                                name="kelamin"
                                value={newData.kelamin}
                                onChange={handleNewInputChange}
                            >
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="laki-laki">Laki-laki</option>
                                <option value="perempuan">Perempuan</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formJabatan">
                            <Form.Label>Jabatan</Form.Label>
                            <Form.Control
                                type="text"
                                name="jabatan"
                                value={newData.jabatan}
                                onChange={handleNewInputChange}
                            />
                            </Form.Group>
                        <Form.Group controlId="formTelepon">
                            <Form.Label>Nomor Telepon</Form.Label>
                            <Form.Control
                                type="number"
                                name="telepon"
                                value={newData.telepon}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAlamat">
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control
                                type="text"
                                name="alamat"
                                value={newData.alamat}
                                onChange={handleNewInputChange}
                            />

                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={newData.email}
                                onChange={handleNewInputChange}
                            />
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                // value={editData.email}
                                // onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>status</Form.Label>
                            <Form.Control
                                type="text"
                                name="status"
                                value={newData.status}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                name="role"
                                value={newData.role}
                                onChange={handleNewInputChange}
                            >
                                <option value="">Pilih role</option>
                                <option value="admin">admin</option>
                                <option value="user">user</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSaveAdd}>
                        Save
                    </Button>
                    <Button variant="danger" onClick={handleFailedAdd}>
                        Failed
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
            <Modal show={showFilterModal} onHide={handleCloseFilter}>
                <Modal.Header closeButton>
                    <Modal.Title>Filter Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formKelamin">
                            <Form.Label>Jenis Kelamin</Form.Label>
                            <Form.Control
                                as="select"
                                name="gender"
                                onChange={handleFilterCriteriaChange}
                            >
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="semua">semua</option>
                                <option value="laki-laki">Laki-laki</option>
                                <option value="perempuan">Perempuan</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formJabatan">
                            <Form.Label>Jabatan</Form.Label>
                            <Form.Control
                                as="select"
                                name="position"
                                onChange={handleFilterCriteriaChange}
                            >
                                <option value="">Pilih Jenis Jabatan</option>
                                <option value="semua">semua</option>
                                <option value="manager">manager</option>
                                <option value="security">security</option>
                                <option value="staf IT">staf IT</option>
                                <option value="staf HR">staf HR</option>
                                <option value="sekretaris">sekretaris</option>
                                <option value="staf keuangan">staf keuangan</option>
                                <option value="kasir">kasir</option>
                                <option value="driver">driver</option>
                                <option value="staf marketing">staf marketing</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: 'none' }}>
                    <Button variant="secondary" onClick={handleCloseFilter}>
                        Batal
                    </Button>
                    <Button variant="primary" onClick={handleFilterButton}>
                        Filter
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Lembur;
