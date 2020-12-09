import React, { useState, useContext, useEffect } from "react";
import ArticleContext from "./../../../context/article/articleContext";

import { useHistory } from "react-router-dom";
import AuthContext from "./../../../context/auth/authContext";


export default function ArticleDetail(props) {
  const history = useHistory();
  const articleContext = useContext(ArticleContext);
  const { viewArticle, currentArticle, deleteArticle ,addSuccess,isLoading} = articleContext;
  const {Token , isTokenValid} = useContext(AuthContext) ;

  const [id, setID] = useState("");
  
 
  useEffect(() => {
   
    isTokenValid(Token)
 viewArticle(props.match.params.id); 


    //console.log(id)
  }, [Token,props.match.params.id]);




 useEffect(() => {
    if (addSuccess&& (!isLoading)) {
      history.push("/");
    }
    setID(props.match.params.id)
 }, [history, addSuccess,isLoading,id]);






  return (
    <div className="atricle_details">
      {currentArticle ? (
        <div className="actual_post">
          {Token? 
            <button
                className="btn btn-floating waves-effect waves-light red deleteBtn"
                onClick={() => {
                  deleteArticle(currentArticle._id);
                }}
              >
                <i className="material-icons">delete</i>
            </button>
          :null}
   

          <h1>{currentArticle.title}</h1>
          <hr/>
          <p>{currentArticle.content}</p>
        </div>
      ) : null}
    </div>
  );
}
