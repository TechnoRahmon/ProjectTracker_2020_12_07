
import React ,{ useState , useContext , useEffect } from 'react';
import { useHistory , Link } from 'react-router-dom';
import { useCookies  } from 'react-cookie';
import AuthContext from '../../context/auth/authContext';
import RedirectToProfile from '../Route/profile/RedirectToProfile';
import '../../css/styleV2.css'

const Login = () => {
    
    const history = useHistory()


    //importing from AuthProvider 
    const {login, isauthenticated, error , cleanStateError, currentUser} = useContext(AuthContext)
    const [email , setEmail ] = useState('admin@tracker.com')
    const [pass , setPass ] = useState('P@ssw0rd')
    const [err , setErr ] = useState('')
    const [accountName , setAccountName ] = useState('Admin')


    useEffect(() => {

        console.log(isauthenticated, currentUser);

        if(isauthenticated){
            //console.log(currentUser);
            history.push(`/boards}`)
        
        } 
        if(error) setErr(error)
    }, [error,currentUser,history]);


    const newLogin = {email : email.toLowerCase() , password:pass, account_name:accountName}
    const _handelSub =(e)=>{
            e.preventDefault(); 
            login(newLogin)
    }

    const clearError=(e)=>{
        setErr('')
        setPass('')
        setEmail('')
        setAccountName('')
        cleanStateError()
        
    }
    return (
        <div className="container confirmContainer">

                <div className="row">
                    <div className="col s12 l6 offset-l2 m12">
                    <h1 className="center">Login</h1>
                    </div>
                </div>


                <div className="row">
                    <div className="col s12 l6 offset-l2 m12">
                        {/* error message */}
                        <div>{error?( <div id="error" className="center alert-p" ><span> {error} </span>
                            <button onClick={clearError} className="btn-floating btn-small red" style={{marginLeft:"10px"}}> X</button></div>):null}
                        </div>
                    </div>
                </div>


            <div className="row ">
                <div className="col s12 l6 offset-l2 ">


                    <form onSubmit={_handelSub}  className="white login-form" autoComplete="off">                      
                     
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
                                <label htmlFor="accountName">Account Name</label>
                                <input type="text" name="accountName" value={accountName} id="accountName" onChange={(e)=>{setAccountName(e.target.value)}} required />
                                <p className="alert-p" id="demo"></p>
                            </div>

                            <div className="input-field center">
                                <button className="btn blue darken-2 z-depth-0">Login</button>
                                <br/>
                                <span className="right linkSpan">
                                     <h6>Don't Have an account...
                                    <Link to="/auth/get-start" onClick={cleanStateError}>Regiser</Link>
                                    </h6>
                                </span>
                            </div>


                        </form>


                </div>

            </div>
  


            <div className="divider dividerConfirm"></div>


            <div className="row">
                <div className="col s12 l6 offset-l2 m12 center">
                <p className="invitDes"> you need invitation from account's admin to be able to login into <b>PROJECT TRACKER</b> account.</p> 
                </div>
            </div>

            
        </div>
    );
}

export default Login;
