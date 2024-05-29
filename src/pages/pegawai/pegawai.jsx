import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Excel from '../../image/Excel.png';
import Pdf from '../../image/PDF.png';
import SearchBox from '../../components/search/SearchBox';
import Pagination from '../../components/pagination/pagination'; // Pastikan nama komponen dan jalur impor benar
import FormInput from '../../components/form/FormInput'; // Pastikan nama komponen dan jalur impor benar








function MyVerticallyCenteredModal(props) {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };











  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <Button type="submit">Submit</Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}










const Pegawai = () => {
  const [modalShow, setModalShow] = useState(false);

  const printTable = () => {
    // Implement your print table logic here
  };

  const exportToExcel = () => {
    // Implement your export to excel logic here
  };

  return (
    <div className='container'>
      <h1 className='mt-3 mb-3'><b>Pegawai</b></h1>
      <div className='d-flex justify-content-between mb-4 mt-5'>
        <Button variant="primary" className="text-white me-2" style={{ borderRadius: '15px', height: '30px', backgroundColor: '#18C89E' }} onClick={() => setModalShow(true)}>
          <i className="bi bi-plus-circle-fill" aria-hidden="true"></i> Tambah
        </Button>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />

        <div className=''>
          <Button variant="primary" className="text-white me-2" style={{ borderRadius: '15px', height: '30px', backgroundColor: '#18C89E' }}>
            <i className="bi bi-funnel-fill" aria-hidden="true"></i> Filter
          </Button>
          <Button variant="danger" className="text-white me-2" style={{ borderRadius: '15px', height: '30px' }} onClick={printTable}>
            <img src={Pdf} alt="" width={18} />
          </Button>
          <Button variant='success' className="text-white" style={{ borderRadius: '15px', height: '30px' }} onClick={exportToExcel}>
            <img src={Excel} alt="" width={18} />
          </Button>
          <SearchBox />
        </div>
      </div>
      <div className='tableFixHead bg-white border rounded-4'>
        <Table responsive className=''>
          <thead className='text-center'>
            <tr>
              <th>#</th>
              <th>Nama</th>
              <th>Jenis Kelamin</th>
              <th>Jabatan</th>
              <th>Nomor Tlpn</th>
              <th>Alamat</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>
                <Button variant="info" className="me-2"><i className="bi bi-pencil-fill text-white"></i></Button>
                <Button variant="danger"><i className="bi bi-trash3-fill"></i></Button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@fat</td>
              <td>@fat</td>
              <td>@fat</td>
              <td>@fat</td>
              <td>@fat</td>
              <td>
                <Button variant="info" className="me-2"><i className="bi bi-pencil-fill text-white"></i></Button>
                <Button variant="danger"><i className="bi bi-trash3-fill"></i></Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className='d-flex justify-content-between mt-3'>
        <p>menampilkan <b>0</b> entris</p>
        <Pagination />
      </div>
    </div>
  );
}

export default Pegawai;
