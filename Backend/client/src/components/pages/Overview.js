import React,{ useState, useContext, useEffect } from 'react';
import projectContext from '../../context/project/projectContext'
import TaskContext from '../../context/task/taskContext'
import TaskList from '../layout/boards/TaskList';
import AuthContext from '../../context/auth/authContext'

const Overview = () => {


    const [err, setErr] = useState("");
    const [proj, setProj] = useState([]);
    const {error , projects,ClearError, currentProject,getProjects,addProject} = useContext(projectContext);
    const {tasks,getTasks} = useContext(TaskContext);

    const {currentUser , isTokenValid, Token} = useContext(AuthContext);




    useEffect(()=>{
        getProjects()
        
    },[])
//console.log(currentUser);

    return (
    <div className="container overviewContainer indigo lighten-5">




            <div className="row white overviewTitle captiopnOverviewTitle-box">
                <h1 className="col s12 l4 offset-l1"> Project Overview</h1>

                <div className="col l3  right bottom captiopnOverviewTitle"> 

                    {currentUser.id?( <ul className="collection UserStatus">
                            <li className="collection-item"><i><b>Account Name: {currentUser.account.name}</b></i></li> 
                            <li className="collection-item"><i><b>Your Name: {currentUser.fullname}</b></i></li> 
                            <li className="collection-item"><i><b>Your Privileges: {currentUser.user_type}</b></i></li> 
                    </ul>
                    ):null}

                </div>

            </div>
            <div className="divider overveiwDivider indigo lighten-2"></div>
           
        <div className="row overView  overviewTitle">
            {projects.length?projects.map(el=>
            
                <div  key={el._id} className="card col s12 l2 offset-l1 project-box">
                    <h2 
                    className="icons2">
                        {el.name}
                    </h2>
                    <span className="indigo darken-4 projectNumber white-text"> Tasks:</span>
                </div>
            )
            :<h3 className="card col center s12 l4 offset-l3">No Projects Found</h3>}
        </div>
    </div>
    );
}

export default Overview;
