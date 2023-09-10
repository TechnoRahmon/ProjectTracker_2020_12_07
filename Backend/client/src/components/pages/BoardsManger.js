import React ,{useState , useEffect, useContext }from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';



const BoardsManger = () => {

    const history = useHistory();
    // materialize CSS  styling
    const M=window.M; 
    document.addEventListener('DOMContentLoaded', function() {
        var myTabs = document.querySelectorAll('.tabs');
         M.Tabs.init(myTabs, {});
      });

      document.addEventListener('DOMContentLoaded', function() {
        var CollapsIcons = document.querySelectorAll('.collapsible');
        var CollapsIconsInstance = M.Collapsible.init(CollapsIcons, {});
      });

      document.addEventListener('DOMContentLoaded', function() {
        var DropInput = document.querySelectorAll('select');
        var instances = M.FormSelect.init(DropInput, {});
      });
    /************************************************* */




    const {userDetails, isTokenValid, Token,isauthenticated,
         getUserDetails,
         currentUser,
         updateUser,
         deleteUser,
        error,
        logout,
        cleanStateError} = useContext(AuthContext)



      useEffect(()=>{
            getUserDetails();
            isTokenValid(Token)
            if (!isauthenticated)history.push('/auth/login')
      },[Token,isauthenticated ])



      const [showEditMode , setEditMode] = useState('');

      const _handleEditMode = (id)=>{

            if(userDetails){
                    userDetails.map(el=>{
                            if (el._id === id){
                                console.log(document.getElementById(`box${id}`).style.display);
                                    if ( document.getElementById(`box${id}`).style.display===''|| document.getElementById(`box${id}`).style.display==='none' ){
                                        document.getElementById(`box${id}`).style.display='flex'
                                    }else{
                                     document.getElementById(`box${id}`).style.display='none'

                                    }
                                    
                            }
                    })
            }
      }

/***********************  _ handle update user ************************** */
      const [ err , setErr ] = useState('');

      const Count_Admins = (users)=>{
          let count = 0; 
            userDetails.map(el=>{
                        if(el.user_type ==='AdminUser')count++; 
                })
                return count;
      }

      const _handleUpdateUser = (value ,user)=>{
            console.log(user._id === currentUser.id)
            if (userDetails && 
                (Count_Admins(userDetails)===1 && user.user_type==='AdminUser' && ( value ==='BasicUser'||value ==='ViwerUser')) ||
                (Count_Admins(userDetails)>1 && user._id === currentUser.id )  ){
                            setErr('You Can\'t Change Your Own Privilege' )
                            
                            console.log(currentUser.fullname)
            }else{
                const newRole  = {role : value}
                updateUser(newRole, user._id)
                    console.log(`change ${user.fullname} to ${value}`)
                    _handleEditMode(user._id)
                    setErr('')
            }
      }
/***********************  _ handle Delete user ************************** */

const _handleDeleteUser = (user)=>{
    console.log(Count_Admins(userDetails))
        if ( user._id  === currentUser.id && Count_Admins(userDetails)===1 ){
                setErr('Account Should Have At Least One Admin')
        }else if( user._id  === currentUser.id ){
            logout()
            deleteUser(user._id)
            // console.log(`delete ${user.fullname} yourself`)
               
        }else{
            deleteUser(user._id)
            _handleEditMode(user._id)

            // console.log(`delete ${user.fullname}`)
            // console.log(`delete `,currentUser)
        }
}





    return (
        <div className="container  MangerContainer">


            <div className="row white MangerRow">
                <div className="col s12 l11 colManger">
                    <h2 className="mangerTitle">Board Manger</h2>
                </div>
            </div>

           <div className="row white MangerRow">
                <div className="col s12 l11 colManger">
                    {err? <p className="center red-text text-darken-2"><b>{err}</b></p>:null}
                </div>
            </div>
            
    <div className="row MangerRow">
        <div className="col s12">
        <ul className="tabs MangerTabs purple darken-4">
            <li className="tab col s3"><a className=" white-text active" href="#users">Users</a></li>
        </ul>
        </div> 


        <div id="users" className="col s12">


                <table className="highlight">
                    <thead>
                    <tr>
                        <th >Member</th>
                        <th >Email</th>
                        <th>Privileges</th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>

            {userDetails?( userDetails.map(el=>{
           return(
           <>
                <tr>
                    <td >{el.fullname}</td>
                    <td>{el.email}</td>
                    <td>{el.user_type}</td>
                    <td className="left EditIconBox">
                        <a href="#" class="" onClick={()=>{_handleEditMode(el._id);setErr('');}}><i class="material-icons EditIcon indigo-text text-darken-4">edit</i></a >
                        {/* <a href="#"><i className="material-icons indigo-text text-darken-4">edit</i></a> */}
                    </td>
                </tr>

                <tr className="grey lighten-4 editBox " id={`box${el._id}`}>

                    <td className="edit-Box-1 " colSpan="1">
                        <div className="col s12 l12 desFlexBox">
                            <p className="">Change Member Privileges:</p>
                            <p>Delete Member From {el.account_id.name} account :</p>
                        </div>
                    </td>

                  <div className="gap" colSpan="2"></div>

                    <td className="edit-Box-2 " colSpan="2">
                        <div className="row">

                            <div class="input-field col s12 l6 ">
                                <select className="browser-default selectMember" 
                                    onChange={(e)=>{_handleUpdateUser(e.target.value,el); }}>

                                <option value="" disabled selected className="selectTitle">Member</option>
                                <option value="BasicUser">Basic User</option>
                                <option value="ViwerUser">Viwer User</option>
                                <option value="AdminUser">Admin</option>
                                </select>
                            
                            </div> 
                        </div>
                    <div className="row">
                        <div className="input-field col s12 l6">
                            <button className="btn red darken-2 waves-effect waves-light" 
                            onClick={()=>{_handleDeleteUser(el)}}>Delete Member</button>

                        </div>

                    </div>
          
                    </td>
              </tr> 

            </>)
            })): (<p>No Users Found</p>)}
             



                </tbody>
            </table>

        </div>

    </div>

            

        </div>
    );
}

export default BoardsManger;
