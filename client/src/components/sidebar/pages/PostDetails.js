import React , {useEffect, useContext, useState}from "react";
import Sidebar from "../Sidebar";
import Articles from "../../layout/articles/Articles";
import { Link , useHistory} from "react-router-dom";
import ArticleContext from '../../../context/article/articleContext'
import  '../../../css/mediaQ/MQHome.css';
import ArticleDetail from '../../layout/articles/ArticleDetail';
import MobilSidebar from "../../sidebar/MobileSidbar";
import AuthContext from '../../../context/auth/authContext'
import AddArticleBtn from '../../layout/articles/Add_articleBtn';


const PostDetails = ({match}) => {

  const { getArticle, error,isLoading } = useContext(ArticleContext);
  const { isTokenValid , Token } = useContext(AuthContext);
  const history = useHistory()

  const [id , setID ] = useState('');
  const [articleChild , setChild ] = useState(null);


  useEffect(()=>{
    isTokenValid(Token)
    getArticle();
    window.scrollTo(0, 0); 
    //console.log(match);
    setID(match.params.id)
  },[Token,match.params.id])

  useEffect(()=>{
    //console.log('loading from postdetails :',isLoading);
    // console.log()
    //history.go(0)

    setChild(<ArticleDetail match={match}/>)
    // console.log(match);
    // console.log(id===match.params.id, id);
    // if((id) && id !==match.params.id){
    //     history.go(0)
    //     console.log('log : ',false);
    // }
  },[match.params.id , id,history])




  
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

                
               { articleChild}


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

export default PostDetails;
