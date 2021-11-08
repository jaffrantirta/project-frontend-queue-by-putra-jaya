import Dashboard from "views/Dashboard.js";
import CarType from "views/pages/CarType.js";
import GroupProduct from "views/pages/GroupProduct.js";
import Product from "views/pages/Product.js";
import PaymentMethod from "views/pages/PaymentMethod.js";
import TodayQueue from "views/pages/TodayQueue.js";
import Order from "views/pages/Order.js";
import User from "views/pages/User.js";

import CreateOrder from "views/pages/CreateOrder.js";

import Profile from "views/pages/Profile.js";
import Maps from "views/pages/Maps.js";
import Register from "views/pages/Register.js";
import Login from "views/pages/Login.js";
import Tables from "views/pages/Tables.js";
// import Icons from "views/pages/Icons.js";

if(JSON.parse(localStorage.getItem('is_logged_in'))){
  if(JSON.parse(localStorage.getItem('data')).user.role_id === 1){
    var routes = [
      {
        path: "/dashboard",
        name: 'Dahsboard',
        icon: "fa fa-tachometer-alt",
        component: Dashboard,
        layout: "/admin",
        
      },
      {
        path: "/today-queues",
        name: 'Antrian Hari Ini',
        icon: "fa fa-calendar-day",
        component: TodayQueue,
        layout: "/admin",
        
      },
      {
        path: "/user-profile",
        name: "Profile",
        icon: "fa fa-user",
        component: Profile,
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
        path: "/create",
        name: "Buat Pesanan",
        icon: "fa fa-cart-plus",
        component: CreateOrder,
        layout: "/order",
      },
      {
        path: "/order",
        name: "Pesanan",
        icon: "fa fa-cart-arrow-down",
        component: Order,
        layout: "/admin",
      },
      {
        path: "/users",
        name: "Pengguna",
        icon: "fa fa-users",
        component: User,
        layout: "/admin",
      },
    ];
  }else{
    var routes = [
      {
        path: "/dashboard",
        name: 'Dahsboard',
        icon: "fa fa-tachometer-alt",
        component: Dashboard,
        layout: "/admin",
        
      },
      {
        path: "/today-queues",
        name: 'Antrian Hari Ini',
        icon: "fa fa-calendar-day",
        component: TodayQueue,
        layout: "/admin",
        
      },
      {
        path: "/user-profile",
        name: "Profile",
        icon: "fa fa-user",
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/create",
        name: "Buat Pesanan",
        icon: "fa fa-cart-plus",
        component: CreateOrder,
        layout: "/order",
      },
      {
        path: "/order",
        name: "Pesanan",
        icon: "fa fa-cart-arrow-down",
        component: Order,
        layout: "/admin",
      },
    ];
  }
}else{
  var routes = [
    {
      path: "/dashboard",
      name: 'Dahsboard',
      icon: "fa fa-tachometer-alt",
      component: Dashboard,
      layout: "/admin",
      
    },
    {
      path: "/login",
      name: "Login",
      icon: "fa fa-user",
      component: Login,
      layout: "/auth",
    },
    {
      path: "/register",
      name: "Register",
      icon: "fa fa-user",
      component: Register,
      layout: "/auth",
    },
  ];
}
export default routes;
