import{
    GET_USER,
 USER_LOGIN  ,
 USER_LOGOUT ,
 VALID_TOKEN ,
 USER_ERROR,
 CLEAR_ERROR,
 ADD_ACCOUNT,
 INVITE_ERROR,
 SHOW_SPINNER,
 INVITE_USER,
 ACCEPT_INVIT,
 ACCEPT_INVIT_ERROR,
 DELETE_USER,DELETE_ERROR

} from  '../types';


export const Reducer = (state, action )=>{

    switch(action.type){
                
        default : return state
        
        case GET_USER:
            return { ...state, userDetails : action.payload }
        
        case USER_ERROR: 
            return { ...state , error : action.payload , isauthenticated : action.auth ,currentUser:{},isLoading:false}
       
        case INVITE_USER: 
            return { ...state ,isLoading:false,  showSpinner:action.payload ,}

        case INVITE_ERROR: 
            return { ...state , error : action.payload ,isLoading:false,showSpinner:false ,}

        case ACCEPT_INVIT: 
            return { ...state ,Token :action.tokenload , isauthenticated: action.auth,
                     error : '',isLoading:false ,currentUser: action.payload }

       case ACCEPT_INVIT_ERROR: 
       console.log(action.payload);
            return { ...state , error : action.payload ,isLoading:false,showSpinner:false ,}



        case CLEAR_ERROR:
            return { ...state , error :'' }
        
 
        case VALID_TOKEN:
            return { ...state, currentUser: action.payload , isauthenticated: action.auth ,isLoading:false}

        case ADD_ACCOUNT:
            return { ...state , Token :action.tokenload , isauthenticated: action.auth,
                    error : '',isLoading:false ,currentUser: action.payload}


        case USER_LOGIN:
            return { ...state , Token :action.tokenload , isauthenticated: action.auth,
                    error : '',isLoading:false ,currentUser: action.payload}
        
        case SHOW_SPINNER:
                //console.log('show spinner reducer');
            return{...state,showSpinner:true,}


        case DELETE_USER:
                const newUsers = state.userDetails.filter(item=> item._id !== action.payload )
                return{ ...state, 
                        userDetails :newUsers, 
                        isSuccess : action.success,
                            }

        case DELETE_ERROR:
                            //console.log(action.payload);
                return{ ...state, 
                        error:action.payload, 
                        isSuccess : action.success,
                        showSpinner:false ,
                        }

        case USER_LOGOUT: 
            return{ ...state , isauthenticated: action.auth ,Token:'', currentUser:{} ,isLoading:false}
     }
}