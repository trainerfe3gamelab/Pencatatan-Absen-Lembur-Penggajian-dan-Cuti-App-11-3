import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Excel from '../../image/Excel.png';
import Pdf from '../../image/PDF.png';
import SearchBox from '../../components/search/SearchBox';
import Pagination from '../../components/pagination/pagination';

function MyVerticallyCenteredModal(props) {
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
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
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
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Tambah
                </Button>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />

                <div className=''>
                    <Button variant="primary" className="text-white me-2" style={{ borderRadius: '15px', height: '30px' }} onClick={() => setModalShow(true)}>
                        <i className="bi bi-funnel-fill" aria-hidden="true"></i> Filter
                    </Button>
                    <Button variant="danger" className="text-white me-2" style={{ borderRadius: '15px', height: '30px',backgroundColor: '#D4FF78' }} onClick={printTable}>
                    <img src={Pdf} alt=""  width={18}/>
                    </Button>
                    <Button variant='success' className="text-success" style={{ borderRadius: '15px', height: '30px',backgroundColor: '#78FFD6'}} onClick={exportToExcel}>
                        <img src={Excel} alt=""  width={18}/>
                    </Button>
                    <SearchBox />
                </div>
            </div>
            <div className='tableFixHead bg-white border rounded-4'>
                <Table responsive>
                    <thead className='text-center tableFixHeadth'>
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
                                <Button variant="info"><i class="bi bi-pencil-fill text-white"></i></Button>{' '}
                                <Button variant="danger"><i class="bi bi-trash3-fill"></i></Button>
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
                                <Button variant="info"><i class="bi bi-pencil-fill text-white"></i></Button>{' '}
                                <Button variant="danger"><i class="bi bi-trash3-fill"></i></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>
                                <Button variant="info"><i class="bi bi-pencil-fill text-white"></i></Button>{' '}
                                <Button variant="danger"><i class="bi bi-trash3-fill"></i></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>
                                <Button variant="info"><i class="bi bi-pencil-fill text-white"></i></Button>{' '}
                                <Button variant="danger"><i class="bi bi-trash3-fill"></i></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>
                                <Button variant="info"><i class="bi bi-pencil-fill text-white"></i></Button>{' '}
                                <Button variant="danger"><i class="bi bi-trash3-fill"></i></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>
                                <Button variant="info"><i class="bi bi-pencil-fill text-white"></i></Button>{' '}
                                <Button variant="danger"><i class="bi bi-trash3-fill"></i></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>
                                <Button variant="info"><i class="bi bi-pencil-fill text-white"></i></Button>{' '}
                                <Button variant="danger"><i class="bi bi-trash3-fill"></i></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>
                                <Button variant="info"><i class="bi bi-pencil-fill text-white"></i></Button>{' '}
                                <Button variant="danger"><i class="bi bi-trash3-fill"></i></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>
                                <Button variant="info"><i class="bi bi-pencil-fill text-white"></i></Button>{' '}
                                <Button variant="danger"><i class="bi bi-trash3-fill"></i></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>
                                <Button variant="info"><i class="bi bi-pencil-fill text-white"></i></Button>{' '}
                                <Button variant="danger"><i class="bi bi-trash3-fill"></i></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>
                                <Button variant="info"><i class="bi bi-pencil-fill text-white"></i></Button>{' '}
                                <Button variant="danger"><i class="bi bi-trash3-fill"></i></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>
                                <Button variant="info"><i class="bi bi-pencil-fill text-white"></i></Button>{' '}
                                <Button variant="danger"><i class="bi bi-trash3-fill"></i></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>
                                <Button variant="info"><i class="bi bi-pencil-fill text-white"></i></Button>{' '}
                                <Button variant="danger"><i class="bi bi-trash3-fill"></i></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>
                                <Button variant="info"><i class="bi bi-pencil-fill text-white"></i></Button>{' '}
                                <Button variant="danger"><i class="bi bi-trash3-fill"></i></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>
                                <Button variant="info"><i class="bi bi-pencil-fill text-white"></i></Button>{' '}
                                <Button variant="danger"><i class="bi bi-trash3-fill"></i></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>
                                <Button variant="info"><i class="bi bi-pencil-fill text-white"></i></Button>{' '}
                                <Button variant="danger"><i class="bi bi-trash3-fill"></i></Button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td>
                                <Button variant="info"><i class="bi bi-pencil-fill text-white"></i></Button>{' '}
                                <Button variant="danger"><i class="bi bi-trash3-fill"></i></Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className='d-flex justify-content-between mt-3'>
                <p>menampilkan <b>0</b> entris</p>
                <Pagination/>
            </div>
        </div>
    );
}

export default Pegawai;
