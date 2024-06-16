import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import { Button } from "react-bootstrap";
import "jspdf-autotable";
import "./gaji.css";
import { Modal } from "react-bootstrap";
import { API_URL } from "../../../helpers/networt";
import axios from "axios";
import { useMediaQuery } from "@mui/material";

const Gaji = () => {
  const [initialData, setInitialData] = useState([]);

  const koneksi = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${API_URL}/api/employee/wages`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const fetchedData = response.data.data.wages; // Pastikan ini sesuai dengan struktur data dari API Anda
      if (Array.isArray(fetchedData)) {
        setInitialData(fetchedData); // Mengatur data yang akan digunakan untuk tabel
      } else {
        console.error("Data yang diambil bukan array:", fetchedData);
      }

      console.log(fetchedData);
    } catch (error) {
      console.error("Kesalahan saat mengambil data", error);
    }
  };

  useEffect(() => {
    koneksi();
  }, []);

  const isMobile = window.innerWidth <= 600;

  const handlePrint = (row) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Data Gaji Bulanan", 105, 20, null, null, "center");

    // Garis Pembatas
    doc.setLineWidth(0.5);
    doc.line(10, 25, 200, 25);

    // Tabel
    doc.autoTable({
      startY: 30,
      head: [["Keterangan", "Nilai"]],
      body: [
        ["Bulan", row.month],
        ["Tahun", row.year],
        ["Gaji Pokok", row.base_salary],
        ["Uang Transport", row.transport_allowance],
        ["Uang Lembur", row.overtimes],
        ["Potongan Gaji", row.cuts],
        ["Total Gaji", row.net_salary],
      ],
      theme: "grid",
      styles: { fontSize: 12 },
      headStyles: { fillColor: [100, 100, 255] },
      margin: { top: 20 },
    });

    doc.save(`gaji_${row.id}.pdf`);
  };

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
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
      name: "gaji pokok",
      selector: (row) => row.base_salary,
      sortable: true,
    },
    {
      name: "Transport",
      selector: (row) => row.transport_allowance,
      sortable: true,
    },
    {
      name: "Uang Makan",
      selector: (row) => row.meal_allowance,
      sortable: true,
    },
    {
      name: "lembur",
      selector: (row) => row.overtimes,
      sortable: true,
    },
    {
      name: "Potongan",
      selector: (row) => row.cuts,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => row.net_salary,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Button className="btn-printer" onClick={() => handlePrint(row)}>
            <i className="bi bi-printer"></i>
          </Button>
        </>
      ),
    },
  ];

  const customStyle = {
    table: {
      style: {
        width: "100%", // Atur lebar tabel
        height: "130px", // Atur tinggi tabel jika diperlukan
      },
    },
    headRow: {
      style: {
        backgroundColor: "#f4f4f4", // Warna latar untuk header
      },
    },
    rows: {
      style: {
        fontSize: isMobile ? "10px" : "14px", // Ukuran font untuk baris
        padding: "10px 20px", // Padding untuk baris
        margin: "5px 0", // Margin untuk baris
      },
    },
    headCells: {
      style: {
        fontSize: isMobile ? "10px" : "12px", // Ukuran font untuk head cells
        fontWeight: "bold", // Tebal font untuk head cells
        padding: "12px 12px", // Padding untuk head cells
      },
    },
    cells: {
      style: {
        padding: "12px 12px", // Padding untuk cells
        margin: "5px 0", // Margin untuk cells
      },
    },
  };

  const [show, setShow] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [data, setData] = useState(initialData);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [filteredData, setFilteredData] = useState(initialData);

  const handleFilter = () => {
    const filtered = initialData.filter((row) => {
      return (
        (month ? row.month === parseInt(month) : true) &&
        (year ? row.year === parseInt(year) : true)
      );
    });
    setInitialData(filtered); // Menyimpan data yang difilter ke initialData
    handleClose();
  };

  return (
    <div className="table-container">
      <button className="btn btn-filter" onClick={handleShow}>
        <i className="bi bi-filter"></i>
        FILTER
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>
              Bulan:
              <input
                type="number"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="MM"
                min="1"
                max="12"
              />
            </label>
            <label>
              Tahun:
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="YYYY"
              />
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
          data={initialData}
          fixedHeader
          pagination
          customStyles={customStyle}
        />
      </div>
    </div>
  );
};

export default Gaji;
