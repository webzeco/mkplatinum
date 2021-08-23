/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";
import "./style/navs.css";
export default function Navs() {
  const { user } = useContext(UserContext);
  const contactusHandler = () => {
    var element = document.getElementById("contactUs");
    element.scrollIntoView();
    element.scrollIntoView(false);
    element.scrollIntoView({ block: "end" });
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };
  const logoutHandler = async () => {
    localStorage.removeItem("jwt");
    toast.success("logout  successfully !!!", {
      position: toast.POSITION.TOP_CENTER,
    });

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
          class="img-fluid mx-3 my-2 "
          style={{ height: "80px" }}
          alt="Mk Platinum World"
        />
      </Link>

      {user && (
        <ul>
          <li>
            <a>
              {" "}
              <Link class="nav-link  text-uppercase" to="/">
                Home
              </Link>
            </a>
          </li>
          <li>
            <a>
              <Link class="nav-link  text-uppercase" to="/add">
                {" "}
                <i class="fas fa-user mx-1 "></i>
                {user.name}
              </Link>
            </a>
          </li>
          <li>
            <a>
              <Link class="nav-link  text-uppercase" to="/add">
                Add Product
              </Link>
            </a>
          </li>
          <li>
            <a>
              {" "}
              <Link class="nav-link  " onClick={logoutHandler}>
                logout
              </Link>
            </a>
          </li>
        </ul>
      )}
      {!user && (
        <ul className="mt-3">
          <li>
            {" "}
            <a class="nav-link  text-uppercase">
              <Link to="/">Home</Link>{" "}
            </a>
          </li>
          <li>
            {" "}
            <a class="nav-link  text-uppercase">
              <Link onClick={contactusHandler}>Contact Us</Link>
            </a>
          </li>
          <li>
            {" "}
            <a class="nav-link  active text-uppercase">
              <Link to="/login">Login</Link>
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
