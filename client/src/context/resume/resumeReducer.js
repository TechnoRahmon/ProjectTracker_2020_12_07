import {    
    GET_RESUMES,
    ADD_RESUME,
    GET_RESUME_DETAILS,
    DELETE_RESUME,
    ERROR_RESUME,
    DOWNLOAD_RESUME,
    LOADDING_ERROR,
    SHOW_SPINNER
} from '../types';



export const resumeReducer = (state , action)=>{

        switch(action.type){

            case GET_RESUMES:
                return{ ...state, 
                        resumes :action.payload, 
                        success : action.success ,
                        showSpinner:false ,}
                


            case ADD_RESUME:
                return{ ...state, 
                        resumes :action.payload, 
                        success : action.success,
                        showSpinner:false ,
                        addSuccess:true }


            case DELETE_RESUME:
                const newResumes = state.resumes.filter(item=> item._id !== action.payload )
                return{ ...state, 
                        resumes :newResumes, 
                        success : action.success } 


            case DOWNLOAD_RESUME:
                break; 


            case ERROR_RESUME:
                //console.log(action.payload);
                return{ ...state, 
                    error:action.payload, 
                    success : action.success,
                    showSpinner:false ,
                    addSuccess:false, }

            case LOADDING_ERROR:
                //console.log(action.payload);
                return{ ...state, 
                    dataLoadingError:action.payload, 
                    success : action.success ,
                    showSpinner:false ,}

            case SHOW_SPINNER:
                    return{
                    ...state,
                    showSpinner:true,
                    }
                    
            default:{
                return state
                }
        }
    
}