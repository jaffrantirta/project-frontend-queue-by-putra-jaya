import Dashboard from "views/Dashboard.js";
import CarType from "views/pages/CarType.js";

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
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin",
    
  },
  {
    path: "/car-type",
    name: "Tipe Kendaraan",
    icon: "ni ni-planet text-blue",
    component: CarType,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
