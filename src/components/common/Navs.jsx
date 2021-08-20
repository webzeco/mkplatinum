/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";
import "./style/navs.css";
export default function Navs() {
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
    <div class="nav-area">
      <input type="checkbox" id="box" />
      <label for="box" class="btn-area">
        <i class="fa fa-bars"></i>
      </label>
      <Link to="/" class="header__logo">
        <img
          // src={`${process.env.REACT_APP_URL}/img/gold pro red.png`}
          src="/mklogo.png"
          class="img-fluid mx-3 my-2"
          style={{ height: "80px" }}
          alt="Mk Platinum World"
        />
      </Link>

      {user && (
        <ul>
          <li>
            <a>
              {" "}
              <Link class="nav-link text-dark text-uppercase" to="/">
                Home
              </Link>
            </a>
          </li>
          <li>
            <a>
              <Link class="nav-link text-dark text-uppercase" to="/add">
                {" "}
                <i class="fas fa-user mx-1 "></i>
                {user.name}
              </Link>
            </a>
          </li>
          <li>
            <a>
              <Link class="nav-link text-dark text-uppercase" to="/add">
                Add Product
              </Link>
            </a>
          </li>
          <li>
            <a>
              {" "}
              <Link class="nav-link text-dark " onClick={logoutHandler}>
                logout
              </Link>
            </a>
          </li>
          {/* <li>    <a class="nav-link text-dark text-uppercase"><Link to='/'>Home</Link> </a></li>  
             <li>    <a class="nav-link text-dark text-uppercase"><Link to='/contact'>Contact Us</Link></a></li>  
             <li>  <a class="nav-link text-dark active text-uppercase" onClick={logoutHandler}  ><Link to='/login'>logout</Link></a></li> */}
        </ul>
      )}
      {!user && (
        <ul className="mt-3">
          <li>
            {" "}
            <a class="nav-link text-dark text-uppercase">
              <Link to="/">Home</Link>{" "}
            </a>
          </li>
          <li>
            {" "}
            <a class="nav-link text-dark text-uppercase">
              <Link to="/contact">Contact Us</Link>
            </a>
          </li>
          <li>
            {" "}
            <a class="nav-link text-dark active text-uppercase">
              <Link to="/login">Login</Link>
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
