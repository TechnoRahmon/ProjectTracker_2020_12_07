import React, {useReducer} from 'react';
import axios from 'axios'
import ArticleContext from '../article/articleContext';
import {ArticleReducer} from '../article/articleReducer';


import {
    GET_ARTICLES,
    ADD_ARTICLE,
    DELETE_ARTICLE,
    GET_ARTICLE_DETAILS,
    ERROR_ARTICLE,
    SHOW_SPINNER
}
from '../types';
const ArticleState = ({children}) => {
  const initialState = {
    isLoading: true,
    articles: [],
    currentArticle: null,
    error: null,
    showSpinner:false,
    addSuccess: false, // under testing
  };

  const [state, dispatch] = useReducer(ArticleReducer, initialState);
  /// getting articles

  const getArticle = async () => {
    try {
      const response = await axios.get("/api/v3/articles");
      // console.log( response.data)
      dispatch({
        type: GET_ARTICLES,
        payload: response.data.data,
      });

    } catch (error) {
      console.log("error res:", error)
       dispatch({ type: ERROR_ARTICLE, payload: error.response.data.err });
    }
  }

  const addArticle = async (newArticle)=>{

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
     try {

      console.log("na",newArticle)

    const response = await axios.post("/api/v3/articles", newArticle, config)
      dispatch({
    type: ADD_ARTICLE,
    payload: response.data,
    success: response.data.success,
   
  });
 getArticle();
  } catch (error) {
      dispatch({ type: ERROR_ARTICLE, 
                payload: error.response.data.err ,    
                success:error.response.data.success, //updated 
      });
  }
  }
 
  //getDetail of detail

  const viewArticle = async (id) => {
    StartshowSpinner()
    // console.log("id: "+id)
    try {
      const response = await axios.get("/api/v3/article/"+id);
      // console.log("response: ", response.data.data)
      dispatch({
        type: GET_ARTICLE_DETAILS,
        payload: response.data.data,
      });
    } catch (error) {
      console.log("Error : ",error.response.data.err)
      dispatch({ type: ERROR_ARTICLE, payload: error.response.data.err });
    }
  };

  // Delete a article

  const deleteArticle = async (id) => {
    try {
      const response = await axios.delete("/api/v3/article/"+id);
      dispatch({
        type: DELETE_ARTICLE,
        payload: id, // delete object from both db and DOM tree
        success: response.data.success,
      });
    } catch (error) {
      console.log("Error : ", error.response.data.err);
      dispatch({
        type: ERROR_ARTICLE,
        payload: error.response.data.err,
        success:error.response.data.success
      });
    }
  };


    //NotLoading function >> turn isLoading into true to start laoding
    const StartLoading =  ()=>{
      state.isLoading = true ; 
      ClearError()
 }

 const ClearError = ()=>{
  state.error = null;
}

const StartshowSpinner=()=>{
  dispatch({
    type:SHOW_SPINNER,
    payload:true,
  })
}

  return (

    <ArticleContext.Provider 
    value={{
        isLoading: state.isLoading,
        articles: state.articles,
        currentArticle: state.currentArticle,
        error: state.error,
        addSuccess:state.addSuccess,
        showSpinner:state.showSpinner,
        StartLoading,
        getArticle, // test DONE 
        addArticle,// test DONE 
        viewArticle,// test in Done
        deleteArticle,// test in Done

    }}
    > 

{children}
    </ArticleContext.Provider>
  )

}

export default ArticleState;