import React  ,{useState , useEffect, useContext } from 'react';
import TaskContext from '../../../context/task/taskContext';
import AuthContext from '../../../context/auth/authContext';
import SearchProjects from './searchProjects';
import ProjectContext from '../../../context/project/projectContext';

const TaskList = ({projectId}) => {



    // for Dropdown menu init
    const M = window.M; 
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems, {});
      });

    // Task Context
    const {  tasks , 
        error:TaskError,  
        addtask,
        deletetask ,
        getTasks,
        ClearTaskError,
        updateTask, } = useContext(TaskContext)

        // project Context
       const { 
        error:ProjectError, } = useContext(ProjectContext)


        const { userDetails ,currentUser } = useContext(AuthContext)


        // updated Task State
        const [ UpdatedTask, setUpdatedTask] =useState({
        name:'',
        _id:'',
        status:0,
        comments:[],
        owners:[],
        project_id:projectId,
        start_date:'',
        end_date:''})


        // search owner State
        const [showOwnerDrop , setShowOnwer] = useState(false);
        const [SearchWord , setSearchWord] = useState([]);
        const [SearchResault , setSearchResault]=useState([])
        const[inputValue , setInputValue] = useState('');
        
        
        // search owner function 
        const goSearch = e =>{
           // get the Search word from the searchbar
            let newWord ={};
             SearchWord.map(el=> {
                if (`Search-bar${el.id}`===e.target.id ){
                        newWord= {id : el.id , value:e.target.value}
                        setInputValue(newWord);
                }
            })  
        
            //search the user
            if(userDetails.length && newWord.value){
                var Regex = new RegExp(newWord.value,'ig')
                let resualt= userDetails.filter(el=>{
                    if (el.fullname.match(Regex))
                        return el.fullname.match(Regex)
                         else setShowOnwer(false);
                    })
                    
                //console.log(resualt)
                setShowOnwer(true);
               // console.log(resualt);
                setSearchResault(resualt)
            }else{
                            setSearchResault('')

            }
        }





        // show Owners DropBox
        const _ShowOwnerBox=(id)=>{
            SearchWord.map(el=>{
                
                //document.getElementById(`box-${el.id}`).style.display='none';
                let _none = document.getElementById(id).style.display===''||document.getElementById(id).style.display==='none'
                //console.log(_none);
                if(`box-${el.id}`===id && !_none){
                     document.getElementById(id).style.display='none';
                     setSearchResault('')

                }else
                if (`box-${el.id}`===id && _none){
                    //console.log('display');
                    document.getElementById(id).style.display='block';
                    
                }else if(`box-${el.id}`!==id)
                 {
                    document.getElementById(`box-${el.id}`).style.display='none';
                    setSearchResault('')

                }   
            })
        }



/*************************Effect Hooks ************ ********** */

        useEffect(()=>{
           // viewProject(match.params.projectId)
            getTasks(projectId)
        
            //console.log(projectId);
             
        },[projectId])



        useEffect(()=>{
            if(tasks.length){
               var tasksIds =  tasks.map(el=> {return {id :el._id.toString()} })
                setSearchWord(tasksIds)   
            }
            //console.log(`UpdatedTask`,UpdatedTask);
            console.log(tasks)
        },[tasks,UpdatedTask])




/**********************************  date format ********** */
        //get month fromat
        const getMonth = (month)=>{
               switch(month){
               case '01':return'Jan'
               case '02':return'Feb'
               case '03':return'Mar'
               case '04':return'Apr '
               case '05':return'May '
               case '06':return'Jun'
               case '07':return'July'
               case '08':return'Aug'
               case '09':return'Sept'
               case '10':return'Oct'
               case '11':return'Nov'
               case '12':return'Dec'
                default  : break;
           }
        }
    //get Date fromat
        const getTaskDate = (startDate,endDate)=>{
         
            let month1 = getMonth(startDate.slice(5,7)) 
           let month2 = getMonth(endDate.slice(5,7))
           
           let day1 = startDate.slice(8)
           let day2 = endDate.slice(8)
           let year1= startDate.slice(2,4)
           let year2= endDate.slice(2,4)
           let fulltime = ''; 
           //console.log(day1 , day2);
            if (month1 === month2 && year1 === year2){
                fulltime+=month1+' '+day1+'-'+day2;
            }else if (month1 === month2 && year1 !== year2)  
                    fulltime+=month1+' '+day1+'-'+day2+' '+year2;
            else if (month1 !== month2 &&year1 === year2) 
                    fulltime+=month1+' '+day1+'-'+month2+' '+day2;
            else fulltime+=month1+' '+day1+'-'+month2+' '+day2+' '+year2;
            return fulltime
        }






        
        // ClearError
        const _ClearErrorLabel=(e)=>{
            ClearTaskError()
            setErr('');
        }
