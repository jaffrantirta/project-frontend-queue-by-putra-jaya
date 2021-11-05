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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginHandler = async (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      Swal.fire({
          title: 'Memuat',
          allowOutsideClick: false,
          showConfirmButton: false
      })
      await axios.post(baseURL+'api/login', formData)
      .then(response => {
        console.log(response.data['data'])
        localStorage.setItem('is_logged_in', true);
        localStorage.setItem('data', JSON.stringify(response.data['data']));
        Swal.fire({
          title: response.data.response.message.indonesia,
          icon: 'success'
        });
        window.location.reload();
      })
      .catch(error => {
        // console.log(error)
        Swal.fire({
          title: 'Oops! Login Gagal',
          icon: 'error'
        })
      })
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Login</small>
            </div>
            <form onSubmit={LoginHandler}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              
              <div className="text-center">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
            </form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Lupa Password</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Buat Akun</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default Login;
