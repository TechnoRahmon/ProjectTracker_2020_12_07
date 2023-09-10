import {useReducer} from 'react';
import axios from 'axios';
import TaskContext from './taskContext';
import {TaskReducer} from './taskReducer';

import {    
    GET_TASKS,
    ADD_TASK,
    GET_TASK_DETAILS,
    DELETE_TASK,
    ERROR_TASK,
    DOWNLOAD_TASK,
    LOGGDING_ERROR,
    LOADDING_ERROR,
    SHOW_SPINNER,
    CLEAR_ERROR,
    UPDATE_TASK
} from '../types';


const TaskState = ({children})=>{


        const initState = {
            tasks : [],
            error :null, //uploadError
            success:false,
            dataLoadingError :null,// data getting Error
            showSpinner:false,
            addSuccess:false,
            
        }

        const [state, dispatch ] = useReducer(TaskReducer,initState)


        //get task
        const getTasks =async (id)=>{
            await StartshowSpinner()
            try{
                
                const task = await axios.get(`/api/v3/project/${id}/tasks`)
                    dispatch({  type :GET_TASKS,
                                payload:task.data.data,
                                success:task.data.success,
                                 })
            }   
            catch(err){
                console.log(err);
                dispatch({ type :LOADDING_ERROR, payload:err.response.data.error ,success:err.response.data.succeses})
            }
        }



    //add new task
    const addtask =async (id)=>{
        try{await StartshowSpinner()
            
            const task = await axios.post(`/api/v3/project/${id}/tasks`)
                dispatch({ type :ADD_TASK, payload:task.data.data ,success:task.data.success})
            getTasks(id)
        }   
        catch(err){
            console.log(err.response);
            dispatch({ type :ERROR_TASK, payload:err.response.data.error, success:err.response.data.succeses})
        }
    }


// update task
const updateTask = async (NewTask,projectId,taskId) =>{

    try {
        const config= { headers:{ accept:'application/json'}, data:{}}
        const task = await axios.put(`/api/v3/project/${projectId}/task/${taskId}`,NewTask,config)
        getTasks(projectId)
    } catch (err) {
    dispatch({ type :ERROR_TASK, payload:err.response.data.error ,success:err.response.data.succeses })
    }
}


    //delete task
    const deletetask =async (projectId,taskId)=>{
        try{
            
            const task = await axios.delete(`/api/v3/project/${projectId}/task/${taskId}`)
                dispatch({ type :DELETE_TASK ,payload: taskId ,success:task.data.success})
        }   
        catch(err){
            dispatch({ type :ERROR_TASK, payload:err.response.data.error ,success:err.response.data.succeses })
        }

    }


    const StartshowSpinner=()=>{
        dispatch({
          type:SHOW_SPINNER,
          payload:true,
        })
     }


     const ClearTaskError = ()=>{
        dispatch({
          type:CLEAR_ERROR,
   
        })
           
      }
    return(
        <TaskContext.Provider value={{
            tasks : state.tasks,
            error : state.error,
            success: state.success,
            dataLoadingError: state.dataLoadingError,
            showSpinner:state.showSpinner,
            addSuccess:state.addSuccess,
            getTasks,//test DONE
            addtask,//test DONE
            deletetask,//test  DONE
            StartshowSpinner,//test 
            ClearTaskError,//test,
            updateTask // test DONE
        }}>

            {children}
        </TaskContext.Provider>
    )
}

export default TaskState