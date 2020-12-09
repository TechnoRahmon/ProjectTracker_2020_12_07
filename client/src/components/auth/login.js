
import React ,{ useState , useContext , useEffect } from 'react';
import { useHistory , Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import '../../css/styleV2.css'

const Login = () => {
    
    const history = useHistory()
    //importing from AuthProvider 
    const {login, isauthenticated, error , cleanStateError } = useContext(AuthContext)
    const [email , setEmail ] = useState('')
    const [pass , setPass ] = useState('')
    const [err , setErr ] = useState('')


    useEffect(() => {
        if(isauthenticated)history.push('/')
        if(error) setErr(error)
    }, [error,isauthenticated,history]);


    const newLogin = {email : email.toLowerCase() , password:pass}
    const _handelSub =(e)=>{
            e.preventDefault(); 
            login(newLogin)
    }

    const clearError=(e)=>{
        setErr('')
        setPass('')
        setEmail('')
        cleanStateError()
        
    }
    return (
        <div className="container">

                <div className="row">
                    <div className="col s12 l6 offset-l2 m12">
                    <h4>Login</h4>
                    </div>
                </div>


                <div className="row">
                    <div className="col s12 l6 offset-l2 m12">
                        {/* error message */}
                        <div>{error?( <div id="error" className="alert-p" ><span> {error} </span>
                            <button onClick={clearError} className="btn-floating btn-small red" style={{marginLeft:"10px"}}> X</button></div>):null}
                        </div>
                    </div>
                </div>


            <div className="row ">
                <div className="col s12 l6 offset-l2 ">


                    <form onSubmit={_handelSub}  className="white" autoComplete="off" className="login-form">                      
                     
                            {/* input fields */}
                            <div className="input-field">
                                <label htmlFor="email">E-Mail</label>
                                <input type="email" name="email" value={email} id="email" onChange={(e)=>{setEmail(e.target.value)}} required />
                                <p className="alert-p" id="demo"></p>
                            </div>

                            <div className="input-field">
                                <label htmlFor="pass">Password</label>
                                <input type="password" name="pass" value={pass} id="pass"  onChange={(e)=>{setPass(e.target.value)}} required/>
                                <p className="alert-p" id="demo1"></p>
                            </div>


                            <div className="input-field">
                                <button className="btn blue darken-2 z-depth-0">Login</button>
                    
                            </div>

                        </form>


                </div>

            </div>
  
            
        </div>
    );
}

export default Login;
