import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../../../context/auth/authContext';
import {useHistory} from 'react-router-dom';

import './../../../css/styleV1.css'
//import './../../css/mediaQ/MQHome.css'


const AuthNavbar =() => {
  const { isTokenValid , Token , isauthenticated, logout, } = useContext(AuthContext)
  
  useEffect(()=>{console.log(`cookies `,Token, isauthenticated);

    isTokenValid(Token)
    
  },[])
  
  return (
    <>
  <div className="navbar-fixed ">

    <nav>

      <div className="  nav-wrapper  white ">

        <ul id="nav-mobile" className="grey-text AuthNav text-darken-4 hide-on-med-and-down ">
          <li >
            <NavLink exact  to="/" className="grey-text text-darken-4 AuthnavLink">Home</NavLink>
                      
          </li>
       
        </ul>
            <a href="#" data-target="slide-out" className="sidenav-trigger "><i className="material-icons">menu</i></a>
        
      </div>
    </nav>
  </div>

    <ul id="slide-out" className="sidenav">
        <li className="center sidenav-close">
            <Link to="/">Home</Link>
        </li>
  </ul>
        


 
  </>
  );
};


export default AuthNavbar;
