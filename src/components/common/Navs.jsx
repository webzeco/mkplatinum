/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { UserContext } from '../contexts/UserContext';
import './style/navs.css'
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
    return () => { };
  }, []);
    return (
        <div class="nav-area">
        <input type="checkbox" id="box"/>
        <label for="box" class="btn-area"><i class="fa fa-bars"></i></label>
        <label class="logo"><img src="https://i.postimg.cc/BvSwQTb3/logo.png" alt=""/></label>
        {user&&(
                        <ul>
             <li><a> <Link class="nav-link text-dark text-uppercase" to="/">Home</Link></a></li>
              <li>
              <a><Link class="nav-link text-dark text-uppercase" to="/add"> <i class="fas fa-user mx-1 "></i>{user.name}</Link></a></li>
              <li><a><Link class="nav-link text-dark text-uppercase" to="/add">Add Product</Link></a></li>
              <li><a> <Link class="nav-link text-dark " onClick={logoutHandler} >logout</Link></a></li>
 {/* <li>    <a class="nav-link text-dark text-uppercase"><Link to='/'>Home</Link> </a></li>  
             <li>    <a class="nav-link text-dark text-uppercase"><Link to='/contact'>Contact Us</Link></a></li>  
             <li>  <a class="nav-link text-dark active text-uppercase" onClick={logoutHandler}  ><Link to='/login'>logout</Link></a></li> */}
              </ul>
            )}
            {!user&& <ul>
                <li>    <a class="nav-link text-dark text-uppercase"><Link to='/'>Home</Link> </a></li>  
             <li>    <a class="nav-link text-dark text-uppercase"><Link to='/contact'>Contact Us</Link></a></li>  
             <li>  <a class="nav-link text-dark active text-uppercase" ><Link to='/login'>Login</Link></a></li>
              </ul> }
        {/* <ul>

      <li><a href="/">Home</a></li>
      <li><a href="/">Contact Us</a></li>
      <li><a href="/">Portfolio</a></li>
      <li><a href="/">Services</a></li>
      <li><a href="/">Blog</a></li>
      <li><a href="/">Contact</a></li>
      </ul> */}
      </div>
      
    )
}
