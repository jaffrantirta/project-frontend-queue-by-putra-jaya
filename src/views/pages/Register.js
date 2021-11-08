import {
  // Button,
  Card,
  // CardHeader,
  CardBody,
  FormGroup,
  // Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import axios from 'axios';
import React, { useState } from "react";
import Swal from 'sweetalert2';
import { baseURL } from "../../utils/BaseUrl.js";

const textColor = {
  color: '#ffffff'
};

function Register() {

  const [user_name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [user_phone, setUserPhone] = useState("");
  const [shop_name, setShopName] = useState("");
  const [shop_address, setShopAddress] = useState("");
  const [shop_phone, setShopPhone] = useState("");
  const [shop_email, setShopEmail] = useState("");
  const [shop_website, setShopWebsite] = useState("");
  const [shop_key_code, setShopKeyCode] = useState("");

  const registerHandler = async (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append('user_name', user_name);
      formData.append('email', email);
      formData.append('user_phone', user_phone);
      formData.append('shop_name', shop_name);
      formData.append('shop_address', shop_address);
      formData.append('shop_phone', shop_phone);
      formData.append('shop_email', shop_email);
      formData.append('shop_website', shop_website);
      formData.append('shop_key_code', shop_key_code);

      await axios.post(baseURL+'api/register', formData)
      .then(response => {
        // console.log(response)
        Swal.fire({
          title: 'Registrasi Berhasil',
          text: response.data.response.message.indonesia,
          icon: 'success'
        })
      })
      .catch(error => {
        // console.log(error.response.data.response.message.indonesia)
        Swal.fire({
          title: 'Oops! Sepertinya ada yang salah',
          text: error.response.data.response.message.indonesia,
          icon: 'error'
        })
      })
  };

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h4 style={textColor}>Isi form untuk mendaftarkan Toko Anda</h4>
            </div>

            <form onSubmit={registerHandler}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <Input placeholder="Nama" type="text" value={user_name} onChange={(e) => setUserName(e.target.value)}/>
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <Input placeholder="Phone" type="number" value={user_phone} onChange={(e) => setUserPhone(e.target.value)}/>
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <Input placeholder="Nama Toko" type="text" value={shop_name} onChange={(e) => setShopName(e.target.value)}/>
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <Input placeholder="Alamat Toko" type="text" value={shop_address} onChange={(e) => setShopAddress(e.target.value)}/>
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <Input placeholder="Nomor Telepon Toko" type="number" value={shop_phone} onChange={(e) => setShopPhone(e.target.value)}/>
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <Input placeholder="Email Toko" type="email" value={shop_email} onChange={(e) => setShopEmail(e.target.value)}/>
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <Input placeholder="Website Toko" type="text" value={shop_website} onChange={(e) => setShopWebsite(e.target.value)}/>
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <Input placeholder="Kode Pemanggilan Antrian" type="text" value={shop_key_code} onChange={(e) => setShopKeyCode(e.target.value)}/>
                </InputGroup>
              </FormGroup>


              
              {/* <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row> */}
              <div className="text-center">
                <button type="submit" className="col-12 btn btn-primary">REGISTRASI</button>
              </div>
            </form>
            
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default Register;
