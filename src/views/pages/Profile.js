import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  CardFooter,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import axios from 'axios';
import Swal from 'sweetalert2';
import { baseURL } from "../../utils/BaseUrl.js";
import React, { Component } from "react";

const cardStyle = {
  marginBottom: 10,
};
export default class javascriptMap extends Component {
  constructor(props){
      super(props)
      this.state = {
          user_name: JSON.parse(localStorage.getItem('data')).user.name,
          user_email: JSON.parse(localStorage.getItem('data')).user.email,
          user_phone: JSON.parse(localStorage.getItem('data')).user.phone,
          shop_name: JSON.parse(localStorage.getItem('data')).shop_user[0].shop.name,
          shop_phone: JSON.parse(localStorage.getItem('data')).shop_user[0].shop.phone,
          shop_email: JSON.parse(localStorage.getItem('data')).shop_user[0].shop.email,
          shop_website: JSON.parse(localStorage.getItem('data')).shop_user[0].shop.website,
          shop_key_code: JSON.parse(localStorage.getItem('data')).shop_user[0].shop.key_code,
          shop_address: JSON.parse(localStorage.getItem('data')).shop_user[0].shop.address,
          old_password: "",
          new_password: "",
          new_confirm_password: "",
      };
  }

  saveChange(){
    if(this.state.user_name === ""){
      Swal.fire('Nama Pengguna Tidak Boleh Kosong')
    }else if(this.state.user_email === ""){
        Swal.fire('Email Pengguna Tidak Boleh Kosong')
      }else if(this.state.user_phone === ""){
        Swal.fire('Telepon Pengguna Tidak Boleh Kosong')
      }else if(this.state.shop_name === ""){
        Swal.fire('Nama Toko Tidak Boleh Kosong')
      }else if(this.state.shop_email === ""){
        Swal.fire('Email Toko Tidak Boleh Kosong')
      }else if(this.state.shop_phone === ""){
        Swal.fire('Telepon Toko Tidak Boleh Kosong')
      }else if(this.state.shop_address === ""){
        Swal.fire('Alamat Toko Tidak Boleh Kosong')
      }else if(this.state.shop_key_code === ""){
        Swal.fire('Kode Antrian Toko Tidak Boleh Kosong')
    }else{
        Swal.fire({
            title: 'Menyimpan Perubahan',
            allowOutsideClick: false,
            showConfirmButton: false
        })
        const formData = new FormData();
        formData.append('user_name', this.state.user_name);
        formData.append('user_email', this.state.user_email);
        formData.append('user_phone', this.state.user_phone);
        formData.append('shop_name', this.state.shop_name);
        formData.append('shop_phone', this.state.shop_phone);
        formData.append('shop_email', this.state.shop_email);
        formData.append('shop_website', this.state.shop_website);
        formData.append('shop_key_code', this.state.shop_key_code);
        formData.append('shop_address', this.state.shop_address);
        axios.post(baseURL+'api/profile/update', formData, {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('data')).token
            }
        })
        .then(response => {
            // console.log(JSON.stringify(response.data['data']));
            this.setState({add_modal_show:false})
            Swal.fire({
                title: response.data['response']['message']['indonesia'],
                text: 'Logout Sekarang Untuk Memuat Data Terbaru',
                icon: 'warning',
                allowOutsideClick: false,
                confirmButtonText: 'Logout',
            }).then((result) => {
              this.loggingOut();
            })
            
        })
        .catch(error => {
            // console.log(error.response.data.response.message.indonesia)
            Swal.fire({
                title: 'Oops! Sepertinya ada yang salah',
                icon: 'error'
            })
        })
    }
  }
  changePassword(){
    Swal.fire({
      title: 'Yakin Ganti Password ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya',
    }).then((result) => {
      if(result.isConfirmed){
        this.changingPassword()
      }
    })
  }
  changingPassword(){
        const formData = new FormData();
        formData.append('old_password', this.state.old_password);
        formData.append('new_password', this.state.new_password);
        formData.append('new_confirm_password', this.state.new_confirm_password);
        axios.post(baseURL+'api/profile/change/password', formData, {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('data')).token
            }
        })
        .then(response => {
            // console.log(JSON.stringify(response.data['data']));
            this.setState({old_password:"", new_password: "", new_confirm_password: ""})
            Swal.fire({
                title: response.data['response']['message']['indonesia'],
                icon: 'success',
            })
        })
        .catch(error => {
            // console.log(error.response.data.response.message.indonesia)
            Swal.fire({
                title: 'Oops! '+error.response.data.response.message.indonesia,
                icon: 'error'
            })
        })
  }
  loggingOut(){
    Swal.fire({
      title: 'Logging Out',
      allowOutsideClick: false,
      showConfirmButton: false
    })
    axios.get(baseURL+'api/logout', {
        headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('data')).token
        }
    })
    .then(response => {
      localStorage.removeItem('is_logged_in');
      localStorage.removeItem('data');
      window.location.reload();
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

  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card style={cardStyle}>
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Akun saya</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Informasi Pengguna
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Nama
                            </label>
                            <Input
                              onChange={(e) => this.setState({user_name: e.target.value})}
                              className="form-control-alternative"
                              defaultValue={JSON.parse(localStorage.getItem('data')).user.name}
                              placeholder="Nama"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email
                            </label>
                            <Input
                              onChange={(e) => this.setState({user_email: e.target.value})}
                              className="form-control-alternative"
                              defaultValue={JSON.parse(localStorage.getItem('data')).user.email}
                              placeholder="Email"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Nomor Telepon
                            </label>
                            <Input
                             onChange={(e) => this.setState({user_phone: e.target.value})}
                              className="form-control-alternative"
                              defaultValue={JSON.parse(localStorage.getItem('data')).user.phone}
                              placeholder="No. Telepon"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Informasi Toko
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Nama Toko
                            </label>
                            <Input
                            onChange={(e) => this.setState({shop_name: e.target.value})}
                              className="form-control-alternative"
                              defaultValue={JSON.parse(localStorage.getItem('data')).shop_user[0].shop.name}
                              placeholder="Nama Toko"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Alamat Toko
                            </label>
                            <Input
                              onChange={(e) => this.setState({shop_address: e.target.value})}
                              className="form-control-alternative"
                              defaultValue={JSON.parse(localStorage.getItem('data')).shop_user[0].shop.address}
                              placeholder="Alamat Toko"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Nomor Telepon Toko
                            </label>
                            <Input
                              onChange={(e) => this.setState({shop_phone: e.target.value})}
                              className="form-control-alternative"
                              defaultValue={JSON.parse(localStorage.getItem('data')).shop_user[0].shop.phone}
                              placeholder="No. Telepon Toko"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Email Toko
                            </label>
                            <Input
                              onChange={(e) => this.setState({shop_email: e.target.value})}
                              className="form-control-alternative"
                              defaultValue={JSON.parse(localStorage.getItem('data')).shop_user[0].shop.email}
                              placeholder="Email Toko"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Website Toko
                            </label>
                            <Input
                              onChange={(e) => this.setState({shop_website: e.target.value})}
                              className="form-control-alternative"
                              defaultValue={JSON.parse(localStorage.getItem('data')).shop_user[0].shop.website}
                              placeholder="No. Telepon Toko"
                              type="website"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Kode Antrian Toko
                            </label>
                            <Input
                              onChange={(e) => this.setState({shop_key_code: e.target.value})}
                              className="form-control-alternative"
                              defaultValue={JSON.parse(localStorage.getItem('data')).shop_user[0].shop.key_code}
                              placeholder="Email Toko"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button onClick={() => this.saveChange()}>Simpan Perubahan</Button>
                </CardFooter>
              </Card>
            </Col>

            <Col className="order-xl-1" xl="12">
              <Card style={cardStyle}>
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Ganti Password</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Passowrd Lama
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Passowrd Lama
                            </label>
                            <Input
                              onChange={(e) => this.setState({old_password: e.target.value})}
                              className="form-control-alternative"
                              placeholder="Masukan Password Lama"
                              type="password"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Password Baru
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Password Baru
                            </label>
                            <Input
                            onChange={(e) => this.setState({new_password: e.target.value})}
                              className="form-control-alternative"
                              placeholder="Masukan Password Baru"
                              type="password"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Konfirmasi Password Baru
                            </label>
                            <Input
                              onChange={(e) => this.setState({new_confirm_password: e.target.value})}
                              className="form-control-alternative"
                              placeholder="Masukan Password Baru Konfirmasi"
                              type="password"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button onClick={() => this.changePassword()}>Ganti Password</Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
