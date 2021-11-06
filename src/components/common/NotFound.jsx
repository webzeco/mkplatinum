import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="container">
    <h1 className="mt-5">404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);

export default NotFound;
