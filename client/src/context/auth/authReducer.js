import{
 USER_LOGIN  ,
 USER_LOGOUT ,
 VALID_TOKEN ,
 USER_ERROR,
 CLEAR_ERROR,
} from  '../types';


export const Reducer = (state, action )=>{

    switch(action.type){
                
        default : return state
        
  
        case USER_ERROR: 
            return { ...state , error : action.payload , isauthenticated : action.auth ,currentUser:[],isLoading:false}

     
        case CLEAR_ERROR:
            return { ...state , error :'' }
        
 
        case VALID_TOKEN:
            return { ...state, currentUser: action.payload , isauthenticated: action.auth ,isLoading:false}


        case USER_LOGIN:
            return { ...state , Token :action.tokenload , isauthenticated: action.auth,
                    error : '',isLoading:false }
        
        case USER_LOGOUT: 
            return{ ...state , isauthenticated: action.auth , currentUser:[] ,isLoading:false}
     }
}