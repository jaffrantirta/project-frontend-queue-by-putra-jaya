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
  import { baseURL } from "../../utils/BaseUrl.js.js";
  import NumberFormat from 'react-number-format';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import {Modal} from 'react-bootstrap';
  import ReactPaginate from 'react-paginate';
  import "../../assets/css/pagination-style.css";
  import "../../assets/css/order-style.css";
  import "../../assets/css/invoice-style.css";
  import DropdownButton from 'react-bootstrap/DropdownButton';
  import Dropdown from 'react-bootstrap/Dropdown';
  import Moment from 'moment';
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
                car_types: [],
                group_products: [],
                products: [],
                grand_total: 0,
                part_1_modal: false,
                part_2_modal: false,
                part_3_modal: false,
                part_4_modal: false,
                part_5_modal: false,
                part_6_modal: false,
                part_7_modal: false,
                order_number: "",
                customer_name: "",
                license_plate: "",
                car_type_id: "",
                car_type_name: "",
                car_type_price: 0,
                group_product_id: "",
                group_product_name: "",
                other_product_name: "",
                other_product_price: 0,
                product_id: "",
                product_name: "",
                product_price: 0,
                date: "",
                time: "",
                button_title_part_5_modal: "Lewati & Cek Total Harga",
            };
        }
        clearState(){
            const initialState = {
                grand_total: 0,
                part_1_modal: false,
                part_2_modal: false,
                part_3_modal: false,
                part_4_modal: false,
                part_5_modal: false,
                part_6_modal: false,
                part_7_modal: false,
                order_number: "",
                customer_name: "",
                license_plate: "",
                car_type_id: "",
                car_type_name: "",
                car_type_price: 0,
                group_product_id: "",
                group_product_name: "",
                other_product_name: "",
                other_product_price: 0,
                product_id: "",
                product_name: "",
                product_price: 0,
                date: "",
                time: "",
                button_title_part_5_modal: "Lewati & Cek Total Harga",
              };
              this.setState({ ...initialState });
        }
        getData(){
            // console.log(this.state.page);
            Swal.fire({
                title: 'Memuat',
                allowOutsideClick: false,
                showConfirmButton: false
            })
            axios.get(baseURL+'api/order/preload', {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('data')).token
                }
            })
            .then(response => {
                // console.log(JSON.stringify(response.data['data']));
                this.setState({
                    group_products: response.data['data']['group_products'],
                    car_types: response.data['data']['car_types'],
                })
                Swal.close()
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
        componentDidMount(){
            this.getData()
        }
        insertData(){
            if(this.state.name === ""){
                Swal.fire('Nama Tidak Boleh Kosong')
            }else if(this.state.price === ""){
                Swal.fire('Harga Tidak Boleh Kosong')
            }else if(this.state.group_product_id === ""){
                Swal.fire('Grup Produk Harus Dipilih')
            }else{
                Swal.fire({
                    title: 'Menambahkan Produk',
                    allowOutsideClick: false,
                    showConfirmButton: false
                })
                const formData = new FormData();
                formData.append('name', this.state.name);
                formData.append('price', this.state.price);
                formData.append('group_product_id', this.state.group_product_id);
                axios.post(baseURL+'api/product/add', formData, {
                    headers: {
                        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('data')).token
                    }
                })
                .then(response => {
                    // console.log(JSON.stringify(response.data['data']));
                    this.setState({add_modal_show:false})
                    Swal.fire({
                        title: response.data['response']['message']['indonesia'],
                        icon: 'success'
                    })
                    this.clearState()
                    this.getData()
                    
                })
                .catch(error => {
                    // console.log(error.response.data.response.message.indonesia)
                    Swal.fire({
                        title: 'Oops! Sepertinya ada yang salah',
                        text: error.response.data.response.message.indonesia,
                        icon: 'error'
                    })
                })
            }
        }
        getProduct(gp_id, gp_name){
            console.log(gp_id+" and "+gp_name);
            this.setState({
                group_product_id: gp_id,
                group_product_name: gp_name,
            })
            Swal.fire({
                title: 'Memuat',
                allowOutsideClick: false,
                showConfirmButton: false
            })
            axios.get(baseURL+'api/product?group='+gp_id, {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('data')).token
                }
            })
            .then(response => {
                // console.log(JSON.stringify(response.data['data']));
                if(response.data['data'].length > 0){
                    this.setState({
                        products: response.data['data'],
                        part_3_modal: false,
                        part_4_modal: true,
                    })
                    Swal.close()
                }else{
                    Swal.fire({
                        title: 'Tidak ada produk di grup ini',
                        icon: 'warning'
                    })
                }
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
        checkCustomerIdentity(){
            if(this.state.customer_name === ""){
                Swal.fire('Nama Konsumen Tidak Boleh Kosong')
            }else if(this.state.license_plate === ""){
                Swal.fire('Play Nomor Polisi Kendaraan Tidak Boleh Kosong')
            }else{
                this.setState({part_1_modal: false, part_2_modal: true})
            }
        }
        checkGrandTotal(){
            if(this.state.customer_name === ""){
                Swal.fire('Nama Konsumen Tidak Boleh Kosong')
            }else if(this.state.license_plate === ""){
                Swal.fire('Play Nomor Polisi Kendaraan Tidak Boleh Kosong')
            }else if(this.state.car_type_id === ""){
                Swal.fire('Tipe Kendaraan Harus Dipilih')
            }else{
                Swal.fire({
                    title: 'Menghitung Jumlah Total',
                    allowOutsideClick: false,
                    showConfirmButton: false
                })
                const formData = new FormData();
                formData.append('customer_name', this.state.customer_name);
                formData.append('license_plate', this.state.license_plate);
                formData.append('car_type_id', this.state.car_type_id);
                formData.append('product_id', this.state.product_id);
                if(this.state.other_product_name === ""){
                    formData.append('other_product_name', '- tidak ada produk tambahan -');
                }else{
                    formData.append('other_product_name', this.state.other_product_name);
                }
                formData.append('other_product_price', this.state.other_product_price);
                axios.post(baseURL+'api/order/check', formData, {
                    headers: {
                        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('data')).token
                    }
                })
                .then(response => {
                    // console.log(JSON.stringify(response.data['data']));
                    this.setState({
                        car_type_name: response.data['data']['car_type']['name'],
                        car_type_price: response.data['data']['car_type']['price'],
                        product_name: response.data['data']['product']['name'],
                        product_price: response.data['data']['product']['price'],
                        other_product_name: response.data['data']['other_product']['other_product_name'],
                        other_product_price: response.data['data']['other_product']['other_product_price'],
                        grand_total: response.data['data']['grand_total'],
                        part_5_modal: false,
                        part_6_modal: true,
                    })
                    Swal.close()
                })
                .catch(error => {
                    console.log(error)
                    Swal.close()
                    Swal.fire({
                        title: 'Oops! Sepertinya ada yang salah',
                        icon: 'error'
                      })
                })
            }
        }
        checkoutOrder(){
            if(this.state.customer_name === ""){
                Swal.fire('Nama Konsumen Tidak Boleh Kosong')
            }else if(this.state.license_plate === ""){
                Swal.fire('Play Nomor Polisi Kendaraan Tidak Boleh Kosong')
            }else if(this.state.car_type_id === ""){
                Swal.fire('Tipe Kendaraan Harus Dipilih')
            }else{
                Swal.fire({
                    title: 'Membuat Pesanan',
                    allowOutsideClick: false,
                    showConfirmButton: false
                })
                const formData = new FormData();
                formData.append('customer_name', this.state.customer_name);
                formData.append('license_plate', this.state.license_plate);
                formData.append('car_type_id', this.state.car_type_id);
                formData.append('product_id', this.state.product_id);
                if(this.state.other_product_name === ""){
                    formData.append('other_product_name', '- tidak ada produk tambahan -');
                }else{
                    formData.append('other_product_name', this.state.other_product_name);
                }
                formData.append('other_product_price', this.state.other_product_price);
                axios.post(baseURL+'api/order/checkout', formData, {
                    headers: {
                        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('data')).token
                    }
                })
                .then(response => {
                    // console.log(JSON.stringify(response.data['data']['shop']));
                    this.setState({
                        queue: response.data['data']['queue']['code'] + response.data['data']['queue']['number'],
                        shop_name: response.data['data']['shop']['shop']['name'],
                        shop_address: response.data['data']['shop']['shop']['address'],
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
                        part_6_modal: false,
                        part_7_modal: true,
                    })
                    Swal.close()
                })
                .catch(error => {
                    console.log(error)
                    Swal.close()
                    Swal.fire({
                        title: 'Oops! Sepertinya ada yang salah',
                        icon: 'error'
                      })
                })
            }
        }
        part_5_modal_change_text_name(name_product_opt){
            this.setState({other_product_name: name_product_opt});
            if(this.state.other_product_name === "" || this.state.other_product_price === ""){
                this.setState({button_title_part_5_modal: "Lewati & Cek Total Harga"})
            }else{
                this.setState({button_title_part_5_modal: "Lewati & Cek Total Harga"})
            }
        }
        part_5_modal_change_text_price(price_product_opt){
            this.setState({other_product_price: price_product_opt});
            if(this.state.other_product_name === "" || this.state.other_product_price === ""){
                this.setState({button_title_part_5_modal: "Cek Total Harga"})
            }else{
                this.setState({button_title_part_5_modal: "Cek Total Harga"})
            }
        }
        done(){
            this.setState({part_7_modal: false});
            this.clearState();
        }
        render() {
            if(localStorage.getItem('on_serve')){

            }else{
                return(
                    <>
                    <Modal show={this.state.part_1_modal} onHide={() => this.setState({part_1_modal: false})} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Masukan Identitas Pelanggan</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                    <Input
                                        placeholder="Nama Pelanggan"
                                        type="text"
                                        value={this.state.customer_name}
                                        onChange={(e) => this.setState({customer_name: e.target.value})}
                                    />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                    <Input
                                        placeholder="Nomor Plat Kendaraan"
                                        type="text"
                                        value={this.state.license_plate}
                                        onChange={(e) => this.setState({license_plate: e.target.value})}
                                    />
                                    </InputGroup>
                                </FormGroup>
                                <div className="text-center">
                                    <button onClick={this.checkCustomerIdentity.bind(this)} className="btn btn-primary">Selanjutnya</button>
                                </div>
                        </Modal.Body>
                    </Modal>


                    <Modal show={this.state.part_2_modal} centered>
                        <Modal.Header>
                            <Modal.Title><button onClick={() => this.setState({part_2_modal: false, part_1_modal: true})} className="btn btn-primary rounded-circle"><i className="fas fa-arrow-circle-left"></i></button> Pilih Tipe Kendaraan</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                                
                                    {this.state.car_types.map(car_type => (
                                        <FormGroup className="mb-3">
                                            <button className="btn btn-primary btn-lg btn-block" onClick={() => this.setState({
                                                car_type_id: car_type.id,
                                                car_type_name: car_type.name,
                                                part_2_modal: false,
                                                part_3_modal: true,
                                            })}>{car_type.name}</button>
                                        </FormGroup>
                                        ) )}
                        </Modal.Body>
                    </Modal>

                    <Modal show={this.state.part_3_modal} onHide={() => this.setState({part_3_modal: false})} centered>
                        <Modal.Header>
                            <Modal.Title><button onClick={() => this.setState({part_3_modal: false, part_2_modal: true})} className="btn btn-primary rounded-circle"><i className="fas fa-arrow-circle-left"></i></button> Pilih Layanan</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                                
                                    {this.state.group_products.map(group_product => (
                                        <FormGroup className="mb-3">
                                            <button className="btn btn-primary btn-lg btn-block" onClick={() => this.getProduct(group_product.id, group_product.name)}>{group_product.name}</button>
                                        </FormGroup>
                                    ) )}
                                
                                <FormGroup className="mb-3">
                                    <button onClick={() => this.setState({part_5_modal: true, part_3_modal: false})} className="btn btn-primary btn-lg btn-block">Lewati Produk</button>
                                </FormGroup>
                        </Modal.Body>
                    </Modal>

                    <Modal show={this.state.part_4_modal} onHide={() => this.setState({part_4_modal: false})} centered>
                        <Modal.Header>
                            <Modal.Title><button onClick={() => this.setState({part_4_modal: false, part_3_modal: true})} className="btn btn-primary rounded-circle"><i className="fas fa-arrow-circle-left"></i></button> Pilih Produk</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                                
                                    {this.state.products.map(product => (
                                        <FormGroup className="mb-3">
                                        <button onClick={() => this.setState({part_5_modal: true, part_4_modal: false, product_id: product.id, product_name: product.name})} className="btn btn-primary btn-lg btn-block">{product.name}</button>
                                        </FormGroup>
                                    ) )}
                                
                        </Modal.Body>
                    </Modal>

                    <Modal show={this.state.part_5_modal} centered>
                        <Modal.Header>
                            <Modal.Title><button onClick={() => this.setState({part_5_modal: false, part_3_modal: true})} className="btn btn-primary rounded-circle"><i className="fas fa-arrow-circle-left"></i></button> Masukan Produk Tambahan (optional)</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                    <Input
                                        placeholder="Nama Produk Tambahan"
                                        type="text"
                                        value={this.state.other_product_name}
                                        onChange={(e) => this.part_5_modal_change_text_name(e.target.value)}
                                    />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                    <Input
                                        placeholder="Harga Produk Tambahan"
                                        type="number"
                                        value={this.state.other_product_price}
                                        onChange={(e) => this.part_5_modal_change_text_price(e.target.value)}
                                    />
                                    </InputGroup>
                                </FormGroup>
                                <div className="text-center">
                                    <button onClick={this.checkGrandTotal.bind(this)} className="btn btn-primary">{this.state.button_title_part_5_modal}</button>
                                </div>
                        </Modal.Body>
                    </Modal>

                    <Modal size="lg" className="modal fade bd-example-modal-lg" show={this.state.part_6_modal} centered>
                        <Modal.Header>
                            <Modal.Title><button onClick={() => this.setState({part_6_modal: false, part_5_modal: true})} className="btn btn-primary rounded-circle"><i className="fas fa-arrow-circle-left"></i></button> Total Layanan</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Layanan Dipilih</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>{this.state.car_type_name}</td>
                                        <td>
                                            <NumberFormat 
                                                thousandSeparator="thousand" 
                                                value={this.state.car_type_price}
                                                prefix="Rp"
                                                displayType="text"
                                                decimalSeparator="."
                                                thousandSeparator={true}
                                                allowNegative={true} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>{this.state.product_name}</td>
                                        <td>
                                            <NumberFormat 
                                                thousandSeparator="thousand" 
                                                value={this.state.product_price}
                                                prefix="Rp"
                                                displayType="text"
                                                decimalSeparator="."
                                                thousandSeparator={true}
                                                allowNegative={true} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>{this.state.other_product_name}</td>
                                        <td>
                                            <NumberFormat 
                                                thousandSeparator="thousand" 
                                                value={this.state.other_product_price}
                                                prefix="Rp"
                                                displayType="text"
                                                decimalSeparator="."
                                                thousandSeparator={true}
                                                allowNegative={true} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" className="text-center">Jumlah Total</td>
                                        <NumberFormat 
                                            thousandSeparator="thousand" 
                                            value={this.state.grand_total}
                                            prefix="Rp"
                                            displayType="text"
                                            decimalSeparator="."
                                            thousandSeparator={true}
                                            allowNegative={true} />
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center">
                                <button onClick={this.checkoutOrder.bind(this)} className="btn btn-primary">Buat Pesanan Sekarang!</button>
                            </div>
                        </Modal.Body>
                    </Modal>

                    <Modal show={this.state.part_7_modal} centered>
                        <Modal.Header>
                            <Modal.Title>Pesanan Sukses!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                                <div className="row">
                                    <div className="col-12 text-center">
                                        <strong className="text-center">{this.state.shop_name}</strong><br></br>
                                        <small className="text-center">{this.state.shop_address}</small>
                                    </div>
                                    <hr></hr>
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
                            <Button onClick={this.done.bind(this)}>Selesai</Button>
                        </Modal.Footer>
                    </Modal>

                    <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
                        <div className="card card0 border-0">
                            <div className="row d-flex">
                                <div className="col-lg-6">
                                    <div className="card1 pb-5">
                                        <div className="row">
                                            <img src="https://i.imgur.com/CXQmsmF.png" className="logo"/>
                                        </div>
                                        <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                                            <img src="https://i.imgur.com/uNGdWHi.png" className="image"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="card2 card border-0 px-4 py-5">
                                        <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                                            <img src={baseURL+"files/images/company_logo/google.jpg"} className="image_com_logo"/>
                                        </div>
                                        <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                                            <button onClick={(e) => this.setState({part_1_modal: true})} className="btn btn-blue text-center col-12">Buat Pesanan</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                )
            }
        }
    }