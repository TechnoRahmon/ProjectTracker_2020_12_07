import {useReducer} from 'react';
import axios from 'axios';
import ResumeContext from './resumeContext';
import {resumeReducer} from './resumeReducer';

import {    
    GET_RESUMES,
    ADD_RESUME,
    GET_RESUME_DETAILS,
    DELETE_RESUME,
    ERROR_RESUME,
    DOWNLOAD_RESUME,
    LOGGDING_ERROR,
    LOADDING_ERROR,
    SHOW_SPINNER
} from '../types';
import { stat } from 'fs';

const ResumeState = ({children})=>{


        const initState = {
            resumes : [],
            error :null, //uploadError
            success:false,
            dataLoadingError :null,// data getting Error
            showSpinner:false,
            addSuccess:false,
            
        }

        const [state, dispatch ] = useReducer(resumeReducer,initState)


        //get resume
        const getResume =async ()=>{await StartshowSpinner()
            try{
                
                const resume = await axios.get('/api/v2/resumes')
                    dispatch({  type :GET_RESUMES,
                                payload:resume.data.data,
                                success:resume.data.success,
                                 })
            }   
            catch(err){
                dispatch({ type :LOADDING_ERROR, payload:err.response.data.error ,success:err.response.data.succeses})
            }
        }



    //add new resume
    const addResume =async (newResume)=>{
        try{await StartshowSpinner()
            const config={ headers:{'Content-Type':'multipart/form-data'}} 
            const resume = await axios.post('/api/v2/resumes',newResume,config)
                dispatch({ type :ADD_RESUME, payload:resume.data.data ,success:resume.data.success})
        }   
        catch(err){
            dispatch({ type :ERROR_RESUME, payload:err.response.data.error, success:err.response.data.succeses})
        }
    }



    //download resume
    const downloadResume =async (id)=>{
        try{
            
            const resume = await axios.get(`/api/v2/resume/${id}/download`)
                dispatch({ type :DOWNLOAD_RESUME ,success:resume.data.success})
        }   
        catch(err){
            dispatch({ type :ERROR_RESUME, payload:err.response.data.error ,success:err.response.data.succeses})
        }

    }

    //delete resume
    const deleteResume =async (id)=>{
        try{
            
            const resume = await axios.delete(`/api/v2/resume/${id}`)
                dispatch({ type :DELETE_RESUME ,payload: id ,success:resume.data.success})
        }   
        catch(err){
            dispatch({ type :ERROR_RESUME, payload:err.response.data.error ,success:err.response.data.succeses })
        }

    }


    const StartshowSpinner=()=>{
        dispatch({
          type:SHOW_SPINNER,
          payload:true,
        })
     }

    return(
        <ResumeContext.Provider value={{
            resumes : state.resumes,
            error : state.error,
            success: state.success,
            dataLoadingError: state.dataLoadingError,
            showSpinner:state.showSpinner,
            addSuccess:state.addSuccess,
            getResume,addResume,deleteResume,downloadResume,StartshowSpinner
        }}>

            {children}
        </ResumeContext.Provider>
    )
}

export default ResumeState