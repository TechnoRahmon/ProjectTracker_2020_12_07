import React,{ useReducer , createContext }from 'react';
import { Reducer } from './authReducer';
import axios from 'axios';
import AuthContext from './authContext';
import {useCookies} from 'react-cookie';


//create initialState 


import{
    GET_USER,
    USER_LOGIN  ,
    USER_LOGOUT ,
    VALID_TOKEN ,
    USER_ERROR,
    CLEAR_ERROR,
    INVITE_USER,
    INVITE_ERROR,
    ACCEPT_INVIT,
    ACCEPT_INVIT_ERROR,
    ADD_ACCOUNT,
    SHOW_SPINNER,
    UPDATE_USER,
    UPDATE_ERROR,
    DELETE_USER,
    DELETE_ERROR
   } from  '../types';





// create GlobalProvider function (the store)

export const AuthState = ({children})=>{




    const [cookies , setCookies , removeCookies] = useCookies([])


    const initialState = {
        isLoading:true , 
        error :null,
        isauthenticated:false,
        Token: cookies.token,
        currentUser:{},
        userDetails:[],
        registrationSuccess:false,
        isSuccess:false,
        showSpinner:false,
}




    //create store
    const [state, dispatch] = useReducer(Reducer, initialState)


    //getUser details 
    async function getUserDetails(){
        try{
                const userResp = await axios.get('/api/v1/users');
                // console.log('from AuthState : ',userResp.data.data);
                dispatch({type : GET_USER , payload:userResp.data.data });
        }
        catch(err){
            console.log(err.response.data.error)
            dispatch({ type:USER_ERROR , payload: err.response.data.error , auth:false })
            }
        }

    //check the Token validation. 
    // we are sending the token as headers parameter via post request !! 
    async function isTokenValid(token){
            try{
                
                // console.log('Token from AuthState :',state.Token);
                // console.log('config from  AuthState',config);
                const TokenResp = await axios.get('/api/v1/valid')
                //console.log('isTokenValid',TokenResp.data.success);
                dispatch({ type:VALID_TOKEN , payload: TokenResp.data.user ,auth:true  })
            }
            catch(err){
                dispatch({ type:USER_ERROR , payload: err.response.data.msg , auth:false })
            }
    }
    

    // login proccess
    async function login(loginDetails){
        try{
            const config= { headers :{ accept:'application/json'}, data:{}}
            const loginResp =  await axios.post('/api/v1/login',loginDetails,config);
            //seting up the Token in the Cookies 
            setCookies('token',loginResp.data.token ,{path:'/'})
            console.log(`loginResp.data.user ${loginResp.data.user}`);
            dispatch({ type:USER_LOGIN , payload:loginResp.data.user , auth:true,
                        tokenload: loginResp.data.token })
        }
        catch(err){
            console.log(err);
            dispatch({ type:USER_ERROR , payload: err.response.data.msg , auth:false })
        }
    }

    // Add New Account
    const addNewAccount= async(newAccountInfo)=>{
        try {            
        const config= { headers :{ accept:'application/json'}, data:{}}
        const newAccount = await axios.post(`/api/v1/users`,newAccountInfo,config);
        //seting up the Token in the Cookies 
        setCookies('token',newAccount.data.token ,{path:'/'})
        dispatch({ type: ADD_ACCOUNT , 
                payload:newAccount.data.data, auth:true,
                tokenload:newAccount.data.token,  })

        } catch (err) {
            console.log(err);
        dispatch({ type:USER_ERROR , payload: err.response.data.msg , auth:false })
        }
    }



    //Update User 
    const updateUser = async (role, userId)=>{

        try {
            const config= { headers :{ accept:'application/json'}, data:{}}
            
            const updatedUser = await axios.put(`/api/v1/user/${userId}`,role, config);

            getUserDetails()
        } catch (err) {
            console.log(err.response.data.msg)
            dispatch({ type:DELETE_ERROR , payload: err.response.data.msg , auth:false })
        }
    }

    // DELETE USER 
    const deleteUser = async(userId) =>{
            try {
                const deleteUser = await axios.delete(`/api/v1/user/${userId}`); 
                dispatch({ type:DELETE_USER ,payload: userId ,success:deleteUser.data.success })
                getUserDetails();
            } catch (err) {
                console.log(err.response.data.msg)
            dispatch({ type:DELETE_ERROR , payload: err.response.data.msg , auth:false })
            }
    }

    
    //invite User 
    const inviteUser =async (userInfo)=>{
        try {
            await StartshowSpinner()  // calling the spinner
            const config = { headers : {accept :'application/json'},data:{}}
            const invitation  = await axios.post(`/api/v1/users/invite`,userInfo,config)
            console.log(invitation.data.msg)
        dispatch({ type:INVITE_USER , payload:false  })

        } catch (err) {
            console.log(err);
            dispatch({ type:INVITE_ERROR , payload: err.response.data.message  })
        }
    }

    //accept invitation 
    const acceptInvitation =async (userInfo,userId,accountId)=>{
        
        try {
            const config = { headers : {accept :'application/json'},data:{}}
            const VerifiedUser  = await axios.put(`/api/v1/${accountId}/users/${userId}`,userInfo,config)
            //seting up the Token in the Cookies 
            setCookies('token',VerifiedUser.data.token ,{path:'/'})
            
            dispatch({ type: ACCEPT_INVIT ,  payload:VerifiedUser.data.data, auth:true,
                        tokenload:VerifiedUser.data.token,  })
           
        } catch (err) {
            console.log(err);
            dispatch({ type:ACCEPT_INVIT_ERROR , payload: err.response.data.msg , auth:false })
        }
    }



    // logout function
    async function logout(){
        try {
            console.log('loging out..');
        
            const LogoutRes = await axios.get('/api/v1/logout')
            dispatch({type:USER_LOGOUT , auth:!LogoutRes.data.success })

        } catch (err) {
            console.log(err);
            dispatch({ type:USER_ERROR , payload: err.response.data.msg , auth:false })
        }

    }

    // show Spinner
    const StartshowSpinner=()=>{
        dispatch({
          type:SHOW_SPINNER,
          payload:true,
        })
     }



       // Clean Error function
       async function cleanStateError(){
            dispatch({type:CLEAR_ERROR , auth:false,  })
    }





    // return react component  GlobalContext Provider  with all functions accessibility
    return (
        <AuthContext.Provider value={{
            //state
            isLoading:state.isLoading , 
            error :state.error,
            isauthenticated:state.isauthenticated,
            Token:state.Token,
            currentUser:state.currentUser,
            registrationSuccess:state.registrationSuccess,
            isSuccess:state.isSuccess,
            userDetails:state.userDetails,
            showSpinner:state.showSpinner,
            //functoins 
            isTokenValid,login,logout,
            cleanStateError,getUserDetails,
            addNewAccount,
            inviteUser,acceptInvitation,
            StartshowSpinner,
            deleteUser,
            updateUser,
        }}>

            {children}
        </AuthContext.Provider >
    )
}