import React, { Fragment, useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './../../css/styleV1.css'
//import './../../css/mediaQ/MQHome.css'
import AuthContext from '../../context/auth/authContext';
import {useHistory} from 'react-router-dom';

const Navbar =() => {
 
  const {isauthenticated , currentUser, logout} = useContext(AuthContext)
  const history = useHistory()

  const M = window.M;
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
  });

  useEffect(() => {
    //loadUser();
    

  },[]);

  // const onLogout = () => {
  //   logout();
  //   clearContacts();
  // };

 // I added background colorm padding and height to the navbar
  return (
    <>
  <div className="navbar-fixed">

    <nav>

      <div className=" indigo accent-4 nav-wrapper">

        <ul id="nav-mobile" className=" hide-on-med-and-down navbar">
          <li >
            <NavLink exact activeClassName="activeNav" to="/">Home</NavLink>
                      
          </li>
          <li >
            <NavLink exact activeClassName="activeNav" to="/projects">Projects</NavLink>
          </li>
          <li >
            <NavLink exact to="/" activeClassName="activeNav">
              Portfolio
            </NavLink>
          </li>
          <li className="center">
            <NavLink to="/resumes" activeClassName="activeNav">Resume</NavLink>
          </li>
          <li className="right">
            <NavLink to="/about" activeClassName="activeNav">About Me</NavLink>
          </li>
          {isauthenticated? 
          <li className="right">{currentUser.firstname} as Admin 
          <i className="fas fa-sign-out-alt btn-flat btn-large white-text logout-link"  onClick={(e)=>{logout(); history.go(0)}}></i></li>
          :<li> <NavLink to="/login" activeClassName="activeNav">Login</NavLink></li>}
        </ul>
            <a href="#" data-target="slide-out" className="sidenav-trigger "><i className="material-icons">menu</i></a>
      <li className="  center title">Elyas Arkin</li>
      </div>
    </nav>
  </div>

    <ul id="slide-out" className="sidenav">
      <li className="center sidenav-close">
            <Link to="/">Home</Link>
          </li >
          <li className="center sidenav-close">
            <Link to="/projects">Projects</Link>
          </li>
          <li className="center sidenav-close">
            <Link to="/" >
              Porfolio
            </Link>
          </li>
          <li className="center sidenav-close">
            <Link to="/resumes">Resume</Link>
          </li>
          <li className="center sidenav-close">
            <Link to="/about">About Me</Link>
          </li>
          {isauthenticated? 
          <li className="right" style={{display:'flex', flexDirection:'column'}}>{currentUser.firstname} as Admin 
          <i className="fas fa-sign-out-alt btn-flat btn-large indigo-text text-accent-4 logout-link"  onClick={(e)=>{logout(); history.go(0)}}></i></li>
          :<li> <NavLink to="/login" activeClassName="activeNav">Login</NavLink></li>}
  </ul>
        


 
  </>
  );
};


export default Navbar;
