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


const Cuti = () => {
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
            name: "Jenis Cuti",
            selector: row => row.jeniscuti,
            sortable: true
        },
        {
            name: "Keterangan",
            selector: row => row.keterangan,
            sortable: true,
        },
        {
            name: "Mulai Tanggal",
            selector: row => row.starttanggal,
            sortable: true
        },
        {
            name: "Selesai Tanggal",
            selector: row => row.finistanggal,
            sortable: true
        },
        {
            name: "Pertimbangan",
            selector: row => row.pertimbangan,
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
        { id: 1, name: 'Alpa', kelamin: 'laki-laki', jabatan: 'staf admin', jeniscuti: 'cuti tahunan', starttanggal: '11-05-2023', finistanggal: '21-07-2024', pertimbangan: 'Disetujui', keterangan: 'Liburan ke Bali' },
        { id: 2, name: 'Beta', kelamin: 'perempuan', jabatan: 'manajer', jeniscuti: 'cuti sakit', starttanggal: '05-03-2023', finistanggal: '15-03-2023', pertimbangan: 'Disetujui', keterangan: 'Pemulihan setelah operasi' },
        { id: 3, name: 'Gamma', kelamin: 'laki-laki', jabatan: 'staf IT', jeniscuti: 'cuti melahirkan', starttanggal: '01-06-2023', finistanggal: '01-09-2023', pertimbangan: 'Mengajukan', keterangan: 'Menunggu persetujuan' },
        { id: 4, name: 'Delta', kelamin: 'perempuan', jabatan: 'staf HR', jeniscuti: 'cuti tahunan', starttanggal: '07-07-2023', finistanggal: '21-07-2023', pertimbangan: 'Disetujui', keterangan: 'Liburan keluarga' },
        { id: 5, name: 'Epsilon', kelamin: 'laki-laki', jabatan: 'manajer', jeniscuti: 'cuti besar', starttanggal: '08-08-2023', finistanggal: '08-08-2024', pertimbangan: 'Tidak Disetujui', keterangan: 'Alasan tidak mencukupi' },
        { id: 6, name: 'Zeta', kelamin: 'perempuan', jabatan: 'staf keuangan', jeniscuti: 'cuti duka', starttanggal: '09-09-2023', pertimbangan: 'Disetujui', keterangan: 'Meninggalnya orang tua' },
        { id: 7, name: 'Eta', kelamin: 'laki-laki', jabatan: 'direktur', jeniscuti: 'cuti pendidikan', starttanggal: '10-10-2023', finistanggal: '10-12-2023', pertimbangan: 'Mengajukan', keterangan: 'Kursus profesional' },
        { id: 8, name: 'Theta', kelamin: 'perempuan', jabatan: 'staf pemasaran', jeniscuti: 'cuti tanpa gaji', starttanggal: '11-11-2023', finistanggal: '11-01-2024', pertimbangan: 'Disetujui', keterangan: 'Perjalanan pribadi' },
        { id: 9, name: 'Iota', kelamin: 'laki-laki', jabatan: 'manajer', jeniscuti: 'cuti tahunan', starttanggal: '12-12-2023', finistanggal: '26-12-2023', pertimbangan: 'Mengajukan', keterangan: 'Liburan akhir tahun' },
        { id: 10, name: 'Kappa', kelamin: 'perempuan', jabatan: 'staf admin', jeniscuti: 'cuti pernikahan', starttanggal: '13-01-2024', finistanggal: '20-01-2024', pertimbangan: 'Disetujui', keterangan: 'Pernikahan' },
        { id: 11, name: 'Lambda', kelamin: 'laki-laki', jabatan: 'staf IT', jeniscuti: 'cuti ayah', starttanggal: '14-02-2024', finistanggal: '21-02-2024', pertimbangan: 'Tidak Disetujui', keterangan: 'Alasan administrasi' },
        { id: 12, name: 'Mu', kelamin: 'perempuan', jabatan: 'staf HR', jeniscuti: 'cuti tahunan', starttanggal: '15-03-2024', finistanggal: '29-03-2024', pertimbangan: 'Mengajukan', keterangan: 'Liburan musim semi' },
        { id: 13, name: 'Nu', kelamin: 'laki-laki', jabatan: 'staf keuangan', jeniscuti: 'cuti ibadah', starttanggal: '16-04-2024', finistanggal: '16-05-2024', pertimbangan: 'Disetujui', keterangan: 'Ibadah umroh' }
    ];

    const [records, setRecords] = useState(initialData);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [editData, setEditData] = useState({ id: '', name: '', kelamin: '', jabatan: '', jeniscuti: '', keterangan: '', starttanggal: '', finistanggal:'', pertimbangan:'' });
    const [newData, setNewData] = useState({ name: '', kelamin: '', jabatan: '',  jeniscuti: '', keterangan: '', starttanggal: '', finistanggal:'', pertimbangan:'' });
    const [filteredRecords, setFilteredRecords] = useState(null);
    const [filterCriteria, setFilterCriteria] = useState({ gender: '', position: '', jeniscuti:'', pertimbangan:'' });

    const handleFilterButton = () => {
        let filteredData = initialData;


        if (filterCriteria.gender && filterCriteria.gender !== 'semua') {
            filteredData = filteredData.filter(record => record.kelamin === filterCriteria.gender);
        }

        if (filterCriteria.position && filterCriteria.position !== 'semua') {
            filteredData = filteredData.filter(record => record.jabatan === filterCriteria.position);
        }
        if (filterCriteria.jeniscuti && filterCriteria.jeniscuti !== 'semua') {
            filteredData = filteredData.filter(record => record.jeniscuti === filterCriteria.jeniscuti);
        }
        if (filterCriteria.pertimbangan && filterCriteria.pertimbangan !== 'semua') {
            filteredData = filteredData.filter(record => record.pertimbangan === filterCriteria.pertimbangan);
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
        const { gender, position, jeniscuti, pertimbangan } = filterCriteria;
        const criteriaText = [];

        if (gender && gender !== 'semua') criteriaText.push(`Jenis Kelamin: ${gender}`);
        if (position && position !== 'semua') criteriaText.push(`Jabatan: ${position}`);
        if (jeniscuti && jeniscuti !== 'semua') criteriaText.push(`Jenis Cuti: ${jeniscuti}`);
        if (pertimbangan && pertimbangan !== 'semua') criteriaText.push(`Pertimbangan: ${pertimbangan}`);

        return criteriaText.length ? criteriaText.join(', ') : 'Tidak ada filter yang diterapkan';
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['#', 'Nama', 'Jenis Kelamin', 'Jabatan', 'Jenis Cuti', 'Mulai Tanggal', 'Selesai Tanggal', 'Pertimbangan']],
            body: records.map((row, index) => [index + 1, row.name, row.kelamin, row.jabatan, row.jeniscuti, row.starttanggal, row.finistanggal, row.pertimbangan])
        });
        doc.save('table.pdf');
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(records.map((row, index) => ({
            "#": index + 1,
            "Nama": row.name,
            "Jenis Kelamin": row.kelamin,
            "Jabatan": row.jabatan,
            "Jenis Cuti": row.jeniscuti,
            "Mulai Tanggal": row.starttanggal,
            "Selesai Tanggal": row.finistanggal,
            "Pertimbangan": row.pertimbangan
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "table.xlsx");
    };

    return (
        <div className='container'>
            <h1 className='mt-3 mb-3'><b>Data Cuti</b></h1>
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
            <div className='bg-white border rounded-4 mb-5'>
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
                    <Modal.Title>Edit Data Cuti</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNamaEdit">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={editData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formKelaminEdit">
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
                        <Form.Group controlId="formJabatanEdit">
                            <Form.Label>Jabatan</Form.Label>
                            <Form.Control
                                type="text"
                                name="jabatan"
                                value={editData.jabatan}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formJenisCutiEdit">
                            <Form.Label>Jenis Cuti</Form.Label>
                            <Form.Control
                                as="select"
                                name="jeniscuti"
                                value={editData.jeniscuti}
                                onChange={handleInputChange}
                            >
                                <option value="">Pilih Jenis Cuti</option>
                                <option value="cuti tahunan">Cuti Tahunan</option>
                                <option value="cuti sakit">Cuti Sakit</option>
                                <option value="cuti melahirkan">Cuti Melahirkan</option>
                                <option value="cuti besar">Cuti Besar</option>
                                <option value="cuti duka">Cuti Duka</option>
                                <option value="cuti pendidikan">Cuti Pendidikan</option>
                                <option value="cuti tanpa gaji">Cuti Tanpa Gaji</option>
                                <option value="cuti pernikahan">Cuti Pernikahan</option>
                                <option value="cuti ayah">Cuti Ayah</option>
                                <option value="cuti ibadah">Cuti Ibadah</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formKeteranganEdit">
                            <Form.Label>Keterangan</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="keterangan"
                                value={editData.keterangan}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formMulaiTanggalEdit">
                            <Form.Label>Mulai Tanggal</Form.Label>
                            <Form.Control
                                type="date"
                                name="starttanggal"
                                value={editData.starttanggal}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSelesaiTanggalEdit">
                            <Form.Label>Selesai Tanggal</Form.Label>
                            <Form.Control
                                type="date"
                                name="finistanggal"
                                value={editData.finistanggal}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPertimbanganEdit">
                            <Form.Label>Pertimbangan</Form.Label>
                            <Form.Control
                                as="select"
                                name="pertimbangan"
                                value={editData.pertimbangan}
                                onChange={handleInputChange}
                            >
                                <option value="">Pilih</option>
                                <option value="Disetujui">Disetujui</option>
                                <option value="Tidak Disetujui">Tidak Disetujui</option>
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
                        <Form.Group controlId="formNamaAdd">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={newData.name}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formKelaminAdd">
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
                        <Form.Group controlId="formJabatanAdd">
                            <Form.Label>Jabatan</Form.Label>
                            <Form.Control
                                type="text"
                                name="jabatan"
                                value={newData.jabatan}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formJenisCutiAdd">
                            <Form.Label>Jenis Cuti</Form.Label>
                            <Form.Control
                                as="select"
                                name="jeniscuti"
                                value={newData.jeniscuti}
                                onChange={handleNewInputChange}
                            >
                                <option value="">Pilih Jenis Cuti</option>
                                <option value="cuti tahunan">Cuti Tahunan</option>
                                <option value="cuti sakit">Cuti Sakit</option>
                                <option value="cuti melahirkan">Cuti Melahirkan</option>
                                <option value="cuti besar">Cuti Besar</option>
                                <option value="cuti duka">Cuti Duka</option>
                                <option value="cuti pendidikan">Cuti Pendidikan</option>
                                <option value="cuti tanpa gaji">Cuti Tanpa Gaji</option>
                                <option value="cuti pernikahan">Cuti Pernikahan</option>
                                <option value="cuti ayah">Cuti Ayah</option>
                                <option value="cuti ibadah">Cuti Ibadah</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formKeteranganAdd">
                            <Form.Label>Keterangan</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="keterangan"
                                value={newData.keterangan}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formMulaiTanggalAdd">
                            <Form.Label>Mulai Tanggal</Form.Label>
                            <Form.Control
                                type="date"
                                name="starttanggal"
                                value={newData.starttanggal}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSelesaiTanggalAdd">
                            <Form.Label>Selesai Tanggal</Form.Label>
                            <Form.Control
                                type="date"
                                name="finistanggal"
                                value={newData.finistanggal}
                                onChange={handleNewInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPertimbanganAdd">
                            <Form.Label>Pertimbangan</Form.Label>
                            <Form.Control
                                as="select"
                                name="pertimbangan"
                                value={newData.pertimbangan}
                                onChange={handleNewInputChange}
                            >
                                <option value="">Pilih</option>
                                <option value="Disetujui">Disetujui</option>
                                <option value="Tidak Disetujui">Tidak Disetujui</option>
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
                        <Form.Group controlId="formKelaminFilter">
                            <Form.Label>Jenis Kelamin</Form.Label>
                            <Form.Control
                                as="select"
                                name="gender"
                                onChange={handleFilterCriteriaChange}
                            >
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="semua">Semua</option>
                                <option value="laki-laki">Laki-laki</option>
                                <option value="perempuan">Perempuan</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formJabatanFilter">
                            <Form.Label>Jabatan</Form.Label>
                            <Form.Control
                                as="select"
                                name="position"
                                onChange={handleFilterCriteriaChange}
                            >
                                <option value="">Pilih Jenis Jabatan</option>
                                <option value="semua">Semua</option>
                                <option value="staf admin">Staf Admin</option>
                                <option value="manajer">Manajer</option>
                                <option value="staf IT">Staf IT</option>
                                <option value="staf HR">Staf HR</option>
                                <option value="direktur">Direktur</option>
                                <option value="staf pemasaran">Staf Pemasaran</option>
                                <option value="staf keuangan">Staf Keuangan</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formJenisCutiEdit">
                            <Form.Label>Jenis Cuti</Form.Label>
                            <Form.Control
                                as="select"
                                name="jeniscuti"
                                onChange={handleFilterCriteriaChange}
                            >
                                <option value="">Pilih Jenis Cuti</option>
                                <option value="cuti tahunan">Cuti Tahunan</option>
                                <option value="cuti sakit">Cuti Sakit</option>
                                <option value="cuti melahirkan">Cuti Melahirkan</option>
                                <option value="cuti besar">Cuti Besar</option>
                                <option value="cuti duka">Cuti Duka</option>
                                <option value="cuti pendidikan">Cuti Pendidikan</option>
                                <option value="cuti tanpa gaji">Cuti Tanpa Gaji</option>
                                <option value="cuti pernikahan">Cuti Pernikahan</option>
                                <option value="cuti ayah">Cuti Ayah</option>
                                <option value="cuti ibadah">Cuti Ibadah</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formPertimbanganEdit">
                            <Form.Label>Pertimbangan</Form.Label>
                            <Form.Control
                                as="select"
                                name="pertimbangan"
                                onChange={handleFilterCriteriaChange}
                            >
                                <option value="">Pilih</option>
                                <option value="Disetujui">Disetujui</option>
                                <option value="Mengajukan">Mengajukan</option>
                                <option value="Tidak Disetujui">Tidak Disetujui</option>
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

export default Cuti;
