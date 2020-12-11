import Home from '../../pages/Home';
import NavBar from '../../layout/nav/Navbar';
import Footer from '../../layout/Footer';
import NotFound from "../../pages/NotFound";

import {Switch, Route} from 'react-router-dom';
import './../../../css/App.css';
import RedirectToAuthRoutes from '../auth/RedirectToAuthRoutes'

import React,{useState} from 'react';

const DefaultRoutes = ({match}) => {
    const [AuthPath, setAuthPath] = useState('');

    const _RedirectToAth=(path)=>{
            setAuthPath(path)
    }
    return (
        <div className="App">

            <NavBar authPath={_RedirectToAth}/>

            <main>
                <Switch>     
                    <Route exact path="/" component={Home} ></Route>              
                    <Route  path={`/auth`} component={()=><RedirectToAuthRoutes authPath={AuthPath}/>} ></Route>

                </Switch>

            </main>
         

        <Footer/>
        </div>
    );
}

export default DefaultRoutes;
