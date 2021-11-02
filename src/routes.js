import Dashboard from "views/Dashboard.js";
import CarType from "views/pages/CarType.js";
import GroupProduct from "views/pages/GroupProduct.js";
import Product from "views/pages/Product.js";
import PaymentMethod from "views/pages/PaymentMethod.js";

import OrderPart1 from "views/pages/OrderPart1.js";

import Profile from "views/pages/Profile.js";
import Maps from "views/pages/Maps.js";
import Register from "views/pages/Register.js";
import Login from "views/pages/Login.js";
import Tables from "views/pages/Tables.js";
// import Icons from "views/pages/Icons.js";



var routes = [
  {
    path: "/dashboard",
    name: 'Dahsboard',
    icon: "fa fa-tachometer-alt",
    component: Dashboard,
    layout: "/admin",
    
  },
  {
    path: "/car-type",
    name: "Tipe Kendaraan",
    icon: "fa fa-car",
    component: CarType,
    layout: "/admin",
  },
  {
    path: "/group-product",
    name: "Grup Produk",
    icon: "fa fa-layer-group",
    component: GroupProduct,
    layout: "/admin",
  },
  {
    path: "/product",
    name: "Produk",
    icon: "fa fa-shower",
    component: Product,
    layout: "/admin",
  },
  {
    path: "/payment-method",
    name: "Metode Pembayaran",
    icon: "fa fa-wallet",
    component: PaymentMethod,
    layout: "/admin",
  },
  {
    path: "/part-1",
    name: "Buat Pesanan",
    icon: "fa fa-wallet",
    component: OrderPart1,
    layout: "/order",
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "fa fa-user",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "fa fa-user",
  //   component: Profile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "fa fa-user",
  //   component: Tables,
  //   layout: "/admin",
  // },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "fa fa-user",
  //   component: Login,
  //   layout: "/auth",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "fa fa-user",
  //   component: Register,
  //   layout: "/auth",
  // },
];
export default routes;
