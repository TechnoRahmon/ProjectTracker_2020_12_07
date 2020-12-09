import React , {useEffect, useContext}from "react";
import Sidebar from "../sidebar/Sidebar";
import MobilSidebar from "../sidebar/MobileSidbar";
import Articles from "../layout/articles/Articles";
import { Link } from "react-router-dom";
import ArticleContext from '../../context/article/articleContext'
import AuthContext from '../../context/auth/authContext'
import AddArticleBtn from '../layout/articles/Add_articleBtn';
import  '../../css/mediaQ/MQHome.css';

const Home = () => {

  const { Token , isTokenValid , isauthenticated,isLoading} = useContext(AuthContext);
  const { getArticle, error } = useContext(ArticleContext);

  useEffect(()=>{
    isTokenValid(Token)
    getArticle();

  },[Token])

// console.log('isauthenticated :', isauthenticated , 'isLoading :',isLoading);
  return (
  <div className="home ">

    <div className="container home-container">
        
        <div className="row home-row">


            {/* sidbar  */}
            <div className="card side_bar_menu col s12 l2 left hide-on-med-and-down navbar">
              <Sidebar />
            </div>
          
         

            {/* middleCard */}
            <div className="card person_card z-depth-3 col s12 l5 offset-l1 center ">

                <div className="middle_section blue-grey-text  text-darken-4">

                
                    <div className=" row">
                      <div className="col s10 m8 offset-m2 img-section">
                        <div className="img_box center" id="img_box">
                            <img src="images/person1.jpg" alt="prof" />
                        </div>
                        <h4 className="center">Elyas Arkin</h4>
                        
                      </div>
                    </div>


                    <div className=" row">
                      <div className="col s12 m11 offset-m1 card_info">
                        <h2>Junior  FullStack Developer</h2>
                          <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Praesentium at tenetur in exercitationem sequi esse nam optio
                  
                          </p>
                      </div>
                    </div>


                </div>

            </div>



            {/* Mobile sidbar  */}
            <div className="card side_bar_menu col s12 l2 left show-on-small mobile-nav-section">
              <MobilSidebar />
            </div>

            {/* post section */}
            <div className="card right-box col s12 l3 right center">
              <h3 className="blue-grey-text  text-darken-4">
                <i className="fas fa-blog "></i>
                  My Blog
                </h3>
                <div className="divider"></div>


        {/**  render the Add button if the token is valid only**/}
        {Token?<AddArticleBtn/>:null}
             

              {error ?<p className="center red viewPostErro"> error </p> : null}
              
                <Articles />
             
            </div>

        </div>
    </div>
  </div>
  );
};

export default Home;
