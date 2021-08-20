import React, { useContext, useEffect, useRef, useState } from "react";
import "./style/navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";

export default function Navbar(props) {
  const { user } = useContext(UserContext);
  const logoutHandler = async () => {
    localStorage.removeItem("jwt");
    toast.success("logout  successfully !!!", {
      position: toast.POSITION.TOP_CENTER,
    });
    // history.push('/');
    window.location = "/";
  };
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <header id="header" class="fixed-top ">
      <div class="container d-flex align-items-center">
        <Link to="/" class="header__logo">
          <img
            src={`${process.env.REACT_APP_URL}/img/gold pro red.png`}
            class="img-fluid mx-2"
            style={{ height: "100px" }}
            alt="Mk Platinum World"
          />
        </Link>
        <h1 class="logo me-auto">
          <Link to="/"></Link>
        </h1>
        <nav id="navbar" class="navbar">
          {user && (
            <ul>
              <li className="d-flex">
                <i class="fas fa-user "></i>
                <Link class="nav-link text-dark text-uppercase" to="/add">
                  {user.name}
                </Link>
              </li>
              <li>
                <Link class="nav-link text-dark text-uppercase" to="/add">
                  Add Product
                </Link>
              </li>
              <li>
                <Link class="nav-link text-dark " onClick={logoutHandler}>
                  logout
                </Link>
              </li>
            </ul>
          )}
          {!user && (
            <ul>
              <li>
                <li>
                  <Link class="nav-link text-dark text-uppercase" to="/contact">
                    Contact us
                  </Link>
                </li>
                <Link
                  class="nav-link text-dark active text-uppercase"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            </ul>
          )}
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  );
}