/************************************************************** */



        // count Owners number
        const countOwners = (tasks)=>{
            let ownersNumber=0; 
            
                tasks.forEach(el=>{
                    
                    if(el.owners)
                        ownersNumber += el.owners.length
                })
                return ownersNumber;
        }
       
/*************************** update Task handle ************************************/

        // fire Update task function
        const _handelUpdateTask = ()=>{
            updateTask(UpdatedTask,UpdatedTask.project_id, UpdatedTask._id)
                            
        }

        const initUpdateTask =  el =>{

            setStartDate(el.start_date)
            setOwners(el.owners)
            setTaskName(el.name)
            // set up the basic info for updated task into the udpdated task auto.
            //console.log(el)
            setUpdatedTask(state=>{
                return{...state,
                    _id:el._id,
                    project_id:el.project_id,
                    name:el.name,
                    start_date:el.start_date,
                    end_date:el.end_date,
                    status:el.status,
                    owners:el.owners,
                    comments:el.comments, 
                }})
        }


        // Time Line State 
        const [err, setErr ] =useState(''); 
        const [StartDate , setStartDate ] = useState(''); 
        const [EndDate , setEndDate ] = useState(''); 

        // update task start date
        const SetUpStartDate = (start,id)=>{
            let endD  = document.getElementById(id).value
                //console.log(` endD: `,endD)
                //console.log(`start ${start}`)
            
            if ( new Date(start)>new Date(endD)){
                //console.log(`start ${start}`)
                setUpdatedTask(state=>{
                    return{ ...state,  start_date:'' }
                })
                setErr('Start Date should Be Before End Date')
            }else{
                setUpdatedTask(state=>{
                return{ ...state,  start_date:start }
            })
            }
        
                }

// update task end date
const SetUpEndDate = (end,id)=>{
    console.log(id)
    let startD  = document.getElementById(id).value
        //console.log(` startD: `,startD)
        //console.log(`end ${end}`)
        
    if ( new Date(startD)>new Date(end)){
        //console.log(`end ${end}`)
        setUpdatedTask(state=>{
            return{ ...state,  end_date:'' }
        })
        setErr('End Date should Be After Start Date')
    }else{
           setUpdatedTask(state=>{
        return{ ...state,  end_date:end }
    })
    }
 
        }

        //get updated task status 
        const getTaskStatus = (num)=>{
                switch (num){
                    default : return'Not Started'
                    case 25: return'Started'
                    case 50: return'Halfway Done'
                    case 75: return'Almost Done'
                    case 100: return'Done'
                }
        }


    //set Owners to the updated task
    const [Owners , setOwners ] = useState([]);
    const setUpOwners = (own)=>{
                setUpdatedTask(state=>{
                    return{...state,owners:[...state.owners , own]}})
        }
        // delete Owner 
        const deleteOwners=id =>{
                let newOwmers = Owners.filter(own=>id!==own._id)
                console.log(newOwmers)
                setUpdatedTask(state=>{
                    return{...state,owners:newOwmers}})
                    setOwners(newOwmers)
        }

    //set status to the updated task
    const setUpStatus = Status=>{
                setUpdatedTask(state=>{
                    return{...state,status:Number(Status)}})
        }

    //set name to the updated task
    const [TaskName , setTaskName] = useState('');
    const setUpTaskName = Name=>{
        setTaskName(Name)
        setUpdatedTask(state=>{
            return{...state,name:Name}})
    }


/********************* toggle the task disply/input desgin ***************** */

        //  handel Task Input Box 
        const [showTaskInput , setShowTaskInput] = useState(false);
        
        const _handelTaskInputBox=(id , el)=>{
            

            // change to edit mode
            let _none = document.getElementById(`input-${id}`).style.display===''||document.getElementById(`input-${id}`).style.display==='none'
            //console.log(_none)
            SearchWord.map(el=>{
                if (id === el.id && !_none){
                    document.getElementById(`input-${id}`).style.display='none';
                 document.getElementById(`display-${id}`).style.display='flex';
                }else if (id === el.id && _none ){
                document.getElementById(`input-${id}`).style.display='flex';
                 document.getElementById(`display-${id}`).style.display='none';
                }
            })
        
        }

        // show Onwers  OnMouseOver 
        const _showOwners=(id)=>{
            document.getElementById(id).style.display='block';
        }

        const _HideOwnerBox=(id)=>{
                        document.getElementById(id).style.display='none';

        }
