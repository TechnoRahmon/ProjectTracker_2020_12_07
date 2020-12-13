import {
  GET_PROJECTS,
  ADD_PROJECT,
  GET_PROJECT_DETAILS,
  DELETE_PROJECT,
  ERROR_PROJECT,
  SHOW_SPINNER,
  CLEAR_ERROR,
} from "../types";

export const ProjectReducer = (state, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      // console.log("action: ",action.payload)
      return {
        ...state,
        
        projects: action.payload,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects,action.payload ],
        isLoading: false,//updated to false
        isSuccess:action.success,//updated 
        showSpinner:false , 
      };
    case GET_PROJECT_DETAILS:
      // console.log("Payload : ",action.payload)
      return {
        ...state,
        currentProject: action.payload,
        isLoading: false,
        isSuccess:action.success,
      };

    case DELETE_PROJECT:
      // this is helful for debbuging
      const newProject = state.projects.filter(
        (project) => project._id !== action.payload
      );
      return { ...state, projects: newProject };

    case ERROR_PROJECT:
      return {
        ...state,
        error: action.payload,
        isLoading:false,//updated to true
        isSuccess:action.success, //updated
        showSpinner:false ,
      }

    case CLEAR_ERROR:
        return {
          ...state,
          error: null,
          isLoading: true,//updated to true
          isSuccess:null, //updated
          
        }


    case SHOW_SPINNER:
      console.log('show spinner reducer');
       return{
          ...state,
          showSpinner:true,
       }


    default: {
      return state;
    }
  }
};
