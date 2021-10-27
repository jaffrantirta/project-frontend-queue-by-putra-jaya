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

    const buttonStyle = {
        marginBottom: 10,
    };

    export default class javascriptMap extends Component {
        constructor(props){
            super(props)
            this.state = {
                car_types: [],
                add_modal_show: false,
                edit_modal_show: false,
                id: "",
                name: "",
                price: "",
                description: "",
                offset: 0,
                data: [],
                perPage: 0,
                currentPage: 0,
                page: "",
                total: 0,
                desc_short: "",
            };
            this.handlePageClick = this.handlePageClick.bind(this);
        }
        clearState(){
            const initialState = {
                id: "",
                name: "",
                price: "",
                description: "",
              };
              this.setState({ ...initialState });
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
            axios.get(baseURL+'car_type'+this.state.page, {
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
                    car_types: response.data['data'],
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
        deleteData(name, id){
            Swal.fire({
                title: 'Manghapus "'+name+'"',
                allowOutsideClick: false,
                showConfirmButton: false
            })
            
            axios.delete(baseURL+'car_type/delete/'+id, {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('data')).token
                }
            })
            .then(response => {
                // console.log(JSON.stringify(response.data));
                var string = JSON.stringify(response.data);
                var res = JSON.parse(string);
                Swal.fire({
                    title: res['response']['message']['indonesia'],
                    icon: 'success'
                })
                this.getData();
            })
            .catch(error => {
                // console.log(error.response.data.response.message.indonesia)
                Swal.fire({
                    title: 'Oops! Sepertinya ada yang salah',
                    text: error,
                    icon: 'error'
                })
            })
        }
        showMore(id){
            Swal.fire({
                title: 'Mengambil Data',
                allowOutsideClick: false,
                showConfirmButton: false
            })
            
            axios.get(baseURL+'car_type?id='+id, {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('data')).token
                }
            })
            .then(response => {
                // console.log(JSON.stringify(response.data));
                var string = JSON.stringify(response.data);
                var res = JSON.parse(string);
                Swal.close();
                this.setState({
                    id: res['data']['id'],
                    name: res['data']['name'],
                    price: res['data']['price'],
                    description: res['data']['description'],
                    edit_modal_show: true,
                });
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
        addCarType(){
            if(this.state.name === ""){
                Swal.fire('Nama Tidak Boleh Kosong')
            }else if(this.state.price === ""){
                Swal.fire('Harga Tidak Boleh Kosong')
            }else{
                Swal.fire({
                    title: 'Menambahkan Tipe Kendaraan',
                    allowOutsideClick: false,
                    showConfirmButton: false
                })
                const formData = new FormData();
                formData.append('name', this.state.name);
                formData.append('price', this.state.price);
                formData.append('description', this.state.description);
                axios.post(baseURL+'car_type/add', formData, {
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
        editCarType(){
            if(this.state.name === ""){
                Swal.fire('Nama Tidak Boleh Kosong')
            }else if(this.state.price === ""){
                Swal.fire('Harga Tidak Boleh Kosong')
            }else{
                Swal.fire({
                    title: 'Memperbaharui Tipe Kendaraan',
                    allowOutsideClick: false,
                    showConfirmButton: false
                })
                const formData = new FormData();
                formData.append('name', this.state.name);
                formData.append('price', this.state.price);
                formData.append('description', this.state.description);
                axios.post(baseURL+'car_type/update/'+this.state.id, formData, {
                    headers: {
                        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('data')).token
                    }
                })
                .then(response => {
                    // console.log(JSON.stringify(response.data['data']));
                    this.setState({edit_modal_show:false})
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
        short_desc(desc){
            if(desc.length >= 20){
                return desc.substring(0, 20) + '...';   
            }else{
                return desc;
            }
        }
        render() {
            return (
                <>
                <Header />
                <Container className="mt--7" fluid>
                    <Button
                        style={buttonStyle}
                        color="warning"
                        onClick={() => this.setState({add_modal_show: true})}
                    >
                        Tambah Tipe Kendaraan
                    </Button>


                    <Modal show={this.state.add_modal_show} onHide={() => this.setState({add_modal_show: false})} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Tambah Tipe Kendaraan</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                    <Input
                                        placeholder="Nama Tipe Kendaraan"
                                        type="text"
                                        onChange={(e) => this.setState({name: e.target.value})}
                                    />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                    <Input
                                        placeholder="Harga Tipe Kendaraan"
                                        type="number"
                                        onChange={(e) => this.setState({price: e.target.value})}
                                    />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                    <Input
                                        placeholder="Deskripsi Tipe Kendaraan (optional)"
                                        type="textarea"
                                        rows="4"
                                        onChange={(e) => this.setState({description: e.target.value})}
                                    />
                                    </InputGroup>
                                </FormGroup>
                                
                                <div className="text-center">
                                    <button onClick={this.addCarType.bind(this)} className="btn btn-primary">Tambah</button>
                                </div>
                        </Modal.Body>
                    </Modal>

                    <Modal show={this.state.edit_modal_show} onHide={() => this.setState({edit_modal_show: false})} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Detail Tipe Kendaraan</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                    <Input
                                        placeholder="Nama Tipe Kendaraan"
                                        type="text"
                                        value={this.state.name}
                                        onChange={(e) => this.setState({name: e.target.value})}
                                    />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                    <Input
                                        placeholder="Harga Tipe Kendaraan"
                                        type="number"
                                        value={this.state.price}
                                        onChange={(e) => this.setState({price: e.target.value})}
                                    />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                    <Input
                                        placeholder="Deskripsi Tipe Kendaraan (optional)"
                                        type="textarea"
                                        row="4"
                                        value={this.state.description}
                                        onChange={(e) => this.setState({description: e.target.value})}
                                    />
                                    </InputGroup>
                                </FormGroup>
                                
                                <div className="text-center">
                                    <button onClick={this.editCarType.bind(this)} className="btn btn-primary">Edit</button>
                                </div>
                        </Modal.Body>
                    </Modal>



                    <Row>
                    <div className="col">
                        <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">{this.state.total} Tipe Kendaraan</h3>
                        </CardHeader>
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Nama</th>
                                    <th scope="col">Harga</th>
                                    <th scope="col">Deskripsi</th>
                                    <th scope="col" />
                                </tr>
                            </thead>
                            <tbody>
                                    {this.state.car_types.map(car_type => (
                                        <tr>
                                            <th scope="row">
                                            <Media className="align-items-center">
                                                <Media>
                                                <span className="mb-0 text-sm">
                                                    {car_type.name}
                                                </span>
                                                </Media>
                                            </Media>
                                            </th>
                                            <td>
                                                <NumberFormat 
                                                    thousandSeparator="thousand" 
                                                    value={car_type.price}
                                                    prefix="Rp"
                                                    displayType="text"
                                                    decimalSeparator="."
                                                    thousandSeparator={true}
                                                    allowNegative={true} />
                                            </td>
                                            <td>
                                                {this.short_desc(car_type.description)}
                                                {/* {this.state.desc_short} */}
                                            </td>
                                            <td className="text-right">
                                            <UncontrolledDropdown>
                                                <DropdownToggle
                                                    className="btn-dark text-light"
                                                    href="#pablo"
                                                    role="button"
                                                    size="md"
                                                    color=""
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                <i className="fas fa-ellipsis-v" />
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => this.showMore(car_type.id)}
                                                >
                                                    Edit
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => this.confirmDelete(car_type.name, car_type.id)}
                                                >
                                                    Hapus
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