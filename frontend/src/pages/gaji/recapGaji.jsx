import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import SearchBox from "../../components/search/SearchBox";
import Success from "../../image/success.png";
import Failed from "../../image/failed.png";
import { Modal, Button, Form } from "react-bootstrap";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import Excel from "../../image/Excel.png";
import Pdf from "../../image/PDF.png";
import axios from "axios";
import { API_URL } from "../../helpers/networt";

const RecapGaji = () => {
  const [records, setRecords] = useState([]);
  const [positions, setPositions] = useState([]);
  const [users, setUsers] = useState([]);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newData, setNewData] = useState({
    user_id: "",
    month: "",
    year: "",
    cuts: "",
  });

  const koneksi = async () => {
    const token = localStorage.getItem("token");
    try {
      const [responseAbsensi, responseUser, responsePosition] =
        await Promise.all([
          axios.get(`${API_URL}/api/admin/wages`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/api/admin/users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/api/admin/positions`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

      const absensiData = responseAbsensi.data.data;
      const userData = responseUser.data.data;
      const positionsData = responsePosition.data.data;
      setPositions(positionsData);
      setUsers(userData);

      const records = absensiData.map((absensi) => {
        const user = userData.find((user) => user.id === absensi.user_id);
        const position = user
          ? positionsData.find((position) => position.id === user.position_id)
          : null;
        return {
          ...absensi,
          name: user ? user.name : "Unknown User",
          gender: user ? user.gender : "Unknown Gender",
          position_name: position ? position.position_name : "Unknown Position",
        };
      });

      setRecords(records);
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
      sortable: true,
    },
    {
      name: "Nama Pegawai",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Jenis Kelamin",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Jabatan",
      selector: (row) => row.position_name,
      sortable: true,
    },
    {
      name: "Bulan",
      selector: (row) => row.month,
      sortable: true,
    },
    {
      name: "Tahun",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Gaji Pokok",
      selector: (row) => row.base_salary,
      sortable: true,
    },
    {
      name: "Tunjangan Transportasi",
      selector: (row) => row.transport_allowance,
      sortable: true,
    },
    {
      name: "Uang Makan",
      selector: (row) => row.meal_allowance,
      sortable: true,
    },
    {
      name: "Lembur",
      selector: (row) => row.overtimes,
      sortable: true,
    },
    {
      name: "Potongan Gaji",
      selector: (row) => row.cuts,
      sortable: true,
    },
    {
      name: "Jumlah Gaji",
      selector: (row) => row.net_salary,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Button variant="danger" onClick={() => handleDelete(row.id)}>
            <i className="bi bi-trash3-fill"></i>
          </Button>
        </>
      ),
    },
  ];

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filteredRecords, setFilteredRecords] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    month: "",
    year: "",
    position_name: "",
  });

  const handleCloseFilter = () => setShowFilterModal(false);
  const handleShowFilter = () => setShowFilterModal(true);

  const handleCloseAdd = () => setShowAddModal(false);
  const handleShowAdd = () => setShowAddModal(true);

  const handleCloseSuccess = () => setShowSuccessModal(false);
  const handleShowSuccess = () => setShowSuccessModal(true);

  const handleCloseFailed = () => setShowFailedModal(false);
  const handleShowFailed = () => setShowFailedModal(true);

  const handleNewInputChange = (event) => {
    const { name, value } = event.target;
    setNewData({ ...newData, [name]: value });
  };

  const handleSaveAdd = async () => {
    try {
      const token = localStorage.getItem("token");
      const requestData = {
        user_id: newData.user_id,
        month: newData.month,
        year: newData.year,
      };
      await axios.post(`${API_URL}/api/admin/wages`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      handleCloseAdd();
      koneksi();
      handleShowSuccess();
    } catch (error) {
      console.error("Error adding attendance data:", error);
      handleCloseAdd();
      handleShowFailed();
    }
  };

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm === "") {
      koneksi();
    } else {
      const newData = records.filter((row) => {
        return Object.values(row).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm)
        );
      });
      setRecords(newData);
    }
  };

  const handleFilterCriteriaChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  const handleFilterButton = () => {
    let newFilteredRecords = records;

    if (filterCriteria.month && filterCriteria.month !== "semua") {
      newFilteredRecords = newFilteredRecords.filter(
        (record) => record.month === parseInt(filterCriteria.month)
      );
    }

    if (filterCriteria.year && filterCriteria.year !== "semua") {
      newFilteredRecords = newFilteredRecords.filter(
        (record) => record.year === parseInt(filterCriteria.year)
      );
    }

    if (filterCriteria.position_name) {
      newFilteredRecords = newFilteredRecords.filter(
        (record) => record.position_name === filterCriteria.position_name
      );
    }

    setFilteredRecords(newFilteredRecords);
    setShowFilterModal(false);
  };

  const getFilterCriteriaText = () => {
    const { month, year, position_name } = filterCriteria;
    const criteriaText = [];

    if (month && month !== "semua") criteriaText.push(`Bulan: ${month}`);
    if (year && year !== "semua") criteriaText.push(`Tahun: ${year}`);
    if (position_name) criteriaText.push(`Jabatan: ${position_name}`);

    return criteriaText.length
      ? criteriaText.join(", ")
      : "Tidak ada filter yang diterapkan";
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        [
          "#",
          "Nama Pegawai",
          "Jenis Kelamin",
          "Jabatan",
          "Bulan",
          "Tahun",
          "Gaji Pokok",
          "Tunjangan Transportasi",
          "Uang Makan",
          "Lembur",
          "Potongan Gaji",
          "Jumlah Gaji",
        ],
      ],
      body: (filteredRecords || records).map((row, index) => [
        index + 1,
        row.name,
        row.gender,
        row.position_name,
        row.month,
        row.year,
        row.base_salary,
        row.transport_allowance,
        row.meal_allowance,
        row.overtimes,
        row.cuts,
        row.net_salary,
      ]),
    });
    doc.save("table.pdf");
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/api/admin/wages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setRecords(records.filter((record) => record.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      (filteredRecords || records).map((row, index) => ({
        "#": index + 1,
        "Nama Pegawai": row.name,
        "Jenis Kelamin": row.gender,
        Jabatan: row.position_name,
        Bulan: row.month,
        Tahun: row.year,
        "Gaji Pokok": row.base_salary,
        "Tunjangan Transportasi": row.transport_allowance,
        "Uang Makan": row.meal_allowance,
        Lembur: row.overtimes,
        "Potongan Gaji": row.cuts,
        "Jumlah Gaji": row.net_salary,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table.xlsx");
  };

  return (
    <div className="container">
      <h1 className="mt-3 mb-3">
        <b>Recap Gaji</b>
      </h1>
      <div className="d-flex justify-content-between mb-3">
        <Button
          variant="primary"
          className="text-white me-2 "
          style={{
            borderRadius: "15px",
            height: "30px",
            backgroundColor: "#18C89E",
          }}
          onClick={handleShowAdd}
        >
          <i className="bi bi-plus-circle-fill" aria-hidden="true"></i> Generate
          Gaji
        </Button>

        <div>
          <Button
            variant="primary"
            className="text-white me-2 "
            style={{
              borderRadius: "15px",
              height: "30px",
              backgroundColor: "#18C89E",
            }}
            onClick={handleShowFilter}
          >
            <i class="bi bi-funnel-fill" aria-hidden="true"></i> Filter
          </Button>
          <Button
            variant="danger"
            className="btn btn-warning mx-3 text-white font-weight-bold rounded-5"
            onClick={exportToPDF}
          >
            {" "}
            <img src={Pdf} alt="" width={18} /> PDF
          </Button>
          <Button
            variant="success"
            className="btn btn-success text-white font-weight-bold rounded-5"
            onClick={exportToExcel}
          >
            {" "}
            <img src={Excel} alt="" width={18} /> Excel
          </Button>
          <SearchBox onChange={handleFilter} />
        </div>
      </div>
      {filteredRecords && (
        <div className="mb-2">
          <div className="col-6 text-success">
            <p>Filter berdasarkan {getFilterCriteriaText()}</p>
          </div>
        </div>
      )}
      <div className="bg-white border rounded-4">
        <DataTable
          columns={columns}
          data={filteredRecords || records}
          fixedHeader
          pagination
        />
      </div>

      <Modal show={showAddModal} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNama">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                as="select"
                name="user_id"
                value={newData.user_id}
                onChange={handleNewInputChange}
              >
                <option value="">Pilih nama Pegawai</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBulan">
              <Form.Label>Bulan</Form.Label>
              <Form.Control
                as="select"
                name="month"
                value={newData.month}
                onChange={handleNewInputChange}
              >
                <option value="">Pilih Bulan</option>
                <option value="semua">semua</option>
                <option value="1">Januari</option>
                <option value="2">Februari</option>
                <option value="3">Maret</option>
                <option value="4">April</option>
                <option value="5">Mei</option>
                <option value="6">Juni</option>
                <option value="7">Juli</option>
                <option value="8">Agustus</option>
                <option value="9">September</option>
                <option value="10">Oktober</option>
                <option value="11">November</option>
                <option value="12">Desember</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formTahun">
              <Form.Label>Tahun</Form.Label>
              <Form.Control
                as="select"
                name="year"
                value={newData.year}
                onChange={handleNewInputChange}
              >
                <option value="">Pilih Tahun</option>
                <option value="semua">semua</option>
                {Array.from({ length: 50 }, (_, i) => 2000 + i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSaveAdd}>
            Simpan
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
              <Form.Control
                as="select"
                name="month"
                onChange={handleFilterCriteriaChange}
              >
                <option value="">Pilih Bulan</option>
                <option value="semua">Semua</option>
                <option value="1">Januari</option>
                <option value="2">Februari</option>
                <option value="3">Maret</option>
                <option value="4">April</option>
                <option value="5">Mei</option>
                <option value="6">Juni</option>
                <option value="7">Juli</option>
                <option value="8">Agustus</option>
                <option value="9">September</option>
                <option value="10">Oktober</option>
                <option value="11">November</option>
                <option value="12">Desember</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formTahun">
              <Form.Label>Tahun</Form.Label>
              <Form.Control
                as="select"
                name="year"
                onChange={handleFilterCriteriaChange}
              >
                <option value="">Pilih Tahun</option>
                <option value="semua">Semua</option>
                {Array.from({ length: 50 }, (_, i) => 2000 + i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formJabatan">
              <Form.Label>Jabatan</Form.Label>
              <Form.Control
                as="select"
                name="position_name"
                value={filterCriteria.position_name}
                onChange={handleFilterCriteriaChange}
              >
                <option value="">Pilih jabatan</option>
                {positions.map((position) => (
                  <option key={position.id} value={position.position_name}>
                    {position.position_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "none" }}>
          <Button variant="primary" onClick={handleFilterButton}>
            Filter
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
        <Modal.Footer style={{ borderTop: "none" }}>
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
        <Modal.Footer style={{ borderTop: "none" }}>
          <Button variant="primary" onClick={handleCloseFailed}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RecapGaji;
