import Login from '../../auth/login';
import Get_start from '../../auth/Get_start';

import AuthNavBar from '../../layout/nav/AuthNavBar';
import {Switch, Route, Redirect} from 'react-router-dom';
import './../../../css/App.css';

import React from 'react';

const DefaultRoutes = ({match}) => {

    //console.log(match);

    return (
        <div>

            <AuthNavBar/>

            <Switch>    
                <Route exact path={`${match.url}/login`} component={Login}></Route>
                <Route exact path={`${match.url}/get-start`} component={Get_start}></Route>           
                
            </Switch>


        </div>
    );
}

export default DefaultRoutes;
