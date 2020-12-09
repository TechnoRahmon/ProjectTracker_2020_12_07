// import React from "react";
import AddNewBtn from "../layout/projects/AddNewProjectBtn";
import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import ProjectContext from "../../context/project/projectContext";
import "../../css/styleV1.css";
import AuthContext from '../../context/auth/authContext'
import SearchProjects from '../layout/projects/searchProjects'; 

const Projects = () => {
  const [err, setErr] = useState("");
  const [proj, setProj] = useState([]);
  const {Token, isTokenValid} = useContext(AuthContext);

  const project = useContext(ProjectContext);
  const { loadProject, projects, error, deleteProject, StartLoading } = project;
  
  // for searching 
  const [searchWord , setWord] = useState('');
  const [searchResualt , setSearchResualt] = useState([])
  const[filterOn , setFilter]=useState(false)

  useEffect(() => {
    loadProject(); //get data from database
    StartLoading(); // turn isLoading to true
    setProj(projects);
    if (error) {
      console.log("Error: ", error);
      setErr(error);
    }
   // console.log( projects);
    console.log("SearchWord: ",searchWord)
  }, [error, proj,searchWord]);



  // Onchange functions for search bar
  const _hnadelOnChangeSearchBar =  (e)=>{
    setWord(e.target.value)

    

       var Reg =  new RegExp(e.target.value,'ig')
      if (projects.length){
        console.log('Reg : ',Reg);
        setFilter(true)
      var  arrtest   =  projects.filter(el => el.name.match(Reg) )
            setSearchResualt(arrtest)
     } 
  
    
  }
  
  console.log('Resualt : ',searchResualt.length);
  //   useEffect(()=>{
  // deleteProject();
  //   })

  // Delete function
  var project_list=[]
  // const project0 = projects.length?projects[0]: "no data"
if(!searchResualt.length && !filterOn){
 project_list = projects.map((project) => {
    return (
      <div className="project_box" key={project._id}>
        <Link className="project_name_link" to={"/projectdetails/" + project._id}>
          <h4>{project.name}</h4>
          <div className="img_holder">
            <img src={project.img_path} alt="img" />
          </div>
        </Link>
        <div className="hoverBtns waves-effect waves-light ">
          
          {/* Check the Atuh for display the delete Button */}
        {Token? 
         
          <button
              className="btn btn-floating waves-effect waves-light red deleteBtn"
              onClick={() => {
                deleteProject(project._id);
              }}
            >
             <i className="material-icons">delete</i>
          </button>

         :null}

          {/* View Button */}
          <button className="btn btn-floating waves-effect waves-light indigo accent-4">
            <Link to={"/projectdetails/" + project._id} className="demo">
              <i className="far fa-eye"></i>
            </Link>
          </button>
          
        </div>
      </div>
    );
  });

}else{

  project_list = searchResualt.map((project) => {
    return (
      <div className="project_box" key={project._id}>
        <Link className="project_name_link" to={"/projectdetails/" + project._id}>
          <h4>{project.name}</h4>
          <div className="img_holder">
            <img src={project.img_path} alt="img" />
          </div>
        </Link>
        <div className="hoverBtns waves-effect waves-light ">
          
          {/* Check the Atuh for display the delete Button */}
        {Token? 
         
          <button
              className="btn btn-floating waves-effect waves-light red deleteBtn"
              onClick={() => {
                deleteProject(project._id);
              }}
            >
             <i className="material-icons">delete</i>
          </button>

         :null}

          {/* View Button */}
          <button className="btn btn-floating waves-effect waves-light indigo accent-4">
            <Link to={"/projectdetails/" + project._id} className="demo">
              <i className="far fa-eye"></i>
            </Link>
          </button>
          
        </div>
      </div>
    );
  });
}
 





  return (


    <div className="project_area">
      <h1>Projects</h1>
      <p>A small selection of my projects</p>

      <SearchProjects SearchWord={searchWord} goSearch={_hnadelOnChangeSearchBar}/>

     
        {project_list.length ? 
          <div className="grid_list"> {project_list}    </div>: 
          <p className="center">No Data Found</p> }
   
      {Token?
          <div className="addBTN">
            <AddNewBtn />
          </div>
      :null}
  
    </div>


  );
};

export default Projects;
