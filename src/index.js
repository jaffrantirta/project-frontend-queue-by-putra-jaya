import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => {
        if(localStorage.getItem('is_logged_in')){
          return <AdminLayout {...props}/>;
        }else{
          return (
            <Redirect
              to="/auth/login"
            />
          );
        }
      }} />
      <Route path="/auth" render={(props) => {
        if(localStorage.getItem('is_logged_in')){
          return (
            <Redirect
              to="/admin/dashboard"
            />
          );
        }else{
          return <AuthLayout {...props}/>;
        }
      }} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
