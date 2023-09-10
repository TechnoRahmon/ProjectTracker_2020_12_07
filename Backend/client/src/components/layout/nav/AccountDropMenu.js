import React from 'react';
import {NavLink} from 'react-router-dom';

const AccountDropMenu = ({}) => {
    return (
        <div className="AccountDropMenu card " id="AccountDropMenu" >
                <ul className="AccountMenu">
                    <li>
                        <NavLink to="/boards/manger" className="white-text">Mange Uesrs</NavLink>
                    </li>
                </ul>
        </div>
    );
}

export default AccountDropMenu;
