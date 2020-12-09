import React, { useContext, useState, useEffect } from "react";
import "../../../css/styleV1.css";
import '../../../css/styleV2.css'
import { Link, useHistory } from "react-router-dom";
import ArticleContext from "../../../context/article/articleContext";



export default function AddArticle() {
  const history = useHistory();
  const { addArticle, addSuccess, error ,isLoading} = useContext(ArticleContext);
  const [newArticle, setNewArticle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [err, setErr] = useState(null);

  useEffect(() => {
    if(error) {
      setErr(error);
    }
    if (addSuccess && (!isLoading)) {
      history.push("/");
    }
  });
console.log('Isloading :', isLoading);
  const submitHandler = (e) => {
    e.preventDefault();

    // console.log("new Article: ",newArticle)
    //  console.log("new content: ", newContent);

    const newObj = {
      title : newArticle,
      content: newContent
    }

    addArticle(newObj);

    setNewArticle("");
    setNewContent("")

  };

  const onChangeHandler = (e) => {
    // console.log(e.target.value)
    setNewArticle(e.target.value);
  };

  const textChangeHandler = (e)=>{
    setNewContent(e.target.value);
  }

  return (
    <div className="article_container" >
    <h1>New Post</h1>
    {error? <p>{error}</p> : null}

    <div className="row">

      <form onSubmit={submitHandler} autoComplete="off" className="addProjectForm">
      
      <div className="input-field col s12  ">
        <input type="text" name="title" id="title"  onChange={onChangeHandler} value={newArticle} required/>
        <label htmlFor="title" className="desLabel" >Title</label>
      </div>


        <div className="input-field col s12  ">
            <textarea name="content"className="desLabel" id="content" onChange={textChangeHandler}  value={newContent}   className="materialize-textarea validate" required>
            </textarea>
          <label htmlFor="content" id="desLabel">Content</label>
        </div>
        

        {/* Button */}
        <div className="col s12 m6 offset-m3" style={{ display:'flex' , alignItems: 'center',  justifyContent:'center' }}>
          <button type="submit" className="btn indigo accent-4 waves-effect waves-light">send</button>
        </div>

      </form>
    </div>
  </div>
  );
}


      //         {/* description */}
      //         <div className="input-field col s12 m6 offset-m3">
      //         <textarea id="description" name="description" className="materialize-textarea validate" data-length="120"  onChange={(e)=>{setNewProj({...newProj, description : e.target.value  })}} required></textarea>
      //         <label htmlFor="description" id="desLabel">Textarea</label>
      //     </div>
      // {/* Button */}
      // <div className="col s12 m6 offset-m3" style={{ display:'flex' , alignItems: 'center',  justifyContent:'center' }}>
      //     <button type="submit" className="btn indigo accent-4 waves-effect waves-light">send</button>
      //     {showSpinner?<Spinner/>:null}
          
      // </div>