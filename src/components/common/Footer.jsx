import React, { useState } from "react";
import "./style/footer.css";
import { Link } from "react-router-dom";
function Footer() {
  const [email, setEmail] = useState("");
  const setEmailHandler = (e) => {
    setEmail(e.target.value);
  };
  return (
    <footer id="footer">
      <div class="footer-top">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6 footer-contact">
              <h3>
                <a href="index.html">
                  <img
                    // src={`${process.env.REACT_APP_URL}/img/gold pro red.png`}
                    src="/mklogo.png"
                    style={{ height: "70px" }}
                    alt="Mk Platinum World"
                  />
                </a>
              </h3>
              <p>
                <strong>Phone:</strong>+447537143824
                <br />
                <strong>Email:</strong>mksilverplatinium@gmail.com
                <br />
              </p>
            </div>
          </div>
        </div>
        <div
          class="container footer-bottom clearfix"
          style={{ backgroundColor: "#ffff" }}
        >
          <div class="copyright" style={{ color: "#1b58b7" }}>
            &copy; Copyright{" "}
            <strong>
              <span>Mk Platinum World</span>
            </strong>
            . All Rights Reserved
          </div>
          <div class="credits fw-bold">
            Designed by <a href="https://webzeco.com/">Webzeco.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
