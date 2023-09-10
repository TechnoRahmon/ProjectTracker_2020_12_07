import React from "react";
import { Link } from "react-router-dom";
import "../../css/styleV1.css";
const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="container">
        <div className="row">
          <div className=" col s12 l4 offset-l4 center">
           
            <div className="icons ">
              <Link to="#">
                {" "}
                <i className="material-icons indigo-text text-darken-2">facebook</i>
              </Link>
              <Link to="#">
                {" "}
                <i className="fab fa-twitter indigo-text text-darken-2"></i>
              </Link>
              <Link to="#">
                {" "}
                <i className="fab fa-github indigo-text text-darken-2"></i>
              </Link>
              <Link to="#">
                {" "}
                <i className="fab fa-linkedin-in indigo-text text-darken-2"></i>
              </Link>
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
