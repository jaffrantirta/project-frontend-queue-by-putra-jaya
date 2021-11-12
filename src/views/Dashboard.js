import React, { Component } from "react";
import classnames from "classnames";
import Chart from "chart.js";
import { Line, Bar, Pie  } from "react-chartjs-2";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  CardTitle,
} from "reactstrap";
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import { MDBContainer } from "mdbreact";
import Header from "components/Headers/Header.js";
import { baseURL } from "utils/BaseUrl.js";
import Swal from 'sweetalert2';
import axios from 'axios';

class ChartsPage extends Component {
  state = {
    order_per_week: [],
    car_type: [],
    product: [],
    finish_order: "",
    
    barChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            barPercentage: 1,
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    },
  };

  getData(){
    // console.log(this.state.page);
    Swal.fire({
        title: 'Memuat',
        allowOutsideClick: false,
        showConfirmButton: false
    })
    axios.get(baseURL+'api/statistic', {
        headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('data')).token
        }
    })
    .then(response => {
        console.log(localStorage.getItem('data'));
        var all_data = JSON.stringify(response.data);
        var data_json = JSON.parse(all_data);
        // console.log(JSON.stringify(data_json.statistic.order_per_week.lebels));
        this.setState({
          dataOrderPerWeek: {
            labels: data_json.statistic.order_per_week.lebels,
            datasets: [
              {
                label: "Pesanan Selesai",
                fill: true,
                lineTension: 0.3,
                backgroundColor: "rgba(225, 204,230, .3)",
                borderColor: "rgb(205, 130, 158)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgb(205, 130,1 58)",
                pointBackgroundColor: "rgb(255, 255, 255)",
                pointBorderWidth: 10,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgb(0, 0, 0)",
                pointHoverBorderColor: "rgba(220, 220, 220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: data_json.statistic.order_per_week.data,
              }
            ]
          },
          dataCarType: {
            labels: data_json.statistic.car_type.lebels,
            datasets: [
              {
                label: "ss",
                data: data_json.statistic.car_type.data,
                backgroundColor: [
                  "rgba(255, 134,159,0.4)",
                  "rgba(98,  182, 239,0.4)",
                  "rgba(255, 218, 128,0.4)",
                  "rgba(113, 205, 205,0.4)",
                  "rgba(170, 128, 252,0.4)",
                  "rgba(255, 177, 101,0.4)"
                ],
                borderWidth: 2,
                borderColor: [
                  "rgba(255, 134, 159, 1)",
                  "rgba(98,  182, 239, 1)",
                  "rgba(255, 218, 128, 1)",
                  "rgba(113, 205, 205, 1)",
                  "rgba(170, 128, 252, 1)",
                  "rgba(255, 177, 101, 1)"
                ]
              }
            ]
          },
          dataProduct: {
            labels: data_json.statistic.product.lebels,
            datasets: [
              {
                data: data_json.statistic.product.data,
                backgroundColor: [
                  "#F7464A",
                  "#46BFBD",
                  "#FDB45C",
                  "#949FB1",
                  "#4D5360",
                  "#AC64AD"
                ],
                hoverBackgroundColor: [
                  "#FF5A5E",
                  "#5AD3D1",
                  "#FFC870",
                  "#A8B3C5",
                  "#616774",
                  "#DA92DB"
                ]
              }
            ]
          }
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

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
              {/* <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Traffic
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            350,897
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            New users
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">2,356</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-danger mr-2">
                          <i className="fas fa-arrow-down" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last week</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Sales
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">924</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-warning mr-2">
                          <i className="fas fa-arrow-down" /> 1.10%
                        </span>{" "}
                        <span className="text-nowrap">Since yesterday</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Performance
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">49,65%</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-percent" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-arrow-up" /> 12%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row> */}
  
          <Row>
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Pesanan Selesai Minggu Ini</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                <Line data={this.state.dataOrderPerWeek} options={{ responsive: true }} />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row style={{marginTop: 20}}>
            <Col className="mb-5 mb-xl-0" xl="6">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Produk  hari ini
                      </h6>
                      {/* <h2 className="text-white mb-0">Pesanan minggu ini</h2> */}
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Pie  data={this.state.dataProduct} options={{ responsive: true }} />
                </CardBody>
              </Card>
            </Col>
            <Col className="mb-5 mb-xl-0" xl="6">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Tipe Kendaraan hari ini
                      </h6>
                      {/* <h2 className="text-white mb-0">Pesanan minggu ini</h2> */}
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Pie  data={this.state.dataCarType} options={{ responsive: true }} />
                </CardBody>
              </Card>
            </Col>
          </Row>
          
        </Container>
      </>
    );
  }
}

export default ChartsPage;
// const Index = (props) => {
//   const [activeNav, setActiveNav] = useState(1);
//   const [chartExample1Data, setChartExample1Data] = useState("data1");

//   if (window.Chart) {
//     parseOptions(Chart, chartOptions());
//   }

//   const toggleNavs = (e, index) => {
//     e.preventDefault();
//     setActiveNav(index);
//     setChartExample1Data("data" + index);
//   };
  

// };

// export default Index;
