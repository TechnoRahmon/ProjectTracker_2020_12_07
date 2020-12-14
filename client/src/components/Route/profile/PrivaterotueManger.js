import React ,{useContext}from 'react';
import {Redirect, Route} from 'react-router-dom';
import AuthContext from '../../../context/auth/authContext';
import VerticalNav from '../../layout/nav/VerticalNav';
import ProjectList from '../../layout/boards/projectList';
import  './../../../css/styleV1.css';



const PrivateRotuemanger = ({component: Component, ...rest}) => {

    const {isauthenticated ,Token, isLoading ,isSuccess,logout} = useContext(AuthContext)
    //logout()
    //console.log(`isAuth: ${isauthenticated} , isLoading : ${isLoading} success: ${isSuccess}`);  
    return (
     <Route {...rest} render={props=>(
        !Token  ?<Redirect to='/auth/login'/>
            :
            <div className=" container">

                <div className="row myPage ">
                {/* hide on mobile */}
                  
                        <VerticalNav/>
                  
                     
                   
                        <Component {...props}/>    
                    
                    
           
                 </div> 
           </div>
     )}
     
     />

    
    );
}

export default PrivateRotuemanger;
