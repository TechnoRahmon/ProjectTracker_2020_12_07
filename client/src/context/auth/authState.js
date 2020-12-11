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
}




    //create store
    const [state, dispatch] = useReducer(Reducer, initialState)


    //getUser details 

    async function getUserDetails(){
        try{
                const userResp = await axios.get('/api/v1/users');
                dispatch({type : GET_USER , payload:userResp.data.data });
        }
        catch(err){
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
                console.log('isTokenValid',TokenResp.data.success);
                dispatch({ type:VALID_TOKEN , payload: TokenResp.data.user ,auth:true  })
            }
            catch(err){
                dispatch({ type:USER_ERROR , payload: err.response.data.msg , auth:false })
            }
    }
    

    // login proccess
    async function login(loginDetails){
        try{
            const loginResp =  await axios.post('/api/v1/login',loginDetails);
            //seting up the Token in the localStorage 
            localStorage.setItem('auth-token',loginResp.data.token )
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
            //functoins 
            isTokenValid,login,logout,cleanStateError,getUserDetails
        }}>

            {children}
        </AuthContext.Provider >
    )
}