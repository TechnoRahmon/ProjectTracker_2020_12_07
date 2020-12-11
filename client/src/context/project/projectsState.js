import React, { useReducer } from "react";
import axios from "axios"; // dealing with rest full API
import ProjectContext from "./projectContext";
import {ProjectReducer} from '../project/projectReducer'

import {
  GET_PROJECTS,
  ADD_PROJECT,
  GET_PROJECT_DETAILS,
  DELETE_PROJECT,
  ERROR_PROJECT,
  SHOW_SPINNER,
  CLEAR_ERROR,
} from "../types"; // importing action type


const ProjectState = ({children}) => {


  const initialState = {
    isLoading: true,
    projects: [], // project_list (id, name, accountId)
    currentProject: {}, // signle project
    error: null,
    showSpinner:false,
    isSuccess:false, // under testing
  };

  const [state, dispacth] = useReducer(ProjectReducer, initialState);



  // loading/ getting projects
  const getProjects = async () => {
    try {
      const response = await axios.get("/api/v2/projects");
      // console.log("response: ",response)
      dispacth({
        type: GET_PROJECTS,
        payload: response.data.data,
      });
    } catch (error) {
      dispacth({ type: ERROR_PROJECT ,
      payload: error.response.data.err});
    }
  };



  
  // add/ post project
  const addProject = async () => {
    await StartshowSpinner()  // calling the spinner
  
    try {
      //console.log('from state : ',state.showSpinner);
      const response = await axios.post("/api/v2/projects");
      console.log(response.data.success)
      dispacth({
        type: ADD_PROJECT,
        payload: response.data,
        success:response.data.success, // updated 
      });

      getProjects();
    } catch (error) {
      console.log('err : ',error.response );
      dispacth({ type: ERROR_PROJECT, 
                payload: error.response.data.error ,    
                success:error.response.data.success, //updated 
      });
    }
  };




  //getDetail of project
  const viewProject = async (id) => {
    // console.log("id: "+id)
    try {
      const response = await axios.get("/api/v1/project/"+id);
      // console.log("response: ", response.data.data)
      dispacth({
        type: GET_PROJECT_DETAILS,
        payload: response.data.data,
      });
    } catch (error) {
      console.log("Error : ",error.response.data.err)
      dispacth({ type: ERROR_PROJECT, payload: error.response.data.err });
    }
  };

  // Delete a project

  const deleteProject = async (id) => {
    try {
      const response = await axios.delete("/api/v1/project/"+id);
      dispacth({
        type: DELETE_PROJECT,
        payload: id, // delete object from both db and DOM tree
      });
    } catch (error) {
      dispacth({
        type: ERROR_PROJECT,
        payload: error.response.err.message,
      });
    }
  };
  
  
  // under testing
  // is adding success

  //NotLoading function >> turn isLoading into true to start laoding
   const StartLoading =  ()=>{
        state.isLoading = true ; 
        ClearError()
   }

   const StartshowSpinner=()=>{
      dispacth({
        type:SHOW_SPINNER,
        payload:true,
      })
   }

   const ClearError = ()=>{
     dispacth({
       type:CLEAR_ERROR,

     })
        
   }
  return (
    <ProjectContext.Provider
      value={{
        isLoading: state.isLoading,
        projects: state.projects,
        currentProject: state.currentProject,
        error: state.error,
        isSuccess:state.isSuccess,
        showSpinner:state.showSpinner,
        getProjects, // test DONE 
        addProject,// test DONE 
        viewProject,// test in Done
        deleteProject,// test in Done
        StartLoading,
        ClearError,
        StartshowSpinner,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
