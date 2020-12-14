import React ,{ useState , useContext , useEffect } from 'react';
import { useHistory , Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import '../../css/styleV2.css'



const ConfirmInvit = ({match}) => {

    const history = useHistory()


    //importing from AuthProvider 
    const {login,
        isauthenticated,
        error ,
        cleanStateError,
        currentUser,
        acceptInvitation} = useContext(AuthContext)


    const [pass , setPass ] = useState('')
    const [err , setErr ] = useState('')
    const [fullname , setFullname ] = useState('')
   


    useEffect(() => {

        console.log(isauthenticated, currentUser);

        if(isauthenticated){
            //console.log(currentUser);
            history.push(`/boards}`)
        } 
        
        if(error) setErr(error)
    }, [error,currentUser,history]);

    const ConfirmMyAccount = {fullname : fullname , password:pass}
    
    const _handelSub =(e)=>{
            e.preventDefault(); 
            const userID = match.params.userId; 
            const accountID = match.params.accountId;
            acceptInvitation(ConfirmMyAccount,userID,accountID)

            clearError();
    }

    const clearError=(e)=>{
        setErr('')
        setPass('')
        
        cleanStateError()
        
    }


    return (
     
            <div className="container confirmContainer">

                    <div className="row">
                        <div className="col s12 l6 offset-l2 m12">
                        <h1 className="center">Confirm Invitation</h1>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col s12 l6 offset-l2 m12">
                        <h4>You Have Been Invited To {match.params.accountName} Account</h4>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col s12 l6 offset-l2 m12">
                            {/* error message */}
                            <div>{error?( <div id="error" className="alert-p center" ><span> {error} </span>
                                <button onClick={clearError} className="btn-floating btn-small red" style={{marginLeft:"10px"}}> X</button></div>):null}
                            </div>
                        </div>
                    </div>


                <div className="row ">
                    <div className="col s12 l6 offset-l2 ">


                    <form onSubmit={_handelSub}  className="white" autoComplete="off" className="login-form">                      
                    
                            {/* input fields */}
                            <div className="input-field ">
                                <label htmlFor="fullname">Full Name</label>
                                <input type="text" name="fullname" value={fullname} id="fullname" onChange={(e)=>{setFullname(e.target.value)}} required />
                                <p className="alert-p" id="demo"></p>
                            </div>

               

                            <div className="input-field inputboxConfirm">
                                <label htmlFor="pass">Password</label>
                                <input type="password" name="pass" value={pass} id="pass"  onChange={(e)=>{setPass(e.target.value)}} required/>
                                <p className="alert-p" id="demo1"></p>
                            </div>

                  


                            <div className="input-field center">
                                <button className="btn blue ConfirmBtn darken-2 z-depth-0">Login</button>
                         
                            </div>

                        </form>
                    </div>
            </div>

                <div className="divider dividerConfirm"></div>


        <div className="row">
            <div className="col s12 l6 offset-l2 m12 center">
            <p className="invitDes">you will be able to login only to <i> <b>{match.params.accountName} account </b> </i> otherwise you need invitation from account's admin</p>
            </div>
        </div>


    </div>
       
    );
}

export default ConfirmInvit;
