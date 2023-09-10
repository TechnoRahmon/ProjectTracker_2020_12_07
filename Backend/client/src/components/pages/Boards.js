import React ,{useState , useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import AuthContext from '../../context/auth/authContext';
import ProjectContext from '../../context/project/projectContext';
import TaskContext from '../../context/task/taskContext';
import TaskList from '../layout/boards/TaskList';
import {useHistory} from 'react-router-dom';
import { SET_ERROR } from '../../context/types';


const Boards = ({match}) => {
    //view single project and tasks  and comments coutns/ useres count.
    const history = useHistory(); 
    // auth Context
    const {userDetails, currentUser , isTokenValid, Token } = useContext(AuthContext)
    
    // Project Context
    const {currentProject,
        error:ProjectError,
        projects,
        viewProject,
        updateProject,
        deleteProject,
        ClearError:ClearProjError,
        } = useContext(ProjectContext)
    const [err , setErr ] =useState('');
    // Task Context
    const {tasks } = useContext(TaskContext)


        // init for dropdown project menu 
    

        useEffect(()=>{
            viewProject(match.params.projectId)
            //getTasks(match.params.projectId)
            console.log(tasks);  
            isTokenValid(Token)
            const M  = window.M;
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.dropdown-trigger');
            var instances = M.Dropdown.init(elems, {});
            //console.log(currentUser);
          });
        },[match.params.projectId])

        // project info state 
        const [projectName , setProjectName ]= useState('')
        const [projectDes , setProjectDes ]= useState('')


        // switch to edit mode
        const _showProjectNameInput=(id)=>{
                //console.log(currentUser);
            if ( currentUser.user_type === 'AdminUser'){

            setProjectName(document.getElementById('project-name').innerHTML);
            setProjectDes(document.getElementById('project-des').innerHTML);

            if(document.getElementById(id).style.display==='' || document.getElementById(id).style.display==='none' ){
                document.getElementById(id).style.display='block'
                document.getElementById('projectTitle').style.display='none'


            }else{
                document.getElementById(id).style.display='none'
                document.getElementById('projectTitle').style.display='block'

            }

                }else{
                    setErr('You Don\'t Have Enough Permission to perform this action')
                }
        }


       const _showProjectDesInput=(id)=>{
        if ( currentUser.user_type === 'AdminUser'){
        setProjectName(document.getElementById('project-name').innerHTML);
        setProjectDes(document.getElementById('project-des').innerHTML);

            if(document.getElementById(id).style.display==='' || document.getElementById(id).style.display==='none' ){
                document.getElementById(id).style.display='block'
                document.getElementById('project-des').style.display='none'


            }else{
                document.getElementById(id).style.display='none';
                document.getElementById('project-des').style.display='block';

            }}else{
                setErr('You Don\'t Have Enough Permission to perform this action')
            }
        }
/******************************************************************** */

/**********************   Fire Update project *******************/
            const updateProjectInfo = ()=>{
                        console.log(projectName, projectDes)
                        updateProject(currentProject._id,{name:projectName , description: projectDes })
            }

       // ClearError
       const _ClearErrorLabel=(e)=>{
        ClearProjError()
        setErr('');
    }


    return (
        <div className="col s12 l11  indigo lighten-5 board">
            
            <div className="container header-box-header">


    {err?
           
           <div className="error-label "  >
            <h3 className="card z-depth-3">{err}
           
           <button className="btn-flat right errorBtn waves-effect waves-light"><i className="material-icons   " onClick={_ClearErrorLabel}>close</i></button> 
            </h3>
            
         </div>:null
     }

                {/* board header */}
                <div className="row    header-box white" >
                    {/* project info */}
                    <div className="col s12 l7 offset-l1 ">
                        
                        
                        <div id="projectTitle" onClick={(e)=>{ _showProjectNameInput('name-box')}}>
                            <h1   className="projName" id="project-name">{currentProject.name}</h1>
                        </div>


                            {/* edit mode */}
                        <div className="projectNameEdit" id="name-box">
                            <input type="text"  value={projectName} name="ProjectName" id="ProejctName" onChange={(e)=>{setProjectName(e.target.value)}}/>
                            <button className="btn blue"  onClick={()=>{updateProjectInfo();_showProjectNameInput('name-box')}}>ok</button>
                        </div>
          

                        <p className="projDes" id="project-des"  onClick={(e)=>{ _showProjectDesInput('des-box')}}>{currentProject.description}</p>
                        {/* edit mode */}
                        <div className="projectDesEdit" id="des-box">
                            <input type="text" value={projectDes} name="ProjectDes" id="ProejctDes" onChange={(e)=>{setProjectDes(e.target.value)}}/>
                            <button className="btn blue" onClick={()=>{updateProjectInfo();_showProjectDesInput('des-box')}}>ok</button>
                        </div>
                  
                        
                    </div>

                    {/* info boxes */}
                    <div className="col s12 l3 card-box ">
                        <div className="card box left">
                            Members/ {userDetails.length}
                        </div>
                        <div className="card box left">
                            tasks/ {tasks.length}
                        </div>
                        <div className="right">
                           <a href="#" className="grey-text text-darken-4 dropdown-trigger" data-target='dropdown1'><i className="material-icons">more_horiz</i></a> 
              
              
                           {/*  Dropdown Structure  */}
                            <ul id='dropdown1' className='dropdown-content ProjectdropMenu'>
                    
                                <li><a href="#!" className="grey-text text-darken-4" onClick={()=>{
                                if ( currentUser.user_type==='AdminUser'){
                                    deleteProject(currentProject._id); history.push(`/boards`)
                                }else{ setErr('You Don\'t Have Enough Permission to perform this action')} 
                                }}><i className="material-icons grey-text text-darken-4">delete</i>Delete Project</a></li>
                            </ul>
                        </div>
                    </div>
                    
                </div>


                {/* task list */}
                <div className="row">
                    
                    <TaskList projectId={match.params.projectId}/>
                
                </div>

            </div>
        </div>
    );
}

export default Boards;
