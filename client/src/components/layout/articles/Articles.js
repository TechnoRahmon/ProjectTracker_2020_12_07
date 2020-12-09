import React, { useState, useContext, useEffect } from "react";
import ArticleContext from "../../../context/article/articleContext";
import "../../../css/styleV1.css";
import { Link , useHistory} from "react-router-dom";

export default function Acticles() {
    const [post_list , setPost_list] = useState([]); 
  const articleContext = useContext(ArticleContext);
  const { articles ,StartLoading} = articleContext;
  const history= useHistory()
//   console.log(articles);


var arr = []; 
useEffect(()=>{
if ( articles.length >= 4 && articles.length !=0){
    
    for (var i = articles.length-1; i >articles.length-5; i--) {
    arr.push(articles[i])
      //console.log("Post_list",articles[i])
  }
}else {

  for (var j= articles.length-1; j>-1;j--) {
    arr.push(articles[j])
}}

},[articles,arr])


useEffect(()=>{
  if(arr.length){
     // console.log(' post : ', arr.length)
  setPost_list(arr)
  }else{ setPost_list([])}
  
},[articles])

//console.log(post_list);
  return (
    <div className="posts-box-container ">
      {post_list.length
        ? post_list.map((article) => {
            return (
              <div key={`${article.title}_${article._id}`} className="post-box ">
                <a href="#" className="blue-grey-text  text-darken-4 post" 
                onClick={(e)=>{  StartLoading();  history.push("/articledetail/"+article._id)}} >
                  <h5>{article.title}</h5>
                  <p className="truncate">{article.content} </p>
                </a>
                  <div className="divider"></div>
              </div>
                            
          
            );
          })
        : null}
    </div>
  );
}

// This is single article that we are showing



// post_list.map((article) => {
//   return (
//     <div key={`${article.title}_${article._id}`} className="post-box ">
//       <Link to={"/articledetail/" + article._id} className="blue-grey-text  text-darken-4 post">
//         <h5>{article.title}</h5>
//         <p className="truncate">{article.content} </p>
//       </Link>
//         <div className="divider"></div>
//     </div>
                  

//   );
// })