import React,{ useState, useContext, useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import projectContext from '../../../context/project/projectContext'




const ProjectList = () => {
    const [err, setErr] = useState("");
    const [proj, setProj] = useState([]);
    const {error , projects,ClearError, currentProject,getProjects,addProject} = useContext(projectContext);


      // for searching 
  const [searchWord , setWord] = useState('');
  const [searchResualt , setSearchResualt] = useState([])
  const[filterOn , setFilter]=useState(false)


  
    useEffect(() => {
        getProjects(); //get data from database
        //StartLoading(); // turn isLoading to true
        setProj(projects);
        if (error) {
          console.log("Error: ", error);
          setErr(error);
        }
       // console.log( projects);
       
        // console.log("SearchWord: ",searchWord)
      }, [error, proj,searchWord]);

      useEffect(()=>{
        setErr(error)
      },[err])


    const _ClearErrorLabel=(e)=>{
        ClearError()
        setErr('');
    }


    return (
        <ul className="col s12 l1 left  proj-list ">
           {err?
           
              <div className="error-label "  >
               <h3 className="card z-depth-3">{err}
              
              <button className="btn-flat right errorBtn waves-effect waves-light"><i className="material-icons   " onClick={_ClearErrorLabel}>close</i></button> 
               </h3>
               
            </div>:null
        } 
      




              {projects.length?projects.map(el=>
              
                <li  key={el._id}>
                    <NavLink to={`/boards/${el._id}` }className="icons2">
                        {el.name}
                    </NavLink>
                </li>
              )
            :<li className="center white-text">No Data Found</li>}  
               
                    <button  className="waves-effect waves-light indigo darken-4 btn-floating addProjectbtn"onClick={addProject}>
                        <i className="material-icons ">add</i>
                    </button>
              
        </ul>
    );
}

export default ProjectList;
