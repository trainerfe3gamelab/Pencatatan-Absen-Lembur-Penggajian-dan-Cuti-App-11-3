import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../../helpers/networt";
import axios from "axios";

const Cuti = () => {
  const koneksi = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${API_URL}/api/employee/leaves`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const fetchedData = response.data.data.leaves;

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

  const [show, setShow] = useState(false);
  const [mulaicuti, setMulaiCuti] = useState("");
  const [berakhircuti, setBerakhirCuti] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [initialData, setInitialData] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [data, setData] = useState(initialData);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [type, setType] = useState("sakit");

  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFilter = () => setShowFilter(true);

  const handleFilter = () => {
    let filteredData = initialData;

    if (month) {
      filteredData = filteredData.filter((item) => {
        const itemMonth = new Date(item.start_date).getMonth() + 1; // Bulan dimulai dari 0
        return itemMonth === parseInt(month, 10);
      });
    }

    if (year) {
      filteredData = filteredData.filter((item) => {
        const itemYear = new Date(item.start_date).getFullYear();
        return itemYear === parseInt(year, 10);
      });
    }

    if (date) {
      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.start_date).toISOString().split("T")[0]; // Format YYYY-MM-DD
        return itemDate === date;
      });
    }

    setInitialData(filteredData);
    handleCloseFilter();
  };

  const handleClose = () => {
    setShow(false);
    setSelectedRow(null);
    setMulaiCuti("");
    setBerakhirCuti("");
    setKeterangan("");
  };

  const handleShow = (row) => {
    if (row) {
      setSelectedRow(row);
      setMulaiCuti(row.start_date);
      setBerakhirCuti(row.end_date);
      setKeterangan(row.reasoning);
    } else {
      setSelectedRow(null);
      setMulaiCuti("");
      setBerakhirCuti("");
      setKeterangan("");
    }
    setShow(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/employee/leaves/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedData = initialData.filter((row) => row.id !== id);
        setInitialData(updatedData);
        setData(updatedData); // Perbarui data juga
        toast.success("Berhasil Dihapus!");
      } else {
        const errorResponse = await response.json();
        console.error("Failed to add new data:", errorResponse);
        toast.error(`Gagal menyimpan data! ${errorResponse.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan saat menyimpan data!");
    }
  };

  const handleSubmit = async () => {
    let updatedData;
    const token = localStorage.getItem("token");
    if (selectedRow) {
      // Edit existing data
      const requestData = {
        user_id: selectedRow.user_id,
        type: type,
        reasoning: keterangan,
        start_date: mulaicuti,
        end_date: berakhircuti,
      };

      console.log("Request data being sent to API for update:", requestData);

      try {
        const response = await fetch(
          `${API_URL}/api/employee/leaves/${selectedRow.id}`,
          {
            method: "PUT", // Use PUT or PATCH based on your API
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
          toast.success("Berhasil Diupdate!");
        } else {
          const errorResponse = await response.json();
          console.error("Failed to update data:", errorResponse);
          toast.error(`Gagal mengupdate data! ${errorResponse.message}`);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Terjadi kesalahan saat mengupdate data!");
      }
    } else {
      // Add new data
      const requestData = {
        type: type,
        reasoning: keterangan,
        start_date: mulaicuti,
        end_date: berakhircuti,
      };

      console.log("Request data being sent to API:", requestData);

      try {
        const response = await fetch(`${API_URL}/api/employee/leaves`, {
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
          toast.success("Berhasil Tersimpan!");
        } else {
          const errorResponse = await response.json();
          console.error("Failed to add new data:", errorResponse);
          toast.error(`Gagal menyimpan data! ${errorResponse.message}`);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Terjadi kesalahan saat menyimpan data!");
      }
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
      name: "Mulai Cuti",
      selector: (row) => row.start_date,
      sortable: true,
    },
    {
      name: "Berakhir Cuti",
      selector: (row) => row.end_date,
      sortable: true,
    },
    {
      name: "Keterangan",
      selector: (row) => row.reasoning,
      sortable: true,
    },
    {
      name: "Pertimbangan",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button
            onClick={() => handleDelete(row.id)}
            style={{
              background: "linear-gradient(135deg, #0CAD7F, #5AC9C3)",
              color: "white",
              border: "none",
              padding: "5px 6px",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "5px",
            }}
            hidden={row.status == "disetujui"}
          >
            Hapus
          </button>
          <button
            onClick={() => handleShow(row)}
            style={{
              background: "linear-gradient(135deg, #FFA726, #FF7043)",
              color: "white",
              border: "none",
              padding: "5px 6px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            hidden={row.status == "disetujui" || row.status == "ditolak"}
          >
            Edit
          </button>
        </>
      ),
    },
  ];

  const customStyle = {
    table: {
      style: {
        width: "100%", // Atur lebar tabel
        height: "140px", // Atur tinggi tabel jika diperlukan
      },
    },
    headRow: {
      style: {
        backgroundColor: "#f4f4f4", // Warna latar untuk header
      },
    },
    rows: {
      style: {
        fontSize: isMobile ? "10px" : "14px",
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

  return (
    <div>
      <button className="btn btn-plus" onClick={() => handleShow(null)}>
        <i className="bi bi-plus-circle-fill" style={{ color: "#004E5E" }}></i>
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
            <Form.Group controlId="formWaktuMasuk">
              <Form.Label>Mulai Cuti :</Form.Label>
              <Form.Control
                type="date"
                value={mulaicuti || ""}
                onChange={(e) => setMulaiCuti(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formWaktuKeluar">
              <Form.Label>Selesai Cuti :</Form.Label>
              <Form.Control
                type="date"
                value={berakhircuti || ""}
                onChange={(e) => setBerakhirCuti(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Tipe Cuti :</Form.Label>
              <Form.Control
                as="select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="sakit">Sakit</option>
                <option value="izin">Izin</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formKeterangan">
              <Form.Label>Keterangan :</Form.Label>
              <Form.Control
                as="input"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
              ></Form.Control>
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
        <i className="bi bi-filter"></i>
        FILTER
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
            <label>
              Tanggal:
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="YYYY-MM-DD"
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
          data={initialData}
          fixedHeader
          pagination
          customStyles={customStyle}
        />
      </div>
    </div>
  );
};

export default Cuti;
