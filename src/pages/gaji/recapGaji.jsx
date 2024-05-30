import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import SearchBox from '../../components/search/SearchBox';
import { Modal, Button, Form } from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Excel from '../../image/Excel.png';
import Pdf from '../../image/PDF.png';


const RecapGaji = () => {
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
            name: "Gaji Pokok",
            selector: row => row.hadir,
            sortable: true
        },
        {
            name: "Tunjangan Transportasi",
            selector: row => row.sakit,
            sortable: true
        },
        {
            name: "Uang Makan",
            selector: row => row.izin,
            sortable: true
        },
        {
            name: "Lembur",
            selector: row => row.alpha,
            sortable: true
        },
        {
            name: "Potongan Gaji",
            selector: row => row.alpha,
            sortable: true
        },
        {
            name: "Jumlah Gaji",
            selector: row => row.alpha,
            sortable: true
        },
    ];

    const initialData = [
        { id: 1, name: 'Alpa', kelamin: 'laki-laki', jabatan: 'staf admin', bulan: 'Mei', tahun: '2020', hadir: '30', sakit: '5', izin: '10', alpha: '0' },
        { id: 2, name: 'Beta', kelamin: 'perempuan', jabatan: 'manajer', bulan: 'Juni', tahun: '2020', hadir: '28', sakit: '2', izin: '5', alpha: '1' },
        { id: 3, name: 'Gamma', kelamin: 'laki-laki', jabatan: 'staf IT', bulan: 'Juli', tahun: '2020', hadir: '25', sakit: '3', izin: '2', alpha: '5' },
        { id: 4, name: 'Delta', kelamin: 'perempuan', jabatan: 'staf HR', bulan: 'Agustus', tahun: '2020', hadir: '27', sakit: '4', izin: '3', alpha: '2' },
        { id: 5, name: 'Epsilon', kelamin: 'laki-laki', jabatan: 'manajer', bulan: 'September', tahun: '2020', hadir: '26', sakit: '1', izin: '7', alpha: '3' },
        { id: 6, name: 'Zeta', kelamin: 'perempuan', jabatan: 'staf keuangan', bulan: 'Oktober', tahun: '2020', hadir: '29', sakit: '2', izin: '4', alpha: '0' },
        { id: 7, name: 'Eta', kelamin: 'laki-laki', jabatan: 'direktur', bulan: 'November', tahun: '2020', hadir: '30', sakit: '0', izin: '0', alpha: '0' },
        { id: 8, name: 'Theta', kelamin: 'perempuan', jabatan: 'staf pemasaran', bulan: 'Desember', tahun: '2020', hadir: '25', sakit: '5', izin: '5', alpha: '5' },
        { id: 9, name: 'Iota', kelamin: 'laki-laki', jabatan: 'staf admin', bulan: 'Januari', tahun: '2021', hadir: '27', sakit: '3', izin: '3', alpha: '2' },
        { id: 10, name: 'Kappa', kelamin: 'perempuan', jabatan: 'manajer', bulan: 'Februari', tahun: '2021', hadir: '26', sakit: '2', izin: '1', alpha: '1' },
        { id: 11, name: 'Lambda', kelamin: 'laki-laki', jabatan: 'staf IT', bulan: 'Maret', tahun: '2021', hadir: '28', sakit: '3', izin: '2', alpha: '1' },
        { id: 12, name: 'Mu', kelamin: 'perempuan', jabatan: 'staf HR', bulan: 'April', tahun: '2021', hadir: '29', sakit: '1', izin: '4', alpha: '0' },
        { id: 13, name: 'Nu', kelamin: 'laki-laki', jabatan: 'staf keuangan', bulan: 'Mei', tahun: '2021', hadir: '25', sakit: '4', izin: '3', alpha: '5' },
    ];
    
    

    const [records, setRecords] = useState(initialData);
    const [showFilterModal, setShowFilterModal] = useState(false);
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

   

    const handleCloseFilter = () => setShowFilterModal(false);
    const handleShowFilter = () => setShowFilterModal(true);


   

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

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['#', 'Nama Pegawai', 'Jenis Kelamin', 'Jabatan', 'Bulan', 'Tahun', 'Hadir', 'Sakit', 'Alpha']],
            body: (filteredRecords || records).map((row, index) => [
                index + 1, row.name, row.kelamin, row.jabatan, row.bulan, row.tahun, row.hadir, row.sakit, row.alpha
            ])
        });
        doc.save('table.pdf');
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet((filteredRecords || records).map((row, index) => ({
            "#": index + 1,
            "Nama Pegawai": row.name,
            "Jenis Kelamin": row.kelamin,
            "Jabatan": row.jabatan,
            "Bulan": row.bulan,
            "Tahun": row.tahun,
            "Hadir": row.hadir,
            "Sakit": row.sakit,
            "Alpha": row.alpha
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "table.xlsx");
    };

    return (
        <div className='container'>
            <h1 className='mt-3 mb-3'><b>Recap Gaji</b></h1>
            <div className='d-flex justify-content-between mb-3'>
            <Button className='btn btn-success ms-2' onClick={handleShowFilter}> Filter </Button>
                <div>
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
                                <option value="Januari">Januari</option>
                                <option value="Februari">Februari</option>
                                <option value="Maret">Maret</option>
                                <option value="April">April</option>
                                <option value="Mei">Mei</option>
                                <option value="Juni">Juni</option>
                                <option value="Juli">Juli</option>
                                <option value="Agustus">Agustus</option>
                                <option value="september">September</option>
                                <option value="Oktober">Oktober</option>
                                <option value="November">November</option>
                                <option value="Desember">Desember</option>
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

export default RecapGaji;
