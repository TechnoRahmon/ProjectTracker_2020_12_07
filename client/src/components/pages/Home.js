import React , {useEffect, useContext}from "react";
import { Link } from "react-router-dom";
import AuthContext from '../../context/auth/authContext'
import  '../../css/mediaQ/MQHome.css';




const Home = () => {

  // const { Token , isTokenValid , isauthenticated,isLoading} = useContext(AuthContext);
  // const { getArticle, error } = useContext(ArticleContext);

  // useEffect(()=>{
  //   isTokenValid(Token)
  //   getArticle();

  // },[Token])

// console.log('isauthenticated :', isauthenticated , 'isLoading :',isLoading);


  return (
  <div className="home ">
        <h1>Home</h1>

  </div>
  );
};

export default Home;
