import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import { API_URL } from '../../helpers/networt';


const Pegawai = () => {


    const koneksi = async () => {
        const token = localStorage.getItem('token'); // Adjust according to your token storage method
        try {
            const response = await axios.get(`${API_URL}/api/admin/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const response_position = await axios.get(`${API_URL}/api/admin/positions`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const usersData = response.data.data;
            const positionsData = response_position.data.data;
            setPositions(response_position.data.data);

            const records = usersData.map(user => {
                const position = positionsData.find(position => position.id === user.position_id);
                const positionName = position ? position.position_name : 'Unknown Position';
                return { ...user, position_name: positionName };
            });

            setRecords(records);

        } catch (error) {
            console.error("Error fetching data", error);
        }
    };


    useEffect(() => {
        koneksi();
    }, []);

    const [records, setRecords] = useState([]);
    const [positions, setPositions] = useState([]);

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
            selector: row => row.gender,
            sortable: true
        },
        {
            name: "Jabatan",
            selector: row => row.position_name,
            sortable: true
        },
        {
            name: "Nomor Tlpn",
            selector: row => row.phone_number,
            sortable: true
        },
        {
            name: "Alamat",
            selector: row => row.address,
            sortable: true
        },
        {
            name: "Email",
            selector: row => row.email,
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

    const [errorMessage, setErrorMessage] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailedModal, setShowFailedModal] = useState(false);
    const [editData, setEditData] = useState({ id: '', name: '', gender: '', position_id: '', phone_number: '', address: '', email: '', role: '' });
    const [newData, setNewData] = useState({ name: '', gender: '', position_name: '', phone_number: '', address: '', email: '', role: '' });
    const [filteredRecords, setFilteredRecords] = useState(null);
    const [filterCriteria, setFilterCriteria] = useState({ kelamin: '', jabatan: '' });






    const handleFilterButton = () => {
        let newFilteredRecords = records;
        if (filterCriteria.gender && filterCriteria.gender !== 'semua') {
            newFilteredRecords = newFilteredRecords.filter(record => record.gender === filterCriteria.gender);
        }
        if (filterCriteria.position) {
            newFilteredRecords = newFilteredRecords.filter(record => record.position_id === filterCriteria.position);
        }
        setFilteredRecords(newFilteredRecords);
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


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditData({ ...editData, [name]: value });
    };
    






    const handleSaveEdit = async () => {
        const token = localStorage.getItem('token');
        const userId = editData.id;
        const updatedUserData = {
            name: editData.name,
            gender: editData.gender,
            position_id: editData.position_id,
            phone_number: editData.phone_number,
            address: editData.address,
            email: editData.email,
            role: editData.role
        };
    
        try {
            const response = await axios.put(`${API_URL}/api/admin/users/${userId}`, updatedUserData, {
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
            await axios.delete(`${API_URL}/api/admin/users/${id}`, {
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
    





    const handleInputChangeposition = (event) => {
        const { value } = event.target;
        setEditData({ ...editData, position_id: value });
    };
    
    

    const handleNewInputChange = (event) => {
        const { name, value } = event.target;
        setNewData({ ...newData, [name]: value });
    };



























    const handleSaveAdd = async () => {
        try {
            const token = localStorage.getItem('token'); 
    
            const formData = new FormData();
            formData.append('gender', newData.gender);
            formData.append('name', newData.name);
            formData.append('position_id', newData.position);
            formData.append('address', newData.address);
            formData.append('role', newData.role);
            formData.append('phone_number', newData.phone_number);
            formData.append('password', newData.password);
            formData.append('email', newData.email);
      
            const response = await axios.post(`${API_URL}/api/admin/users`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
    
         
            console.log('Response:', response.data);
            

            handleCloseAdd();
            koneksi();
            handleShowSuccess();
        } catch (error) {
            console.error("Error updating user data:", error);
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
    





    

    const handleFilterCriteriaChange = (event) => {
        const { name, value } = event.target;
        setFilterCriteria({ ...filterCriteria, [name]: value });
    };




    const getFilterCriteriaText = () => {
        const { gender, position } = filterCriteria;
        const criteriaText = [];

        if (gender && gender !== 'semua') criteriaText.push(`Jenis Kelamin`);
        if (position && position !== 'semua') criteriaText.push(`Jabatan`);

        return criteriaText.length ? criteriaText.join(' dan ') : 'Tidak ada filter yang diterapkan';
    };





    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['#', 'Nama Pegawai', 'Jenis Kelamin', 'Jabatan', 'Nomor Tlpn', 'Alamat', 'Email', 'Role']],
            body: (filteredRecords || records).map((row, index) => [index + 1, row.name, row.gender, row.position_name, row.phone_number, row.address, row.email, row.role])
        });
        doc.save('table.pdf');
    };





    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet((filteredRecords || records).map((row, index) => ({
            "#": index + 1,
            "Nama Pegawai": row.name,
            "Jenis Kelamin": row.gender,
            "Jabatan": row.position_name,
            "Nomor Tlpn": row.phone_number,
            "Alamat": row.address,
            "Email": row.email,
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
                        <i className="bi bi-funnel-fill" aria-hidden="true"></i> Filter
                    </Button>
                    <Button variant="danger" className='btn btn-warning mx-3 text-white font-weight-bold rounded-5' onClick={exportToPDF}> <img src={Pdf} alt="" width={18} /> PDF</Button>
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
        <Modal.Title>Edit Data Pegawai</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Form.Group controlId="formNama">
                <Form.Control
                    style={{ display: 'none' }}
                    type="text"
                    name="id"
                    value={editData.id}
                    onChange={handleInputChange}
                />
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
                    name="gender"
                    value={editData.gender}
                    onChange={handleInputChange}
                >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="laki-laki">laki-laki</option>
                    <option value="perempuan">perempuan</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formJabatan">
                <Form.Label>Jabatan</Form.Label>
                <Form.Control
                    as="select"
                    name="position_id"
                    value={editData.position_id}
                    onChange={handleInputChange}
                >
                    <option value="">Pilih jabatan</option>
                    {positions.map(position => (
                        <option key={position.id} value={position.id}>
                            {position.position_name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formTelepon">
                <Form.Label>Nomor Telepon</Form.Label>
                <Form.Control
                    type="number"
                    name="phone_number"
                    value={editData.phone_number}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group controlId="formAlamat">
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                    type="text"
                    name="address"
                    value={editData.address}
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
                    <option value="employee">employee</option>
                </Form.Control>
            </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="success" onClick={handleSaveEdit}>
            Save Changes
        </Button>
    </Modal.Footer>
</Modal>


























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
                    name="gender"
                    value={newData.gender}
                    onChange={handleNewInputChange}
                >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="laki-laki">laki-laki</option>
                    <option value="perempuan">perempuan</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formJabatan">
                <Form.Label>Jabatan</Form.Label>
                <Form.Control
                    as="select"
                    name="position"
                    value={newData.position}
                    onChange={handleNewInputChange}
                >
                    <option value="">Pilih jabatan</option>
                    {positions.map(position => (
                        <option key={position.id} value={position.id}>
                            {position.position_name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formTelepon">
                <Form.Label>Nomor Telepon</Form.Label>
                <Form.Control
                    type="text"
                    name="phone_number"
                    value={newData.phone_number}
                    onChange={handleNewInputChange}
                />
            </Form.Group>
            <Form.Group controlId="formAlamat">
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                    type="text"
                    name="address"
                    value={newData.address}
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
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={newData.password}
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
                    <option value="employee">employee</option>
                </Form.Control>
            </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="success" onClick={handleSaveAdd}>
            Save
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
                                <option value="laki-laki">laki-laki</option>
                                <option value="perempuan">perempuan</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formJabatan">
                            <Form.Label>Jabatan</Form.Label>
                            <Form.Control
                                as="select"
                                name="position"
                                onChange={handleFilterCriteriaChange}
                            >
                    <option value="">Pilih jabatan</option>
                    {positions.map(position => (
                        <option key={position.id} value={position.id}>
                            {position.position_name}
                        </option>
                    ))}
                </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: 'none' }}>
                    <Button variant="primary" onClick={handleFilterButton}>
                        Filter
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Pegawai;
