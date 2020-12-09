import React from "react";
import { Link } from "react-router-dom";
import "../../css/styleV1.css";
const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="container">
        <div className="row">
          <div className=" colmns">
            <div className="col l4 offset-l2 s12 footer_list">
              <ul className="footer_list">
                <li>
                  <Link className="grey-text text-lighten-3" to="/skills">
                   Skills
                  </Link>
                </li>

                <li>
                  {" "}
                  <Link className="grey-text text-lighten-3" to="/experience">
                    Experience
                  </Link>
                </li>
                <li>
                  <Link
                    className="grey-text text-lighten-3"
                    to="/certification"
                  >
                    Certification
                  </Link>
                </li>
                <li>
                  <Link className="grey-text text-lighten-3" to="/education">
                    Education
                  </Link>
                </li>
              </ul>
            </div>
            <div className="icons">
              <Link to="#">
                {" "}
                <i className="material-icons">facebook</i>
              </Link>
              <Link to="#">
                {" "}
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="#">
                {" "}
                <i className="fab fa-github"></i>
              </Link>
              <Link to="#">
                {" "}
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>
            <div className="contact_info">
              <div className="email">
                <i className="far fa-envelope"></i> email.com
              </div>
              <div className="phone">
                <i className="fas fa-mobile-alt"></i> +78945613
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright ">
        <div className="container">
          © 2020 Copyright AE
        </div>
      </div>
    </footer>
  );
};

export default Footer;
