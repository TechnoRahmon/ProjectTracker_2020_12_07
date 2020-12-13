import React ,{useState , useEffect, useContext }from 'react';
import {NavLink} from 'react-router-dom';
import AuthContext from '../../../context/auth/authContext';
import SearchBar from './../boards/searchProjects';


const VerticalNav = () => {



    const[ShowInviteBox  ,setShowInviteBox] = useState(false)
    const {userDetails , error : AuthError,getUserDetails,cleanStateError, logout} = useContext(AuthContext)
    const [err, setErr] = useState("");

    useEffect(()=>{
        if(AuthError)setErr(AuthError)
        getUserDetails()
    },[AuthError])
  
    useEffect(()=>{
        setErr(AuthError)
    },[err])

    const _ClearErrorLabel=(e)=>{
        cleanStateError()
        setErr('');
    }
 const SearchUser = (e)=>{

        // search owner State
        const [showOwnerDrop , setShowOnwer] = useState(false);
        const [SearchWord , setSearchWord] = useState([]);
        const [SearchResault , setSearchResault]=useState([])
        const[inputValue , setInputValue] = useState('');


              //search the user
              if(userDetails.length && e.target.value){
                var Regex = new RegExp(e.target.value,'ig')
                let resualt= userDetails.filter(el=>{
                    if (el.fullname.match(Regex))
                        return el.fullname.match(Regex)
                         else setShowOnwer(false);
                    })
                    
                //console.log(resualt)
                setShowOnwer(true);
               // console.log(resualt);
                setSearchResault(resualt)
            }else{
                            setSearchResault('')

            }

 }







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
                            
                            <a href="#" className="indigo-text text-darken-4 right" onClick={()=>{setShowInviteBox(false)}}>
                                <i className="material-icons">close</i>
                            </a>

                            <h3>Invite A Member:</h3> 
                            <div className="divider"></div>
                        <div className="row inputRowInvite">

                            <div className="input-field inputRowInviteCol col s12 l9 ">
                               <h5>Enter Member Email</h5>  
                                <input type="email" name="newUserEmail" id="newUserEmail"/>
                                
                                <form action="#" className="RadioForm">

                                
                                    <p>
                                    <label htmlFor="Admin">
                                        <input name="group1" id="Admin" type="radio"  className="radioBox" />
                                        <span>Admin</span>
                                    </label>
                                    </p>

                                    <p>
                                    <label htmlFor="User">
                                        <input name="group1"  id="User" type="radio" />
                                        <span>User</span>
                                    </label>
                                    </p>

                                    <p>
                                    <label htmlFor="Viwer">
                                        <input name="group1" id="Viwer" type="radio" />
                                        <span>Viwer</span>
                                    </label>
                                    </p>  
                                </form>                        
                             <button className="btn indigo darken-4 left invitButton">invite</button>

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
                        <a href="#" className="logo-brand icons" onClick={()=>{setShowInviteBox(true)}}>
                            <i className="material-icons">person_add</i>

                        </a>  
                   
                    </li>

                      <li> 
                        <a  href="#" onClick={logout} className="logo-brand icons" >
                            <i className="material-icons"><i className="fas fa-sign-out-alt"></i></i>
                        </a>
                    </li>
                    <li> 
                 
                        <a href="#" className="dropdown-trigger" data-target='dropdown1'>
                            <div className="account_img_box">
                                <img src="/person.png" alt="account"/>
                            </div>
                        </a>

             
                    </li>
                </div>
        </ul>
    );
}

export default VerticalNav;
