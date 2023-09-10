import React ,{useState , useEffect, useContext }from 'react';
import {NavLink} from 'react-router-dom';
import AuthContext from '../../../context/auth/authContext';
import Spinner from './../../layout/Spinner';
import AccountDropMenu from './AccountDropMenu';


const VerticalNav = () => {



    const[ShowInviteBox  ,setShowInviteBox] = useState(false)
    const {userDetails ,
        error : AuthError,
        getUserDetails,cleanStateError,
        logout, currentUser, isTokenValid,
        Token , inviteUser, showSpinner } = useContext(AuthContext)

    const [err, setErr] = useState("");

    useEffect(()=>{
        //if(AuthError)setFormError(AuthError)
        getUserDetails()
        isTokenValid(Token)
    },[AuthError,Token])
  
    useEffect(()=>{
        //if (AuthError)setErr(AuthError)
    },[err])

    const _ClearErrorLabel=(e)=>{
        cleanStateError()
        setErr('');
    }

// invitation state variables
const [email , setEmail ] =useState(''); 
const [ role , setRole] =useState('');
const [formError , setFormError ] =useState('');

const _handleInviteSubmission = (e)=>{
    e.preventDefault()
    if( email !== '' && role !==''){
        const newInvitation = {email : email , role :role }
        inviteUser(newInvitation);
        setFormError('');
    }else{
        setFormError('Please Enter Member Informations')
    }  
}

const ClearInvitError=()=>{
    setEmail(''); 
    setRole('');
    setFormError(''); 
    cleanStateError()
    }

    /************* Account Drop Menu States **********/


    return (
        <ul className="col s12 l1 left  vert-nav-box purple darken-4">

        {/* Error Label */}
        {err?
           <div className="error-label "  >
            <h3 className="card z-depth-3">{err}
           
           <button className="btn-flat right errorBtn waves-effect waves-light">
               <i className="material-icons   " onClick={_ClearErrorLabel}>close</i>
            </button> 
            </h3>
            
         </div>:null
        } 


                        {/* invite Box  */}
                   {ShowInviteBox?(

                        <>
                <div className="background-inviteBox" onClick={()=>{setShowInviteBox(false)}}></div>
                    <div className="invite-box card z-depth-3 ">
                            
                            <a href="#" className="indigo-text text-darken-4 right" onClick={()=>{setShowInviteBox(false); ClearInvitError();}}>
                                <i className="material-icons">close</i>
                            </a>

                            <h3>Invite A Member:</h3> 
                            <div className="divider"></div>
                        <div className="row inputRowInvite">


                            <div className="input-field inputRowInviteCol col s12 l9 ">
                            {formError||AuthError?<p className="red-text"><b>{formError||AuthError}</b> </p>:null}

                               <h5>Enter Member Email</h5>  
                                
                            <form action="#" className="RadioForm" name="form" id="inviteForm" onSubmit={_handleInviteSubmission}>

                                <input  type="email" name="newUserEmail" value={email} required id="newUserEmail" onChange={(e)=>{ setEmail(e.target.value);setFormError('');cleanStateError();}}/>

                                <div className="radioFlex" onChange={(e)=>{setRole(e.target.value); setFormError('');cleanStateError();}}>
                                        <p>
                                        <label htmlFor="AdminUser" >
                                            <input name="group1" id="AdminUser" type="radio" value="AdminUser" className="radioBox" />
                                            <span>Admin</span>
                                        </label>
                                        </p>

                                        <p>
                                        <label htmlFor="BasicUser">
                                            <input name="group1" value="BasicUser" id="BasicUser" type="radio" />
                                            <span>User</span>
                                        </label>
                                        </p>

                                        <p>
                                        <label htmlFor="ViwerUser">
                                            <input name="group1" value="ViwerUser" id="ViwerUser" type="radio" />
                                            <span>Viwer</span>
                                        </label>
                                        </p>  
                                </div>                  
                                    <button className="btn indigo darken-4 left invitButton" >   
                                                {showSpinner?
                                                <div class="preloader-wrapper small active">
                                                    <div class="spinner-layer spinner-blue-only small ">
                                                    <div class="circle-clipper left">
                                                        <div class="circle"></div>
                                                    </div><div class="gap-patch">
                                                        <div class="circle"></div>
                                                    </div><div class="circle-clipper right">
                                                        <div class="circle"></div>
                                                    </div>
                                                    </div>
                                                </div>
                                            
                                            : 'invite'}
                                    </button>       

                            </form>                        

                            </div> 

                        </div>

                    </div>
                    </>
                   ):null} 
                       
                            
                      
           


                <div className="top-box">

                    <li> 
                        <NavLink to="#" className="logo-brand icons center">
                            Project Tracker
                        </NavLink>
                    </li>
                    
                    <li> 
                        <NavLink to="/boards" className="icons">
                            <i className="material-icons">dashboard</i>
                        </NavLink>
                    </li>
                    
                </div>  

                 <div className="bottom-box">
                     <li> 
                        <a href="#" className="logo-brand icons" onClick={()=>{console.log(currentUser.user_type); if (currentUser.user_type ==='AdminUser'){
                                    setShowInviteBox(true)}
                                    else{setErr('You Don\'t Have Enough Permission to Invite Members')}}}>

                            <i className="material-icons">person_add</i>

                        </a>  
                   
                    </li>

                      <li> 
                        <a  href="#" onClick={logout} className="logo-brand icons" >
                            <i className="material-icons"><i className="fas fa-sign-out-alt"></i></i>
                        </a>
                    </li>
                    <li className="hoverDropMenu" > 
                                {/* clickable drop menu only for Admin */}
                        <a href="#" className=""  >
                            <div className="account_img_box">
                                <img src="/person.png" alt="account"/>
                            </div>
                        </a>
                      
                          {/* drop menu  */}
                        { currentUser.user_type==='AdminUser'?<AccountDropMenu/>:null}
                    </li>
                </div>
        </ul>
    );
}

export default VerticalNav;
