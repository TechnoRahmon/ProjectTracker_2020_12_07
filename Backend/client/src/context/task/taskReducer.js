import {    
    GET_TASKS,
    ADD_TASK,
    GET_TASK_DETAILS,
    DELETE_TASK,
    ERROR_TASK,
    LOADDING_ERROR,
    SHOW_SPINNER,
    CLEAR_ERROR
} from '../types';



export const TaskReducer = (state , action)=>{

        switch(action.type){

            case GET_TASKS:
                return{ ...state, 
                        tasks :action.payload, 
                        success : action.success ,
                        showSpinner:false ,}
                


            case ADD_TASK:
                return{ ...state, 
                        tasks :[...state.tasks, action.payload], 
                        success : action.success,
                        showSpinner:false ,
                        addSuccess:true }


            case DELETE_TASK:
                const newtasks = state.tasks.filter(item=> item._id !== action.payload )
                return{ ...state, 
                        tasks :newtasks, 
                        success : action.success } 


      

            case ERROR_TASK:
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
                    showSpinner:false ,
                    tasks:[]}

            case SHOW_SPINNER:
                    return{
                    ...state,
                    showSpinner:true,
                    }

                    case CLEAR_ERROR:
                        return {
                          ...state,
                          error: null,
                          //isLoading: true,//updated to true
                          success:false, //updated
                          
                        }
                    
            default:{
                return state
                }
        }
    
}