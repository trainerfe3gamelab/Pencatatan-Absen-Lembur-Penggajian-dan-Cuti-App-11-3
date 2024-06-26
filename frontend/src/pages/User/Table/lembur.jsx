import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./lembur.css";
import { API_URL } from "../../../helpers/networt";
import axios from "axios";

function Overtime() {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState("");
  const [time_in, setTimeIn] = useState("");
  const [time_out, setTimeOut] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [initialData, setInitialData] = useState([]);
  const [data, setData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const koneksi = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token tidak tersedia.");
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/employee/overtimes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data.overtimes;

      if (Array.isArray(data)) {
        setInitialData(data);
        setData(data); // Juga mengatur data yang akan digunakan untuk tabel
      } else {
        console.error("Data fetched is not an array:", data);
      }

      console.log(data);
    } catch (error) {
      console.error("Error fetching data", error);
      toast.error("Terjadi kesalahan saat mengambil data!");
    }
  };

  useEffect(() => {
    koneksi();
  }, []);

  const isMobile = window.innerWidth <= 600;

  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFilter = () => setShowFilter(true);

  const handleFilter = () => {
    const filtered = initialData.filter((row) => {
      const rowDate = new Date(row.date);
      const filterDateObject = new Date(filterDate);

      const isMonthMatch = filterMonth
        ? rowDate.getMonth() + 1 === parseInt(filterMonth)
        : true;
      const isYearMatch = filterYear
        ? rowDate.getFullYear() === parseInt(filterYear)
        : true;
      const isDateMatch = filterDate
        ? rowDate.toDateString() === filterDateObject.toDateString()
        : true;

      return isMonthMatch && isYearMatch && isDateMatch;
    });

    setData(filtered);
    handleCloseFilter();
  };

  const handleClose = () => {
    setShow(false);
    setSelectedRow(null);
    setDate("");
    setTimeIn("");
    setTimeOut("");
  };

  const handleShow = (row) => {
    if (row) {
      setSelectedRow(row);
      setDate(row.date);
      setTimeIn(row.time_in);
      setTimeOut(row.time_out);
    } else {
      setSelectedRow(null);
      setDate("");
      setTimeIn("");
      setTimeOut("");
    }
    setShow(true);
  };

  const formatTime = (time) => {
    return time.length === 5 ? `${time}:00` : time;
  };

  const handleSubmit = async () => {
    let updatedData;
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token tidak tersedia.");
      return;
    }

    const requestData = {
      date,
      time_in: formatTime(time_in),
      time_out: formatTime(time_out),
    };

    try {
      if (selectedRow) {
        // Edit existing data
        requestData.user_id = selectedRow.user_id;

        console.log("Request data being sent to API for update:", requestData);

        const response = await fetch(
          `${API_URL}/api/employee/overtimes/${selectedRow.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestData),
          }
        );

        if (response.ok) {
          const result = await response.json();
          updatedData = initialData.map((row) =>
            row.id === selectedRow.id ? { ...row, ...requestData } : row
          );
          setInitialData(updatedData);
          setData(updatedData);
          toast.success("Berhasil Diupdate!");
        } else {
          const errorResponse = await response.json();
          console.error("Gagal mengupdate data:", errorResponse);
          toast.error(`Gagal mengupdate data! ${errorResponse.message}`);
        }
      } else {
        // Add new data
        console.log("Request data being sent to API:", requestData);

        const response = await fetch(`${API_URL}/api/employee/overtimes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          const result = await response.json();
          updatedData = [...initialData, { ...requestData, id: result.id }];
          setInitialData(updatedData);
          setData(updatedData);
          toast.success("Berhasil Tersimpan!");
        } else {
          const errorResponse = await response.json();
          console.error("Gagal menambah data baru:", errorResponse);
          toast.error(`Gagal menyimpan data! ${errorResponse.message}`);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan saat menyimpan data!");
    }

    handleClose();
  };

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Tanggal",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Waktu Masuk",
      selector: (row) => row.time_in,
      sortable: true,
    },
    {
      name: "Waktu Keluar",
      selector: (row) => row.time_out,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => handleShow(row)}
          style={{
            background: "linear-gradient(135deg, #FFA726, #FF7043)",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          hidden={row.status === "disetujui"}
        >
          Edit
        </button>
      ),
    },
  ];

  const customStyle = {
    table: {
      style: {
        width: "100%",
        height: "140px",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#f4f4f4",
      },
    },
    rows: {
      style: {
        fontSize: isMobile ? "10px" : "14px",
        padding: "10px 20px",
        margin: "5px 0",
      },
    },
    headCells: {
      style: {
        fontSize: isMobile ? "10px" : "12px",
        fontWeight: "bold",
        padding: "12px 12px",
      },
    },
    cells: {
      style: {
        padding: "12px 12px",
        margin: "5px 0",
      },
    },
  };

  return (
    <div>
      <button className="btn btn-plus" onClick={() => handleShow(null)}>
        <i className="bi bi-plus-circle-fill" style={{ color: "#004E5E" }}></i>{" "}
        Tambah
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedRow ? "Edit Data" : "Tambah Data Baru"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTanggal">
              <Form.Label>Tanggal</Form.Label>
              <Form.Control
                type="date"
                value={date || ""}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formWaktuMasuk">
              <Form.Label>Waktu Masuk</Form.Label>
              <Form.Control
                type="time"
                value={time_in || ""}
                onChange={(e) => setTimeIn(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formWaktuKeluar">
              <Form.Label>Waktu Keluar</Form.Label>
              <Form.Control
                type="time"
                value={time_out || ""}
                onChange={(e) => setTimeOut(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>

      <button className="btn btn-filter" onClick={handleShowFilter}>
        <i className="bi bi-filter"></i> FILTER
      </button>

      <Modal show={showFilter} onHide={handleCloseFilter}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>
              Bulan:
              <input
                type="number"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                placeholder="MM"
                min="1"
                max="12"
              />
            </label>
            <label>
              Tahun:
              <input
                type="number"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                placeholder="YYYY"
              />
            </label>
            <label>
              Tanggal:
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                placeholder="DD/MM/YYYY"
              />
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFilter}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFilter}>
            Apply Filter
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="table-container">
        <DataTable
          columns={columns}
          data={data}
          fixedHeader
          pagination
          customStyles={customStyle}
        />
      </div>
    </div>
  );
}

export default Overtime;
