import React ,{useContext}from 'react';
import {Redirect, Route} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';


const PrivateRotue = ({component: Component, ...rest}) => {

    const {isauthenticated , isLoading} = useContext(AuthContext)

    console.log(`isAuth: ${isauthenticated} , isLoading : ${isLoading}`);  
    return (
     <Route {...rest} render={props=>(
        !isauthenticated && !isLoading?<Redirect to='/'/>
            :<Component {...props}/> 
     )}
     
     />

    
    );
}

export default PrivateRotue;
