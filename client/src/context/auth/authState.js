import React,{ useReducer , createContext }from 'react';
import { Reducer } from './authReducer';
import axios from 'axios';
import AuthContext from './authContext';
//create initialState 


import{
    USER_LOGIN  ,
    USER_LOGOUT ,
    VALID_TOKEN ,
    USER_ERROR,
    CLEAR_ERROR,
   } from  '../types';


const initialState = {
        isLoading:true , 
        error :null,
        isauthenticated:false,
        Token:localStorage.getItem('auth-token'),
        currentUser:[],
        registrationSuccess:false,
}


// create GlobalProvider function (the store)

export const AuthState = ({children})=>{

    //create store
    const [state, dispatch] = useReducer(Reducer, initialState)




    //check the Token validation. 
    // we are sending the token as headers parameter via post request !! 
    async function isTokenValid(token){
            try{
                const config= { headers :{ 'x-auth-token':token}}
                // console.log('Token from AuthState :',state.Token);
                // console.log('config from  AuthState',config);
                const TokenResp = await axios.post('/api/v4/valid',null,config)
                dispatch({ type:VALID_TOKEN , payload: TokenResp.data.user ,auth:true  })
            }
            catch(err){
                dispatch({ type:USER_ERROR , payload: err.response.data.msg , auth:false })
            }
    }
    

    // login proccess
    async function login(loginDetails){
        try{
            const loginResp =  await axios.post('/api/v4/login',loginDetails);
            //seting up the Token in the localStorage 
            localStorage.setItem('auth-token',loginResp.data.token )
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
        console.log('loging out..');
            localStorage.setItem('auth-token','');
            dispatch({type:USER_LOGOUT , auth:false })
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
            //functoins 
            isTokenValid,login,logout,cleanStateError
        }}>

            {children}
        </AuthContext.Provider >
    )
}