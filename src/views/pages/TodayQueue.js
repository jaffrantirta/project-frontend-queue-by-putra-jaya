import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Table,
    Container,
    Row,
    Button,
    FormGroup,
    Input,
    InputGroup,
  } from "reactstrap";
  
  import Header from "components/Headers/Header.js";
  import axios from 'axios';
  import React, { Component } from "react";
  import Swal from 'sweetalert2';
  import { baseURL } from "../../utils/BaseUrl.js";
  import NumberFormat from 'react-number-format';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import {Modal} from 'react-bootstrap';
  import ReactPaginate from 'react-paginate';
  import "../../assets/css/pagination-style.css";
  import Moment from 'moment';

    const buttonStyle = {
        fontSize: 25,
        padding: 10,
        marginBottom: 10,
    };
    const fontSize = {
        fontSize: 10
    };
    const queue_size = {
        fontSize: 50
    };

    export default class javascriptMap extends Component {
        constructor(props){
            super(props)
            this.state = {
                datas: [],
                detail_queue_modal: false,
                offset: 0,
                data: [],
                perPage: 0,
                currentPage: 0,
                page: "",
                total: 0,
                id: "",
                order_number: "",
                customer_name: "",
                license_plate: "",
                car_type_name: "",
                car_type_price: 0,
                other_product_name: "",
                other_product_price: 0,
                product_name: "",
                product_price: 0,
                date: "",
                time: "",
                status: "",
            };
            this.handlePageClick = this.handlePageClick.bind(this);
        }
        clearState(){
            const initialState = {
                id: "",
                order_number: "",
                customer_name: "",
                license_plate: "",
                car_type_name: "",
                car_type_price: 0,
                other_product_name: "",
                other_product_price: 0,
                product_name: "",
                product_price: 0,
                date: "",
                time: "",
                status: "",
              };
              this.setState({ ...initialState });
        }

        close(){
            this.setState({detail_queue_modal: false});
            this.clearState();
        }

        handlePageClick = (e) => {
            const selectedPage = e.selected;
            const offset = selectedPage * this.state.perPage;
            var x = parseInt(selectedPage) + 1;
    
            this.setState({
                currentPage: selectedPage,
                offset: offset,
                page: "?page="+x
            }, () => {
                this.getData()
            });
    
        };
        getData(){
            // console.log(this.state.page);
            Swal.fire({
                title: 'Memuat',
                allowOutsideClick: false,
                showConfirmButton: false
            })
            axios.get(baseURL+'api/queue'+this.state.page, {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('data')).token
                }
            })
            .then(response => {
                // console.log(JSON.stringify(response.data));
                var all_data = JSON.stringify(response.data);
                var data_json = JSON.parse(all_data);
                this.setState({
                    pageCount: Math.ceil(data_json.total / data_json.per_page),
                    perPage: data_json.per_page,
                    datas: response.data['data'],
                    total: response.data['total'],
                })
                Swal.close()
            })
            .catch(error => {
                // console.log(error)
                Swal.close()
                Swal.fire({
                    title: 'Oops! Sepertinya ada yang salah',
                    text: error,
                    icon: 'error'
                  })
            })
        }
        componentDidMount(){
            this.getData()
        }
        confirmDelete(name, id){
            Swal.fire({
                title: 'Yakin Menghapus "'+name+'" ?',
                showCancelButton: true,
                confirmButtonColor: '#ff2a00',
                confirmButtonText: 'Ya, Hapus'
            }).then((result) => {
                if (result.isConfirmed) {
                  this.deleteData(name, id)
                }
            })
        }
        showMore(id, queue){
            Swal.fire({
                title: 'Mengambil Data',
                allowOutsideClick: false,
                showConfirmButton: false
            })
            
            axios.get(baseURL+'api/order?id='+id, {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('data')).token
                }
            })
            .then(response => {
                // console.log(JSON.stringify(response.data));
                var string = JSON.stringify(response.data);
                var res = JSON.parse(string);
                Swal.close();
                if(res['data']['description'] == null){
                    var desc = "";
                }else{
                    var desc = res['data']['description'];
                }
                this.setState({
                    queue: queue,
                    status: response.data['data']['status']['name'],
                    order_number: response.data['data']['order']['order_number'],
                    customer_name: response.data['data']['order']['customer_name'],
                    license_plate: response.data['data']['order']['license_plate'],
                    car_type_name: response.data['data']['order']['car_type_name'],
                    car_type_price: response.data['data']['order']['car_type_price'],
                    product_name: response.data['data']['order']['product_name'],
                    product_price: response.data['data']['order']['product_price'],
                    other_product_name: response.data['data']['order']['other_product_name'],
                    other_product_price: response.data['data']['order']['other_product_price'],
                    grand_total: response.data['data']['order']['grand_total'],
                    date: Moment(response.data['data']['order']['created_at']).format('D MMM YYYY'),
                    time: Moment(response.data['data']['order']['created_at']).format('LT'),
                    detail_queue_modal: true,
                });
            })
            .catch(error => {
                // console.log(error.response.data.response.message.indonesia)
                Swal.fire({
                    title: 'Oops! Sepertinya ada yang salah',
                    icon: 'error'
                })
            })
        }
        callQueue(){
            Swal.fire({
                icon: 'warning',
                title: 'Panggil antrian selanjutnya ?',
                confirmButtonColor: '#ff2a00',
                confirmButtonText: 'Panggil',
                showCancelButton: true,
                cancelButtonText: 'Batal',
            }).then((result) => {
                if (result.isConfirmed) {
                  this.callNow()
                }
            })
        }
        callNow(){
            Swal.fire({
                title: 'Memanggil',
                allowOutsideClick: false,
                showConfirmButton: false
            })
            
            axios.get(baseURL+'api/queue/call', {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('data')).token
                }
            })
            .then(response => {
                console.log(JSON.stringify(response.data));
                var string = JSON.stringify(response.data);
                var res = JSON.parse(string);
                Swal.fire({
                    icon: 'success',
                    title: 'Nomor antrian '+res.data.code+res.data.number+' dipanggil',
                }).then((result) => {
                    if (result.isConfirmed) {
                      this.getData()
                    }
                })
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    title: 'Oops! Sepertinya ada yang salah',
                    icon: 'error'
                })
            })
        }
        render() {
            return (
                <>
                <Header />
                <Container className="mt--7" fluid>
                    <Button
                        className="col-12 btn-lg"
                        style={buttonStyle}
                        color="danger"
                        onClick={this.callQueue.bind(this)}
                    >
                        Panggil Antrian
                    </Button>

                    <Modal show={this.state.detail_queue_modal} centered>
                        <Modal.Header>
                            <Modal.Title>Detail Pesanan</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                                <div className="row">
                                    <div className="col-12 text-center">
                                        <small>nomor antrian anda</small>
                                        <h1 style={queue_size}>{this.state.queue}</h1>
                                    </div>
                                    <div className="col-12">
                                        <strong>Detail pesanan</strong>
                                    </div>
                                    <div className="col-12" style={fontSize}>
                                        <div class="row col-sm">
                                            <div class="col-sm col-6">
                                                Nomor pesanan
                                            </div>
                                            <div class="col-sm text-right col-6">
                                                {this.state.order_number}
                                            </div>
                                        </div>

                                        <div class="row col-sm">
                                            <div class="col-sm col-6">
                                                Status
                                            </div>
                                            <div class="col-sm text-right col-6">
                                                {this.state.status}
                                            </div>
                                        </div>

                                        <div class="row col-sm">
                                            <div class="col-sm col-6">
                                                Waktu
                                            </div>
                                            <div class="col-sm text-right col-6">
                                                {this.state.time}
                                            </div>
                                        </div>

                                        <div class="row col-sm">
                                            <div class="col-sm col-6">
                                                Tanggal
                                            </div>
                                            <div class="col-sm text-right col-6">
                                                {this.state.date}
                                            </div>
                                        </div>

                                        <div class="row col-sm">
                                            <div class="col-sm col-6">
                                                Nama pelanggan
                                            </div>
                                            <div class="col-sm text-right col-6">
                                                {this.state.customer_name}
                                            </div>
                                        </div>

                                        <div class="row col-sm">
                                            <div class="col-sm col-6">
                                                Plat kendaraan
                                            </div>
                                            <div class="col-sm text-right col-6">
                                                {this.state.license_plate}
                                            </div>
                                        </div>

                                        <div class="row col-sm">
                                            <div class="col-sm col-6">
                                                Tipe kendaraan : {this.state.car_type_name}            
                                            </div>
                                            <div class="col-sm text-right col-6">
                                                <NumberFormat 
                                                    thousandSeparator="thousand" 
                                                    value={this.state.car_type_price}
                                                    prefix="Rp"
                                                    displayType="text"
                                                    decimalSeparator="."
                                                    thousandSeparator={true}
                                                    allowNegative={true} />
                                            </div>
                                        </div>

                                        <div class="row col-sm">
                                            <div class="col-sm col-6">
                                                Produk : {this.state.product_name}
                                            </div>
                                            <div class="col-sm text-right col-6">
                                                <NumberFormat 
                                                    thousandSeparator="thousand" 
                                                    value={this.state.product_price}
                                                    prefix="Rp"
                                                    displayType="text"
                                                    decimalSeparator="."
                                                    thousandSeparator={true}
                                                    allowNegative={true} />
                                            </div>
                                        </div>

                                        <div class="row col-sm">
                                            <div class="col-sm col-6">
                                                Produk tambahan : {this.state.other_product_name}
                                            </div>
                                            <div class="col-sm text-right col-6">
                                                <NumberFormat 
                                                    thousandSeparator="thousand" 
                                                    value={this.state.other_product_price}
                                                    prefix="Rp"
                                                    displayType="text"
                                                    decimalSeparator="."
                                                    thousandSeparator={true}
                                                    allowNegative={true} />
                                            </div>
                                        </div>

                                        <div class="row col-sm">
                                            <div class="col-sm col-6">
                                                <b>Jumlah total</b>
                                            </div>
                                            <div class="col-sm text-right col-6">
                                                <b>
                                                <NumberFormat 
                                                    thousandSeparator="thousand" 
                                                    value={this.state.grand_total}
                                                    prefix="Rp"
                                                    displayType="text"
                                                    decimalSeparator="."
                                                    thousandSeparator={true}
                                                    allowNegative={true} />
                                                </b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center">
                                        <small>Terimakasih memesan</small><br></br>
                                        <small>~ powered by <a href="https://franweb.my.id">franweb.my.id ~</a></small>
                                    </div>
                                </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close.bind(this)}>Tutup</Button>
                        </Modal.Footer>
                    </Modal>



                    <Row>
                    <div className="col">
                        <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">{this.state.total} Antrian Hari Ini</h3>
                        </CardHeader>
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">No. Antrian</th>
                                    <th scope="col">Nama Pelanggan</th>
                                    <th scope="col">No. Plat Kendaraan</th>
                                    <th scope="col">Waktu Daftar</th>
                                    <th scope="col" />
                                </tr>
                            </thead>
                            <tbody>
                                    {this.state.datas.map(d => (
                                        <tr>
                                            <th scope="row">
                                            <Media className="align-items-center">
                                                <Media>
                                                <span className="mb-0 text-sm">
                                                    {d.code+d.number}
                                                </span>
                                                </Media>
                                            </Media>
                                            </th>
                                            <td>
                                                {d.customer_name}
                                            </td>
                                            <td>
                                                {d.license_plate}
                                            </td>
                                            <td>
                                                {Moment(d.created_at).format('LT')}
                                            </td>
                                            <td className="text-right">
                                            <UncontrolledDropdown>
                                                <DropdownToggle
                                                    className="btn-dark text-light"
                                                    role="button"
                                                    size="md"
                                                    color=""
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                <i className="fas fa-ellipsis-v" />
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    onClick={(e) => this.showMore(d.order_id, d.code+d.number)}
                                                >
                                                    Lihat detail
                                                </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            </td>
                                        </tr>
                                    ))}
                                    
                            </tbody>
                        </Table>
                        <CardFooter className="py-4">
                            <nav aria-label="...">
                            <ReactPaginate
                                    previousLabel={"prev"}
                                    nextLabel={"next"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={this.state.pageCount}
                                    marginPagesDisplayed={1}
                                    pageRangeDisplayed={2}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={"justify-content-center pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"}/>
                            </nav>
                        </CardFooter>
                        </Card>
                    </div>
                    </Row>
                    
                </Container>
                </>
            );
        }
    }