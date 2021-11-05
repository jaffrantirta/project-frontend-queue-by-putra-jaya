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
                statuses: [],
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
                param_status_id: "",
                title_act: "Hari ini ",
                title_status_name: "On Service",
                action: "today",
                btn_today: "primary",
                btn_yesterday: "secondary",
                btn_all: "secondary",
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
            Swal.fire({
                title: 'Memuat',
                allowOutsideClick: false,
                showConfirmButton: false
            })
            if(this.state.action === 'today'){
                var route = 'api/order/today';
            }else if(this.state.action === 'yesterday'){
                var route = 'api/order/yesterday';
            }else{
                var route = 'api/order';
            }
            var status_param = '';
            if(this.state.param_status_id !== ''){
                if(this.state.page === ''){
                    status_param = '?status_id='+this.state.param_status_id;
                }else{
                    status_param = '&status_id='+this.state.param_status_id;
                }
            }
            axios.get(baseURL+route+this.state.page+status_param, {
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
                this.getStatus();
            })
            .catch(error => {
                // console.log(error)
                Swal.close()
                Swal.fire({
                    title: 'Oops! Sepertinya ada yang salah',
                    icon: 'error'
                  })
            })
        }
        getStatus(){
            axios.get(baseURL+'api/status', {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('data')).token
                }
            })
            .then(response => {
                // console.log(JSON.stringify(response.data));
                var all_data = JSON.stringify(response.data);
                var data_json = JSON.parse(all_data);
                this.setState({
                    statuses: response.data,
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
            this.change('today');
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
        update_status(order_id){
            Swal.fire({
                title: 'Yakin update pesanan ini ?',
                text: 'Status pesanan ini akan di-update ke status selanjutnya',
                showCancelButton: true,
                confirmButtonText: 'Update',
            }).then((res) => {
                if(res.isConfirmed){
                    Swal.fire({
                        title: 'Mengubah Status',
                        allowOutsideClick: false,
                        showConfirmButton: false
                    })
                    const formData = new FormData();
                    formData.append('order_id', order_id);
                    axios.post(baseURL+'api/order/update/status', formData, {
                        headers: {
                            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('data')).token
                        }
                    })
                    .then(response => {
                        // console.log(JSON.stringify(response.data));
                        Swal.fire({
                            title: 'Status di perbaharui',
                            icon: 'success'
                        })
                        this.getData();
                    })
                    .catch(error => {
                        // console.log(error.response.data.response.message.indonesia)
                        Swal.fire({
                            title: 'Oops! Sepertinya ada yang salah',
                            icon: 'error'
                        })
                    })
                }
            });
        }
        change(action_selected){
            if(action_selected === 'today'){
                var act = 'Hari ini ';
                var today = 'primary';
                var yesterday = 'secondary';
                var all = 'secondary';
            }else if(action_selected === 'yesterday'){
                var act = 'Kemarin ';
                var today = 'secondary';
                var yesterday = 'primary';
                var all = 'secondary';
            }else{
                var today = 'secondary';
                var yesterday = 'secondary';
                var all = 'primary';
                var act = 'Semua ';
            }
            this.setState({
                btn_today: today,
                btn_yesterday: yesterday,
                btn_all: all,
                title_act: act,
                action: action_selected
            }, () => {
                this.getData()
            });
        }
        changeStatus(status_id, status_name){
            this.setState({
                param_status_id: status_id,
                title_status_name: status_name,
            }, () => {
                this.getData()
            });
        }
        render() {
            return (
                <>
                <Header />
                <Container className="mt--7" fluid>

                    <Row>
                        <Button
                            className="col-3 btn-sm"
                            style={buttonStyle}
                            color={this.state.btn_today}
                            onClick={() => this.change('today')}
                        >
                            Hari ini
                        </Button>

                        <Button
                            className="col-3 btn-sm"
                            style={buttonStyle}
                            color={this.state.btn_yesterday}
                            onClick={() => this.change('yesterday')}
                        >
                            Kemarin
                        </Button>

                        <Button
                            className="col-3 btn-sm"
                            style={buttonStyle}
                            color={this.state.btn_all}
                            onClick={() => this.change('all')}
                        >
                            Semua
                        </Button>
                    </Row>

                    <Row>
                        {this.state.statuses.map(status => (
                            <Button
                                className="col-3 btn-sm btn-secondary"
                                style={buttonStyle}
                                onClick={() => this.changeStatus(status.id, status.name)}
                            >
                                {status.name}   
                            </Button>
                        ))}
                    </Row>


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
                            <h3 className="mb-0">{this.state.title_act+this.state.total} Pesanan {this.state.title_status_name}</h3>
                        </CardHeader>
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">No. Antrian</th>
                                    <th scope="col">Nama Pelanggan</th>
                                    <th scope="col">No. Plat Kendaraan</th>
                                    <th scope="col">Tanggal/Waktu Daftar</th>
                                    <th scope="col" />
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
                                                {Moment(d.created_at).format('D MMM YYYY LT')}
                                            </td>
                                            <td>
                                                <button className="btn btn-danger" onClick={(e) => this.update_status(d.order_id)}>Update Status</button>
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