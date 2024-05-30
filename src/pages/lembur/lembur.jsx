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
            name: "Tanggal",
            selector: row => row.tanggal,
            sortable: true
        },
        {
            name: "Waktu masuk",
            selector: row => row.timein,
            sortable: true
        },
        {
            name: "Waktu keluar",
            selector: row => row.timeout,
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
        { id: 1, name: 'Alpa', kelamin: 'laki-laki', jabatan: 'staf admin', tanggal: '02-03-2023', timein: '11:33', timeout: '17:22' },
        { id: 2, name: 'Beta', kelamin: 'perempuan', jabatan: 'manajer', tanggal: '05-03-2023', timein: '09:00', timeout: '17:00' },
        { id: 3, name: 'Gamma', kelamin: 'laki-laki', jabatan: 'staf IT', tanggal: '06-03-2023', timein: '08:45', timeout: '16:30' },
        { id: 4, name: 'Delta', kelamin: 'perempuan', jabatan: 'staf HR', tanggal: '07-03-2023', timein: '10:15', timeout: '18:00' },
        { id: 5, name: 'Epsilon', kelamin: 'laki-laki', jabatan: 'manajer', tanggal: '08-03-2023', timein: '09:30', timeout: '17:15' },
        { id: 6, name: 'Zeta', kelamin: 'perempuan', jabatan: 'staf keuangan', tanggal: '09-03-2023', timein: '08:00', timeout: '16:00' },
        { id: 7, name: 'Eta', kelamin: 'laki-laki', jabatan: 'direktur', tanggal: '10-03-2023', timein: '09:45', timeout: '18:30' },
        { id: 8, name: 'Theta', kelamin: 'perempuan', jabatan: 'staf pemasaran', tanggal: '11-03-2023', timein: '08:15', timeout: '17:00' },
        { id: 9, name: 'Iota', kelamin: 'laki-laki', jabatan: 'manajer', tanggal: '12-03-2023', timein: '09:00', timeout: '18:00' },
        { id: 10, name: 'Kappa', kelamin: 'perempuan', jabatan: 'staf admin', tanggal: '13-03-2023', timein: '07:45', timeout: '16:30' },
        { id: 11, name: 'Lambda', kelamin: 'laki-laki', jabatan: 'staf IT', tanggal: '14-03-2023', timein: '08:30', timeout: '17:15' },
        { id: 12, name: 'Mu', kelamin: 'perempuan', jabatan: 'staf HR', tanggal: '15-03-2023', timein: '09:15', timeout: '17:45' },
        { id: 13, name: 'Nu', kelamin: 'laki-laki', jabatan: 'staf keuangan', tanggal: '16-03-2023', timein: '08:00', timeout: '16:30' }
    ];
    

    const [records, setRecords] = useState(initialData);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [editData, setEditData] = useState({ id: '', name: '', kelamin: '', jabatan: '', tanggal: '', timein: '', timeout: '' });
    const [newData, setNewData] = useState({ name: '', kelamin: '', jabatan: '', tanggal: '', timein: '', timeout: '' });
    const [filteredRecords, setFilteredRecords] = useState(null);
    const [filterCriteria, setFilterCriteria] = useState({ date: '', gender: '', position: '' });

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
        const { date, gender, position } = filterCriteria;
        const criteriaText = [];

        if (date) criteriaText.push(`Tanggal: ${date}`);
        if (gender && gender !== 'semua') criteriaText.push(`Jenis Kelamin: ${gender}`);
        if (position && position !== 'semua') criteriaText.push(`Jabatan: ${position}`);

        return criteriaText.length ? criteriaText.join(', ') : 'Tidak ada filter yang diterapkan';
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['#', 'Nama Pegawai', 'Jenis Kelamin', 'Tanggal', 'Waktu masuk', 'Waktu keluar']],
            body: records.map((row, index) => [index + 1, row.name, row.kelamin, row.tanggal, row.timein, row.timeout])
        });
        doc.save('table.pdf');
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(records.map((row, index) => ({
            "#": index + 1,
            "Nama Pegawai": row.name,
            "Jenis Kelamin": row.kelamin,
            "Tanggal": row.tanggal,
            "Waktu Masuk": row.timein,
            "Waktu Keluar": row.timeout
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "table.xlsx");
    };

    return (
        <div className='container'>
            <h1 className='mt-3 mb-3'><b>Data Lembur</b></h1>
            <div className='d-flex justify-content-between mb-3'>
                <Button className='btn btn-success ms-2' onClick={handleShowAdd}>Tambah</Button>
                <div>
                    <Button className='btn btn-success ms-2' onClick={handleShowFilter}> Filter </Button>
                    <Button className='btn btn-warning mx-3 text-white font-weight-bold' style={{ backgroundColor: '#D4FF78' }} onClick={exportToPDF}> <img src={Pdf} alt="" width={18} /> PDF</Button>
                    <Button className='btn btn-success' style={{ backgroundColor: '#78FFD6' }} onClick={exportToExcel}> <img src={Excel} alt="" width={18} /> Excel</Button>
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
                        <Form.Group controlId="formTanggal">
                            <Form.Label>Tanggal</Form.Label>
                            <Form.Control
                                type="date"
                                name="Tanggal"
                                value={editData.tanggal}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formWaktuMasuk">
                            <Form.Label>Waktu Masuk</Form.Label>
                            <Form.Control
                                type="time"
                                name="timein"
                                value={editData.timein}
                                onChange={handleInputChange}
                            />

                        </Form.Group>
                        <Form.Group controlId="formWaktuKeluar">
                            <Form.Label>Waktu Masuk</Form.Label>
                            <Form.Control
                                type="time"
                                name="timeout"
                                value={editData.timeout}
                                onChange={handleInputChange}
                            />
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
                        <Form.Group controlId="formTanggal">
                            <Form.Label>Tanggal</Form.Label>
                            <Form.Control
                                type="date"
                                name="tanggal"
                                value={newData.tanggal}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formWaktuMasuk">
                            <Form.Label>Waktu Masuk</Form.Label>
                            <Form.Control
                                type="time"
                                name="timein"
                                value={newData.timein}
                                onChange={handleNewInputChange}
                            />

                        </Form.Group>
                        <Form.Group controlId="formWaktuKeluar">
                            <Form.Label>Wkatu Keluar</Form.Label>
                            <Form.Control
                                type="time"
                                name="timeout"
                                value={newData.timeout}
                                onChange={handleNewInputChange}
                            />
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
                        <Form.Group controlId="formTanggal">
                            <Form.Label>Tanggal</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                onChange={handleFilterCriteriaChange}
                            />
                        </Form.Group>
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
