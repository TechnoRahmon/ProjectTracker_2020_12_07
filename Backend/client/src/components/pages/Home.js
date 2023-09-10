import React , {useEffect, useContext}from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from '../../context/auth/authContext'
import  '../../css/mediaQ/MQHome.css';
import  '../../css/styleV2.css';




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
       




       <header className="index-header">
          <div className="title-box">
              <h1>PROJECT TRACKER</h1>
              <p>Manage everything in one workspace</p>
              <NavLink to="/auth/get-start" className="btn-explore  pink accent-3">  <b>Get Start</b> Now</NavLink>
          </div>
      </header>




<section className="feauture_section container center" id="About"> 
   
      <div className="row Frow center">


        <div className=" F-box col s12 l3 offset-l1 " >
                  <i className="fas fa-landmark big_icon purple"></i>
                  <h3 className="box__h3">Manage Teams</h3>
                  <p className="box_text">Planning, tracking and delivering your team’s best work has never been easier</p>
              </div>

              <div className=" F-box col s12 l3" > 
                  <i className="fas fa-magic big_icon purple"></i>                
                  <h3 className="box__h3">Set up in minutes</h3>
                  <p className="box_text">Get started fast with hundreds of visual and customizable templates - or create your own</p>
              </div>

              <div className=" F-box col s12 l3" >
                  <i className="fas fa-edit big_icon purple" ></i>                
                  <h3 className="box__h3">Track Process</h3>
                  <p className="box_text">Green vines attached to the trunk of the tree had wound themselves toward the top of the canopy.</p>
              </div>


            </div>
     
       
      
</section>   





  <section className="about-section">
        
        
        <div className="box-img">
            {/* <!--about image 1 will be inserted via CSS--> */}
        </div>

        <div className="box-txt purple">

            <h3>What you are looking for</h3>

            <h1>We provide IT solutions</h1>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, placeat distinctio quisquam provident accusamus cum consequatur fuga incidunt quod eaque! Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
           


        </div>


    </section>



  </div>

  );
};

export default Home;
