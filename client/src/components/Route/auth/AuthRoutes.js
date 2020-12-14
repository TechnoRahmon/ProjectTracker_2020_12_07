import Login from '../../auth/login';
import Get_start from '../../auth/Get_start';
import ConfirmInvit from './../../auth/ConfirmInvit';

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
                <Route exact path={`${match.url}/:accountName/:accountId/confirm/user/:userId`} component={ConfirmInvit}></Route>           

            </Switch>


        </div>
    );
}

export default DefaultRoutes;
