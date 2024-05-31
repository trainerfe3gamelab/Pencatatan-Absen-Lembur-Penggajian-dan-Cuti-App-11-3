import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import SearchBox from '../../components/search/SearchBox';
import { Modal, Button, Form } from 'react-bootstrap';
import Success from '../../image/success.png';
import Failed from '../../image/failed.png';

const Gaji = () => {
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
            name: "Bulan",
            selector: row => row.bulan,
            sortable: true
        },
        {
            name: "Tahun",
            selector: row => row.tahun,
            sortable: true
        },
        {
            name: "Jumlah Gaji",
            selector: row => row.jumlahgaji,
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
        { id: 1, name: 'alpa', kelamin: 'laki-laki', jabatan: 'staf admin', bulan: 'mei', tahun: '2023', jumlahgaji: '1.000.000' },
        { id: 2, name: 'beta', kelamin: 'perempuan', jabatan: 'manager', bulan: 'juni', tahun: '2023', jumlahgaji: '1.800.000' },
        { id: 3, name: 'gamma', kelamin: 'laki-laki', jabatan: 'security', bulan: 'juli', tahun: '2023', jumlahgaji: '1.500.000' },
        { id: 4, name: 'delta', kelamin: 'perempuan', jabatan: 'staf IT', bulan: 'agustus', tahun: '2023', jumlahgaji: '2.200.000' },
        { id: 5, name: 'epsilon', kelamin: 'laki-laki', jabatan: 'staf HR', bulan: 'september', tahun: '2023', jumlahgaji: '1.900.000' },
        { id: 6, name: 'zeta', kelamin: 'perempuan', jabatan: 'sekretaris', bulan: 'oktober', tahun: '2023', jumlahgaji: '2.100.000' },
        { id: 7, name: 'eta', kelamin: 'laki-laki', jabatan: 'staf keuangan', bulan: 'november', tahun: '2023', jumlahgaji: '2.000.000' },
        { id: 8, name: 'theta', kelamin: 'perempuan', jabatan: 'kasir', bulan: 'desember', tahun: '2023', jumlahgaji: '1.700.000' },
        { id: 9, name: 'iota', kelamin: 'laki-laki', jabatan: 'driver', bulan: 'januari', tahun: '2024', jumlahgaji: '1.600.000' },
        { id: 10, name: 'kappa', kelamin: 'perempuan', jabatan: 'staf marketing', bulan: 'februari', tahun: '2024', jumlahgaji: '2.300.000' },
        { id: 11, name: 'lambda', kelamin: 'laki-laki', jabatan: 'staf produksi', bulan: 'maret', tahun: '2024', jumlahgaji: '2.100.000' },
        { id: 12, name: 'mu', kelamin: 'perempuan', jabatan: 'staf admin', bulan: 'april', tahun: '2024', jumlahgaji: '1.800.000' },
        { id: 13, name: 'nu', kelamin: 'laki-laki', jabatan: 'staf gudang', bulan: 'mei', tahun: '2024', jumlahgaji: '2.200.000' },
    ];

    const [records, setRecords] = useState(initialData);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [editData, setEditData] = useState({ id: '', name: '', kelamin: '', jabatan: '', bulan: '', tahun: '', jumlahgaji: '' });
    const [newData, setNewData] = useState({ name: '', kelamin: '', jabatan: '', bulan: '', tahun: '', jumlahgaji: '' });
    const [filteredRecords, setFilteredRecords] = useState(null);
    const [filterCriteria, setFilterCriteria] = useState({ date: '', gender: '', position: '' });

    const handleFilterButton = () => {
        let filteredData = initialData;

        if (filterCriteria.bulan && filterCriteria.bulan !== 'semua') {
            filteredData = filteredData.filter(record => record.bulan === filterCriteria.bulan);
        }

        if (filterCriteria.tahun && filterCriteria.tahun !== 'semua') {
            filteredData = filteredData.filter(record => record.tahun === filterCriteria.tahun);
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
        const { bulan, tahun, gender, position } = filterCriteria;
        const criteriaText = [];


        if (bulan && bulan !== 'semua') criteriaText.push(`Bulan: ${bulan}`);
        if (tahun && tahun !== 'semua') criteriaText.push(`Tahun: ${tahun}`);
        if (gender && gender !== 'semua') criteriaText.push(`Jenis Kelamin: ${gender}`);
        if (position && position !== 'semua') criteriaText.push(`Jabatan: ${position}`);

        return criteriaText.length ? criteriaText.join(', ') : 'Tidak ada filter yang diterapkan';
    };

    return (
        <div className='container'>
            <h1 className='mt-3 mb-3'><b>Data Gaji</b></h1>
            <div className='d-flex justify-content-between mb-3'>
                <Button variant="primary" className="text-white me-2 " style={{ borderRadius: '15px', height: '30px', backgroundColor: '#18C89E' }} onClick={handleShowAdd}>
                    <i className="bi bi-plus-circle-fill" aria-hidden="true"></i> Generate Gaji
                </Button>
                <div>
                    <Button variant="primary" className="text-white me-2 " style={{ borderRadius: '15px', height: '30px', backgroundColor: '#18C89E' }} onClick={handleShowFilter}>
                        <i class="bi bi-funnel-fill" aria-hidden="true"></i> Filter
                    </Button>
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
                        <Form.Group controlId="formBulan">
                            <Form.Label>Bulan</Form.Label>
                            <Form.Control as="select" name="bulan" value={editData.bulan} onChange={handleInputChange}>
                                <option value="">Pilih Bulan</option>
                                <option value="Januari">Januari</option>
                                <option value="Februari">Februari</option>
                                <option value="Maret">Maret</option>
                                <option value="April">April</option>
                                <option value="Mei">Mei</option>
                                <option value="Juni">Juni</option>
                                <option value="Juli">Juli</option>
                                <option value="Agustus">Agustus</option>
                                <option value="September">September</option>
                                <option value="Oktober">Oktober</option>
                                <option value="November">November</option>
                                <option value="Desember">Desember</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formTahun">
                            <Form.Label>Tahun</Form.Label>
                            <Form.Control as="select" name="tahun" value={editData.tahun} onChange={handleInputChange}>
                                <option value="">Pilih Tahun</option>
                                {Array.from({ length: 50 }, (_, i) => 2000 + i).map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </Form.Control>

                        </Form.Group>
                        <Form.Group controlId="formJumlahGaji">
                            <Form.Label>Jumlah Gaji</Form.Label>
                            <Form.Control
                                type="text"
                                name="jumlahgaji"
                                value={editData.jumlahgaji}
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
                        <Form.Group controlId="formBulan">
                            <Form.Label>Bulan</Form.Label>
                            <Form.Control as="select" name="bulan" value={newData.bulan} onChange={handleNewInputChange}>
                                <option value="">Pilih Bulan</option>
                                <option value="Januari">Januari</option>
                                <option value="Februari">Februari</option>
                                <option value="Maret">Maret</option>
                                <option value="April">April</option>
                                <option value="Mei">Mei</option>
                                <option value="Juni">Juni</option>
                                <option value="Juli">Juli</option>
                                <option value="Agustus">Agustus</option>
                                <option value="September">September</option>
                                <option value="Oktober">Oktober</option>
                                <option value="November">November</option>
                                <option value="Desember">Desember</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formTahun">
                            <Form.Label>Tahun</Form.Label>
                            <Form.Control as="select" name="tahun" value={newData.tahun} onChange={handleNewInputChange}>
                                <option value="">Pilih Tahun</option>
                                {Array.from({ length: 50 }, (_, i) => 2000 + i).map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </Form.Control>

                        </Form.Group>
                        <Form.Group controlId="formJumlahGaji">
                            <Form.Label>Jumlah Gaji</Form.Label>
                            <Form.Control
                                type="text"
                                name="jumlahgaji"
                                value={newData.jumlahgaji}
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
                        <Form.Group controlId="formBulan">
                            <Form.Label>Bulan</Form.Label>
                            <Form.Control as="select" name="bulan" onChange={handleFilterCriteriaChange}>
                                <option value="">Pilih Bulan</option>
                                <option value="semua">semua</option>
                                <option value="januari">Januari</option>
                                <option value="februari">Februari</option>
                                <option value="maret">Maret</option>
                                <option value="april">April</option>
                                <option value="mei">Mei</option>
                                <option value="juni">Juni</option>
                                <option value="juli">Juli</option>
                                <option value="agustus">Agustus</option>
                                <option value="september">September</option>
                                <option value="oktober">Oktober</option>
                                <option value="november">November</option>
                                <option value="desember">Desember</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formTahun">
                            <Form.Label>Tahun</Form.Label>
                            <Form.Control as="select" name="tahun" onChange={handleFilterCriteriaChange}>
                                <option value="">Pilih Tahun</option>
                                <option value="semua">semua</option>
                                {Array.from({ length: 50 }, (_, i) => 2000 + i).map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </Form.Control>
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

export default Gaji;
