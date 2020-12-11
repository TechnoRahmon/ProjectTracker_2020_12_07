import React from 'react';
import {NavLink} from 'react-router-dom';



const VerticalNav = () => {

    
    return (
        <ul className="col s12 l1 left  vert-nav-box red">
                <div className="top-box">

                    <li> 
                        <NavLink to="#" className="logo-brand icons center">
                            Project Tracker
                        </NavLink>
                    </li>
                    
                    <li> 
                        <NavLink to="/" className="icons">
                            <i className="material-icons">dashboard</i>
                        </NavLink>
                    </li>
                    
                </div>  

                 <div className="bottom-box">
                     <li> 
                        <NavLink to="/" className="logo-brand icons">
                            <i className="material-icons">person_add</i>
                        </NavLink>
                    </li>
                    
                    <li> 
                        <NavLink to="/" className=" icons">
                            <div className="account_img_box">
                                <img src="/logo.png" alt="account"/>
                            </div>
                        </NavLink>
                    </li>
                </div>
        </ul>
    );
}

export default VerticalNav;
