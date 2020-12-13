import React,{ useState, useContext, useEffect } from 'react';
import projectContext from '../../context/project/projectContext'
import TaskContext from '../../context/task/taskContext'
import TaskList from '../layout/boards/TaskList';

const Overview = () => {


    const [err, setErr] = useState("");
    const [proj, setProj] = useState([]);
    const {error , projects,ClearError, currentProject,getProjects,addProject} = useContext(projectContext);
    const {tasks,getTasks} = useContext(TaskContext);





    useEffect(()=>{
        getProjects()
        
    },[])
console.log(tasks);

    return (
    <div className="container overviewContainer indigo lighten-5">
            <div className="row white overviewTitle">
                <h1 className="col l4 offset-l1"> Project Overview</h1>
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
