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
    Pagination,
    PaginationItem,
    PaginationLink,
    // Progress,
    Table,
    Container,
    Row,
    Button,
    FormGroup,
    // Form,
    Input,
    // InputGroupAddon,
    // InputGroupText,
    InputGroup,
    // UncontrolledTooltip,
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
  import axios from 'axios';
  import React, { Component } from "react";
  import Swal from 'sweetalert2';
  import { baseURL } from "../../utils/BaseUrl.js";
  import NumberFormat from 'react-number-format';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import {Modal} from 'react-bootstrap';

    const buttonStyle = {
        marginBottom: 10,
    };

    export default class javascriptMap extends Component {
        constructor(props){
            super(props)
            this.state = {
                car_types: [],
                links: [],
                show: false,
                name: "",
                price: "",
                description: "",
            }
        }
        modalShow(){
            this.setState({show: true});
        }
        modalHide(){
            this.setState({show: false});
        }
        clearState(){
            const initialState = {
                name: "",
                price: "",
                description: "",
              };
              this.setState({ ...initialState });
        }
        
        
        getData(){
            Swal.fire({
                title: 'Memuat',
                allowOutsideClick: false,
                showConfirmButton: false
            })
            axios.get(baseURL+'car_type', {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('data')).token
                }
            })
            .then(response => {
                // console.log(JSON.stringify(response.data['data']));
                var res = JSON.stringify(response.data['links']);
                var loop = JSON.parse(res);
                var link_true = [];
                for(const prop in loop){
                    if(loop[prop].label != 'Next &raquo;' && loop[prop].label != '&laquo; Previous'){
                        link_true.push(loop[prop]);
                    }
                }
                this.setState({car_types: response.data['data']})
                this.setState({links: link_true})
                Swal.close()
                // console.log(link_true);
            })
            .catch(error => {
                // console.log(error)
                Swal.close()
                Swal.fire({
                    title: 'Oops! Sepertinya ada yang salah',
                    text: error.response.data.response.message.indonesia,
                    icon: 'error'
                  })
            })
        }

        paginationRun(link) {
            Swal.fire({
                title: 'Memuat',
                allowOutsideClick: false,
                showConfirmButton: false
            })
            axios.get(link, {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('data')).token
                }
            })
            .then(response => {
                // console.log(JSON.stringify(response.data['data']));
                var res = JSON.stringify(response.data['links']);
                var loop = JSON.parse(res);
                var link_true = [];
                for(const prop in loop){
                    if(loop[prop].label != 'Next &raquo;' && loop[prop].label != '&laquo; Previous'){
                        link_true.push(loop[prop]);
                    }
                }
                this.setState({car_types: response.data['data']})
                this.setState({links: link_true})
                Swal.close()
            })
            .catch(error => {
                // console.log(error)
                Swal.fire({
                    title: 'Oops! Tidak Ada Data Lagi',
                    icon: 'error'
                })
            })
        }
        componentDidMount(){
            this.getData()
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
                    this.setState({show:false})
                    Swal.fire({
                        title: response.data['response']['message']['indonesia'],
                        icon: 'success'
                    })
                    this.clearState()
                    this.getData()
                    
                })
                .catch(error => {
                    console.log(error.response.data.response.message.indonesia)
                    Swal.fire({
                        title: 'Oops! Sepertinya ada yang salah',
                        text: error.response.data.response.message.indonesia,
                        icon: 'error'
                    })
                })
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
                        onClick={() => this.setState({show: true})}
                    >
                        Tambah Tipe Kendaraan
                    </Button>


                    <Modal show={this.state.show} onHide={() => this.setState({show: false})} centered>
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
                                        type="text"
                                        onChange={(e) => this.setState({description: e.target.value})}
                                    />
                                    </InputGroup>
                                </FormGroup>
                                
                                <div className="text-center">
                                    <button onClick={this.addCarType.bind(this)} className="btn btn-primary">Tambah</button>
                                </div>
                        </Modal.Body>
                    </Modal>



                    <Row>
                    <div className="col">
                        <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0">List Tipe Kendaraan</h3>
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
                                            <Badge color="" className="badge-dot mr-4">
                                                {car_type.description}
                                            </Badge>
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
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Edit
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
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
                            <Pagination
                                className="pagination justify-content-end mb-0"
                                listClassName="justify-content-end mb-0"
                            >
                                <PaginationItem className="disabled">
                                    <PaginationLink
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                        tabIndex="-1"
                                    >
                                        <i className="fas fa-angle-left" />
                                        <span className="sr-only">Previous</span>
                                    </PaginationLink>
                                </PaginationItem>
                                {this.state.links.map(link => 
                                (
                                    <PaginationItem>
                                        <PaginationLink
                                            onClick={() => this.paginationRun(link.url)}
                                        >
                                            {link.label}
                                        </PaginationLink>
                                    </PaginationItem>
                                )) }
                                <PaginationItem>
                                    <PaginationLink
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <i className="fas fa-angle-right" />
                                        <span className="sr-only">Next</span>
                                    </PaginationLink>
                                </PaginationItem>
                                
                            </Pagination>
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