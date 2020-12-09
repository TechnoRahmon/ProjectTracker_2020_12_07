import React ,{useContext , useState, useEffect } from 'react';
import ProjectContext from '../../context/project/projectContext';
import {Link , useHistory } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import AuthContext from '../../context/auth/authContext';


const AddProjectForm = () => {

    const history = useHistory()
    const {isTokenValid, Token } = useContext(AuthContext)

    const { addProject ,error , isLoading , addSuccess, showSpinner,ClearError} = useContext(ProjectContext)
    const [err, setErr] = useState(error)
    const [newProj , setNewProj ] = useState({})
    const [selectedImage , setImage ] = useState(null); 
   //const [showSpiner , setSpinner] = useState(false) ;

    // check if there is any error in the projectState
    useEffect( ()=>{
        if(error) {setErr(error);
        }
        isTokenValid(Token)
        //redirect to projects page 
        if(addSuccess&&(!isLoading)){ history.push('/projects')}
            
        if(showSpinner)console.log('show spinner ' ,showSpinner);
    },[error ,addSuccess,history,isLoading,showSpinner,Token])


    useEffect(()=>{
            setErr(error)
    },[err])


    // submission function
    const _handelsubmit = (e)=>{
         e.preventDefault()
        if (Object.keys(newProj).length === 4 && selectedImage )
        {   console.log('adding');



            //add new project
                addProject(selectedImage,newProj)
            //setSpinner(true);

            //clear the local error
            ClearError()
            setErr('')

        }else{
            setErr('Please complete all required inputes')
            
        }

   
        //<Link to="/projects">got to projects</Link>
    }





    return (
        <div className="AddProjectFrom center">
            <h3>Add New Project </h3>
            
            {error?
            <div className="row ">
                <div className=" red-text col s12 m4 offset-m4">
                    <p > {error}  </p>
                </div>
            </div>
            :null}
          
        <div className="row ">
            <form onSubmit={_handelsubmit} encType="mutipart/form-data" className="col s12 m6 offset-m3  addProjectForm">

                {/* Project Name */}
                <div className="input-field col s12 m6 offset-m3">
                    <input id="projectName" type="text" name="name" className="validate" onChange={(e)=>{setNewProj({...newProj, name : e.target.value  })}} required/>
                    <label htmlFor="projectName">Project Name</label>
                </div>
                {/* Source Code Link */}
                <div className="input-field col s12 m6 offset-m3">
                    <input id="gitHubLink" type="url" name="url" className="validate"  onChange={(e)=>{setNewProj({...newProj, source_code : e.target.value  })}} required/>
                    <label htmlFor="gitHubLink">Source Code Link</label>
                </div>
                {/* Website Demo */}
                <div className="input-field col s12 m6 offset-m3">
                    <input id="DemoUrl" type="url" name="source_code" className="validate"  onChange={(e)=>{setNewProj({...newProj, url : e.target.value  })}} required/>
                    <label htmlFor="DemoUrl">Website Demo Url</label>
                </div>

                {/* upload */}
                <div className="file-field input-field col s12 m6 offset-m3">
                    <div className="btn indigo accent-4 waves-effect waves-light">
                        <span>File</span>
                        <input type="file" name="img_path"  onChange={(e)=>{ setImage(e.target.files[0])}} required/>
                     </div>  
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Project Image" />
                    </div>
                </div> 
                 
                {/* description */}
                    <div className="input-field col s12 m6 offset-m3">
                        <textarea id="description" name="description" className="materialize-textarea validate" data-length="120"  onChange={(e)=>{setNewProj({...newProj, description : e.target.value  })}} required></textarea>
                        <label htmlFor="description" id="desLabel">Textarea</label>
                    </div>
                {/* Button */}
                <div className="col s12 m6 offset-m3" style={{ display:'flex' , alignItems: 'center',  justifyContent:'center' }}>
                    <button type="submit" className="btn indigo accent-4 waves-effect waves-light">send</button>
                    {showSpinner?<Spinner/>:null}
                    
                </div>
            </form>
        </div>
       
            
            
        </div>
    );
}

export default AddProjectForm;
