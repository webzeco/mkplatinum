import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import "bootstrap/scss/bootstrap.scss";
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


ReactDOM.render(
  <React.StrictMode>
    <Router>
    <App/>
    </Router>
  </React.StrictMode>
  ,
  document.getElementById("root")
);
reportWebVitals();
