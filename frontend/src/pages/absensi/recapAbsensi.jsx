import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import SearchBox from "../../components/search/SearchBox";
import { Modal, Button, Form } from "react-bootstrap";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import Excel from "../../image/Excel.png";
import Pdf from "../../image/PDF.png";
import axios from "axios";
import { API_URL } from "../../helpers/networt";

const RecapAbsensi = () => {
  const [records, setRecords] = useState([]);
  const [positions, setPositions] = useState([]);
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filteredRecords, setFilteredRecords] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    type: "",
    status: "",
    gender: "",
    position_name: "",
  });
  const [addCriteria, setAddCriteria] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const koneksi = async () => {
    const token = localStorage.getItem("token");
    try {
      const [responseAbsensi, responseUser, responsePosition] =
        await Promise.all([
          axios.get(`${API_URL}/api/admin/attendance-reports`, {
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

  const addAttendanceReport = async (month, year) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/attendance-reports/all`,
        {
          month: month,
          year: year,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Attendance report added:", response.data);
      // Update the records state after adding a new report
      koneksi();
    } catch (error) {
      console.error("Error adding attendance report:", error);
    }
  };

  const resetAttendanceReport = async (month, year) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await axios.delete(
        `${API_URL}/api/admin/attendance-reports`, // URL
        {
          data: {
            month: month,
            year: year,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Attendance report has resetted:", response.data);
      koneksi();
    } catch (error) {
      console.error("Error resetting attendance report:", error);
    }
  };

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
      name: "Hadir",
      selector: (row) => row.hadir,
      sortable: true,
    },
    {
      name: "Sakit",
      selector: (row) => row.sakit,
      sortable: true,
    },
    {
      name: "Izin",
      selector: (row) => row.izin,
      sortable: true,
    },
    {
      name: "Alpha",
      selector: (row) => row.alpha,
      sortable: true,
    },
    {
      name: "Dibuat",
      selector: (row) => row.creation_time,
      sortable: true,
    },
  ];

  const handleCloseFilter = () => setShowFilterModal(false);
  const handleShowFilter = () => setShowFilterModal(true);

  const handleCloseAdd = () => setShowAddModal(false);
  const handleShowAdd = () => setShowAddModal(true);

  const handleCloseReset = () => setShowResetModal(false);
  const handleShowReset = () => setShowResetModal(true);

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

  const handleFilterButton = () => {
    let newFilteredRecords = records;

    if (filterCriteria.gender) {
      newFilteredRecords = newFilteredRecords.filter(
        (record) => record.gender === filterCriteria.gender
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

  const handleFilterCriteriaChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  const getFilterCriteriaText = () => {
    const { month, year, gender, position_name } = filterCriteria;
    const criteriaText = [];

    if (month && month !== "semua") criteriaText.push(`Bulan: ${month}`);
    if (year && year !== "semua") criteriaText.push(`Tahun: ${year}`);
    if (gender && gender !== "semua")
      criteriaText.push(`Jenis Kelamin: ${gender}`);
    if (position_name && position_name !== "semua")
      criteriaText.push(`Jabatan: ${position_name}`);

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
          "Hadir",
          "Sakit",
          "Alpha",
          "Dibuat",
        ],
      ],
      body: (filteredRecords || records).map((row, index) => [
        index + 1,
        row.name,
        row.gender,
        row.position_name,
        row.month,
        row.year,
        row.hadir,
        row.sakit,
        row.alpha,
        row.creation_time,
      ]),
    });
    doc.save("table.pdf");
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
        Hadir: row.hadir,
        Sakit: row.sakit,
        Alpha: row.alpha,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table.xlsx");
  };

  const handleAddCriteriaChange = (event) => {
    const { name, value } = event.target;
    setAddCriteria((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getAddCriteriaText = () => {
    const { month, year } = addCriteria;
    const criteriaText = [];

    if (month && month !== "semua") criteriaText.push(`Bulan: ${month}`);
    if (year && year !== "semua") criteriaText.push(`Tahun: ${year}`);

    return criteriaText.length
      ? criteriaText.join(", ")
      : "Tidak ada data yang diterapkan";
  };

  const handleAddAttendanceReport = () => {
    addAttendanceReport(addCriteria.month, addCriteria.year);
    handleCloseAdd();
  };

  const handleResetAttendanceReport = () => {
    resetAttendanceReport(addCriteria.month, addCriteria.year);
    handleCloseReset();
  };

  return (
    <div className="container">
      <h1 className="mt-3 mb-3">
        <b>Recap Absensi</b>
      </h1>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <Button
            variant="primary"
            className="text-white me-2"
            style={{
              borderRadius: "15px",
              height: "30px",
              backgroundColor: "#18C89E",
            }}
            onClick={handleShowAdd}
          >
            Tampilkan Data
          </Button>
          <Button
            variant="primary"
            className="text-white me-2"
            style={{
              borderRadius: "15px",
              height: "30px",
              backgroundColor: "#18C89E",
            }}
            onClick={handleShowReset}
          >
            <i className="bi bi-arrow-clockwise" aria-hidden="true"></i> Reset
          </Button>
        </div>
        <div>
          <Button
            variant="primary"
            className="text-white me-2"
            style={{
              borderRadius: "15px",
              height: "30px",
              backgroundColor: "#18C89E",
            }}
            onClick={handleShowFilter}
          >
            <i className="bi bi-funnel-fill" aria-hidden="true"></i> Filter
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
            <p>
              Data berdasarkan {getFilterCriteriaText() || getAddCriteriaText()}
            </p>
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

      {/* menampilkan Modal reset data*/}
      <Modal show={showResetModal} onHide={handleCloseReset}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBulan">
              <Form.Label>Bulan</Form.Label>
              <Form.Control
                as="select"
                name="month"
                value={addCriteria.month}
                onChange={handleAddCriteriaChange}
              >
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
                value={addCriteria.year}
                onChange={handleAddCriteriaChange}
              >
                {Array.from({ length: 50 }, (_, i) => 2000 + i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "none" }}>
          <Button variant="primary" onClick={handleResetAttendanceReport}>
            reset
          </Button>
        </Modal.Footer>
      </Modal>

      {/* menampilkan Modal tambahkan data*/}
      <Modal show={showAddModal} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Tampilkan Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBulan">
              <Form.Label>Bulan</Form.Label>
              <Form.Control
                as="select"
                name="month"
                value={addCriteria.month}
                onChange={handleAddCriteriaChange}
              >
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
                value={addCriteria.year}
                onChange={handleAddCriteriaChange}
              >
                {Array.from({ length: 50 }, (_, i) => 2000 + i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "none" }}>
          <Button variant="primary" onClick={handleAddAttendanceReport}>
            tampilkan
          </Button>
        </Modal.Footer>
      </Modal>

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
                value={filterCriteria.gender}
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

export default RecapAbsensi;
