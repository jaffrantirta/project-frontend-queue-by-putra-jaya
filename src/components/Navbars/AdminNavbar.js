import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import axios from 'axios';
import Swal from 'sweetalert2';
import { baseURL } from "../../utils/BaseUrl.js";
import React, { Component } from "react";

export default class javascriptMap extends Component {
  constructor(props){
      super(props)
      this.state = {
          datas: [],
      };
  }
  logout(){
    console.log('halo');
    Swal.fire({
      title: 'Yakin keluar ?',
      showCancelButton: true,
      confirmButtonText: 'Keluar',
      confirmButtonColor: '#ff2a00'
    }).then((result) => {
      if(result.isConfirmed){
        this.loggingOut();
      }
    });
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
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
            {JSON.parse(localStorage.getItem('data')).shop_user[0].shop.name}
            </Link>
            <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Pencarian" type="text" />
                </InputGroup>
              </FormGroup>
            </Form>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={
                          require("../../assets/img/theme/team-4-800x800.png")
                            .default
                        }
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {JSON.parse(localStorage.getItem('data')).user.name}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  {/* <DropdownItem divider /> */}
                  <DropdownItem onClick={() => this.logout()}>
                    <i className="ni ni-user-run" />
                    <span>Keluar</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}