/********************************************* *********************************** */




    return (
        <div className="col s12 l10 offset-l1 ">

        <div className="divider divider1 indigo lighten-4"></div>

            {/* task menu controller */}
             <div className="row">


             {TaskError?
           
           <div className="error-label "  >
            <h3 className="card z-depth-3">{TaskError}
           
           <button className="btn-flat right errorBtn waves-effect waves-light"><i className="material-icons   " onClick={_ClearErrorLabel}>close</i></button> 
            </h3>
            
         </div>:null
     } 

             {ProjectError?
           
           <div className="error-label "  >
            <h3 className="card z-depth-3">{ProjectError}
           
           <button className="btn-flat right errorBtn waves-effect waves-light"><i className="material-icons   " onClick={_ClearErrorLabel}>close</i></button> 
            </h3>
            
         </div>:null
     } 
             <div className="col  s12 l2 offset-l6">
                    <button   className="btn  indigo darken-4 waves-effect waves-light" onClick={()=>{addtask(projectId)}}>
                       <span> Add Task</span> <i className="material-icons">add</i>
                    </button>
                </div>


                <div className="col s12 l2  ">
                    {/* <SearchProjects id={projectId}/> */}
                    
                </div>

                <div className="col l1 offset-l1">
                    <div className="card box center">
                       <span className="">Person/ {countOwners(tasks)}</span>
                    </div> 
                </div>
           
             </div>
           
           {/* tasks dispaly */}
     <div className="row">  
        <div className="col s12 l12 "> 
        
                {/* tasks disply header */}
                <div className="task-box-header row indigo darken-4 white-text" >
                      
                        {/* name */}
                        <div className="name-header-box col s12 l1 offset-l1 ">
                            <span>Name</span>
                        </div>

                        {/* comments icon */}
                        <div className="col s12 l2 comments-header-box offset-l2 center">
                            <span>Comments</span>
                        </div>

                        {/* owners icon */}
                        <div className="col s12 l1 center">
                             <span>Owners</span>             
                        </div>

                        {/* status */}
                        <div className="col s12 l2  offset-l1  center">
                            <span>Status</span>
                        </div>

                        {/* timeline */}
                        <div className="col s12 l1 offset-l1 center">
                                <span >Timeline</span>
                        </div>    
                </div>

                {err?
           
           <div className="error-label "  >
            <h3 className="card z-depth-3">{err}
           
           <button className="btn-flat right errorBtn waves-effect waves-light"><i className="material-icons   " onClick={_ClearErrorLabel}>close</i></button> 
            </h3>
            
         </div>:null
     } 

            {tasks.length?tasks.map(el=>{ 
            


        return <>
                <div className="task-box row white" key={`display${el._id}`}  id={`display-${el._id}`} >
                       
                        {/* name */}
                        <div className="col s12 l4 name-box" onClick={()=>{initUpdateTask(el);_handelTaskInputBox(el._id ,el)}}> 
                            <span className="purple darken-4 delTaskIcon-box">
                                <a href="#" onClick={()=>{deletetask(projectId,el._id)}}><i className="material-icons delTaskIcon">delete_sweep</i></a>
                            </span>
                            <span id={`Task-name${el._id}`}>{el.name}</span>
                            
                        </div>

                        {/* comments icon */}
                        <div className="col s12 l1 center">
                            <a href="#"><i className="material-icons indigo-text text-darken-4">mode_comment</i></a>
                        </div>



                        {/* owners icon */}
                    <div className="col s12 l1  center ">
                            <a href="#" id={`own-${el._id}`} onMouseOver={(e)=>{_showOwners(`OwnerBox-${el._id}`)}} onMouseOut={()=>{_HideOwnerBox(`OwnerBox-${el._id}`)}} onClick={()=>{initUpdateTask(el);_handelTaskInputBox(el._id ,el, );_HideOwnerBox(`box-${el._id}`);}}><i className="material-icons indigo-text text-darken-4">people_outline</i></a>
                  
                            <div className="OwnersHoverBox card " id={`OwnerBox-${el._id}`}>
                                <h5>owners</h5>
                                <ul className="collection">
                                    {el.owners?el.owners.map(own=>
                                    <li className="collection-item left" key={`own-${own._id}`}>
                                        
                                        {own.fullname} </li>
                                    ):'No Owners Found'
                                    }
                                    
                                </ul>
                            </div>
                
                    </div>



                        {/* status */}
                        <div className="col s12 l2 offset-l1 center status-box">
                            <a href="#" onClick={()=>{initUpdateTask(el);_handelTaskInputBox(el._id ,el)}} className="grey-text text-darken-4">{getTaskStatus(el.status)}</a>
                        </div>

                        {/* timeline */}
                        <div className="col s12 l2 offset-l1 center">
                        <a href="#" onClick={()=>{initUpdateTask(el); _handelTaskInputBox(el._id, el)}} className="grey-text text-darken-4">
                            <span className="card indigo darken-4 white-text TimeLineSpan">{getTaskDate(el.start_date,el.end_date)}</span>
                        </a>

                        </div>    
                </div>
       




    <div className="task-box row _invisible" key={`input${el._id}`}  id={`input-${el._id}`}>
                       
                        {/* name */}
                        <div className="col s12 l4  name-box"> 

                            <span className="deep-purple darken-1 delTaskIcon-box">
                                <a href="#" onClick={()=>{deletetask(projectId,el._id)}}><i className="material-icons delTaskIcon purple darken-4">delete_sweep</i></a>
                            </span>

                            
                                <input type="text" value={TaskName} name={"taskname-"+el._id} id={"taskname-"+el.name} 
                                    onChange={(e)=>{if ( currentUser.user_type === 'AdminUser'){setUpTaskName(e.target.value)}
                                    else{setErr('You Don\'t Have Enough Permission to perform this action')}}}/>
                           

                        </div>


                       
                       
                        {/* comments icon */}
                        <div className="col s12 l1  center">
                            <a href="#"><i className="material-icons indigo-text text-darken-4">mode_comment</i></a>
                        </div>




                        {/* owners icon */}
                    <div className="col s12 l1  center ">
                            <a href="#"  onClick={()=>{if ( currentUser.user_type === 'AdminUser'){_ShowOwnerBox(`box-${el._id}`)}
                                else{setErr('You Don\'t Have Enough Permission to perform this action')}}}>
                                    <i className="material-icons indigo-text text-darken-4 ">people_outline</i>
                            </a>
                        

                            <div className="card OwnerDropDown" id={`box-${el._id}`}>
                                    
                                    <a href="#" className="black-text" onClick={()=>{_ShowOwnerBox(`box-${el._id}`)}}><i className="material-icons right">close</i></a> 
                                {/* search bar */}
                                <SearchProjects id={el._id} 
                                    SearchWord={inputValue}
                                    goSearch={goSearch}
                                    startSearch={false}
                                    label='User Name'/>
                                {/* search resualt list */}
                                <ul className="ownerSearchList">
                                    {SearchResault.length&&showOwnerDrop? SearchResault.map(user=>
                                    <li key={user._id} >
                                         <a href="#"onClick={()=>{setOwners([...Owners,{_id:user._id, fullname:user.fullname}]);setUpOwners({_id: user._id, fullname:user.fullname})}}>
                                            <i className="material-icons">add</i>{user.fullname}
                                        </a>

               
                                    </li>):''}
                                </ul>
                                <div className="divider"></div> 
                                {/* owners List */}
                                <h6>Owners</h6>
                                <ul className="collection">
                                    {Owners.length?Owners.map(own=>
                                    <li className="collection-item left" key={`own-${own._id}`}>
                                        <button className="btn-flat"><i className="material-icons purple-text text-darken-4 " onClick={(e)=>{deleteOwners(own._id)}}>remove_circle_outline</i></button>
                                        {own.fullname} </li>
                                    ):'No Owners Found'
                                    }
                                    
                                </ul>
                            </div>

                    </div>




                        {/* status */}
                        
                        <div className="col s12 l2 offset-l1 center status-box">
                        
                            <select className="browser-default" onChange={(e)=>{setUpStatus(e.target.value)}}>
                                <option value=""  selected>Choose your option</option>
                                <option value="0">Not Done</option>
                                <option value="25">Started</option>
                                <option value="50">Halfway Done</option>
                                <option value="75">Almost Done</option>
                                <option value="100">Done</option>
                            </select>
                                
                              
                            
                        </div>

                        {/* timeline */}
                        <div className="col s12 l1  center timeLine-box">
                                {/* <span className="card green">{getTaskDate(tasks[0].start_date,tasks[0].end_date)}</span> */}
                               <input type="date" className="state_date"  value={StartDate} id={`start`+el._id} onChange={(e)=>{
                                               if ( currentUser.user_type === 'AdminUser'){
                                                    setStartDate(e.target.value);SetUpStartDate(e.target.value,`end`+el._id) }
                                               else{ setErr('You Don\'t Have Enough Permission to perform this action')}}}/>

                               <input type="date" className="end_date"  value={EndDate}  id={`end`+el._id}  onChange={(e)=>{           
                                   if ( currentUser.user_type === 'AdminUser'){setEndDate(e.target.value);SetUpEndDate(e.target.value,`start`+el._id)}
                                   else{setErr('You Don\'t Have Enough Permission to perform this action')}}}/>

                        </div>    
                        <button className="btn  updateTaskbtn indigo darken-4 " onClick={()=>{ _handelUpdateTask();_handelTaskInputBox(el._id ,el)}}>ok</button>
        </div>
   
                            </>}
        
                         ):null} 
                            
     


        </div> 
    </div>




        </div>
    );
}

export default TaskList;
