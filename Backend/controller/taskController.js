 const Task  = require('../Models/taskModel')
const { validationResult } = require('express-validator')
const { response } = require('express')
// const fs = require('fs')



//********** Functions ************************************

//********** validation Resault ************

function getValidationResualt(req){
    const error = validationResult(req)
    if(!error.isEmpty())
        return error.array() 
    return false
  }

  
//********** Check if owner is exist in a task Function ************

const isOwnerExist = (task,userId)=>{
    let isOwner = false;

    // if owners found 
    if (task.owners.length){

         task.owners.forEach(el=>{   
                    // if userid is matched with owner's ids
                    if (el._id.toString() === userId.toString())
                        isOwner=true;
                    
                   }) 
                   // then return isOwner
                   return isOwner
    }else
    //else return false
        return isOwner ;
}




//@des Get all Tasks
//@route Get api/v3/tasks
//@accesss private (allow for all users)
        exports.getTasks  = async (req,res,next)=>{        

        try{
            const {projectId} = req.params
            const tasks = await Task.find({ project_id : projectId , account_id :req.user.account_id._id}).populate('owners','fullname image_path')

            if(!tasks.length) return res.status(404).json({ success:false , error:'There Is No Tasks Found'}); 
            
            tasksWithFormatDate = tasks.map(el=>{
                return { 
                    _id:el._id,
                    name:el.name,
                    project_id:el.project_id ,
                    status:el.status,
                    comments:el.comments,
                    owners:el.owners,
                    start_date:Task.getDate(el.start_date),
                    end_date:Task.getDate(el.end_date),
                }
            })
            return res.status(200).json({ 
                success:true, 
                count:tasks.length, 
                data:tasksWithFormatDate
            })
        }
        catch(err){
            console.log(err)
                return res.status(500).json({ success:false , error:'Server Error'+err })
        }
}






//@des GET single task for specific account
//@route GET api/v3/task/:id
//@accesss private (allow for Admin)
exports.taskDetails = async (req, res) => {
    try {
      const { projectId , taskId}= req.params; 
     const task = await Task.findOne({ _id: taskId ,project_id:projectId , account_id : req.user.account_id._id }) 
        
        if (!task) {
          console.log("error 404, prjocet not found ".red, taskId);
          return res.status(404).json({ success: false, error: "Task Is Not Found" });
        }
        //console.log(task.created_at.toString())
       return res.status(200).json({
          success: true,
          data: {  _id : task._id , 
            name: task.name ,
            start_date:await  Task.getDate(task.start_date),
            end_date: await Task.getDate(task.end_date),
            project_id: task.project_id,
            status:task.status,
            comments:task.comments,
            owners:task.owners,
              }
        });
  
    } catch (err) {
      return res.status(500).json({ success: false, error: "Server error: " + err });
    }
  };




//@des POST new resume
//@route POST api/v3/tasks
//@accesss Public
exports.newTask  = async (req,res,next)=>{        

    try {
        const {projectId} = req.params
        const tasks = await Task.find({ project_id: projectId , account_id : req.user.account_id._id })
        //console.log(`tasks ${tasks.length} ${req.user.account_id._id}`)
        
        // default new Task 
        const task = new Task();
        
        task.account_id= req.user.account_id._id; 
        task.project_id= projectId; 
        task.name = `task ${tasks.length+1}`;
       
        //Task.created_at = 
        const savedTask = await task.save()
    
          return res.status(201).json({ 
            success: true, 
            data: { _id : savedTask._id , 
                    name: savedTask.name ,
                    start_date:await  Task.getDate(savedTask.start_date),
                    end_date: await Task.getDate(savedTask.end_date),
                    project_id: savedTask.project_id,
                    status: savedTask.status,
                      }
                  });
    
      } catch (err) {
          console.log(err )
          return res.status(500).json({ success: false, error: 'Server Error'+err });
      }
}



// ***************** Update Task**************


//@des PUT Update single task for specific project
//@route PUT api/v3/project/:projectId/task/:taskId
//@accesss private (allow for admin and BasicUser onwer)
exports.updateTask =  async function (req, res,next) {

    try {
      const errors = getValidationResualt(req)
      if(errors)
      //returning only first error allways 
          return res.status(400).json({ success:false , msg:errors[0].msg })
  
  
        const {name ,owners,status,start_date,end_date,comments} = req.body
        const {projectId , taskId} = req.params; 
        


    //find the task
    let task = await (await Task.findOne({_id : taskId, project_id: projectId , account_id : req.user.account_id._id}))
    if (!task) return res.status(404).json({error:'task does not exist in '+req.user.account_id.name+' account'})
    task=task.populate('owners','_id')
    const isOwner = await isOwnerExist(task,req.user._id) ; 

       //console.log('isOwner',isOwner)

        // Update  if current user as Admin 
        if(req.user.user_type === 'AdminUser'){
            await Task.findOneAndUpdate(
                // find specific task in specific project in current account
                { _id : taskId, project_id: projectId , account_id : req.user.account_id._id },
                //update it as admin
                { name,owners:owners,status,start_date,end_date ,
                    comments:comments
                    })

                return next()
            }
  
        // check if current user is BasicUser and the owner of the task
        if(req.user.user_type === 'BasicUser' && isOwner ){        
            //update the task as BasicUser 
            await Task.findOneAndUpdate(
                // find specific task in specific project in current account
                { _id : taskId, project_id: projectId , account_id : req.user.account_id._id },
                //update it as admin
                { status, comments:comments 
                } )
            return next()
        }

        // if User Don't Have Enough Permission
        return res.status(401).json({success:false , error:'You Don\'t Have Enough Permission'})

    } catch (err) {
        console.log(err)
        return res.status(500).json({ success:false, error : 'Server Error : '+err})
    }
  }


// make a function to multiple Update response calls
exports.sendUpdateRes =async (req,res,next)=>{
    
    const {projectId , taskId} = req.params; 
    

    //find the task
    let task = await Task.findOne({_id : taskId, project_id: projectId , account_id : req.user.account_id._id})
    if (!task) return res.status(404).json({error:'task does not exist in '+req.user.account_id.name+' account'})

        return res.status(200).json({ 
                success:true , 
                data: { _id : task._id , 
                name: task.name ,
                status:task.status,
                owneres:task.owners,
                comments:task.comments,
                start_date :await  Task.getDate(task.start_date),
                end_date : await Task.getDate(task.end_date),
                account_id: task.account_id,
                project_id: task.project_id,
                    } 
            })
    }



//@des DELETE single task for specific account
//@route DELETE api/v3/project/:projectId/task/:taskId
//@accesss private (allow for Admin)
exports.deleteTask =  async function (req, res) {

    try {
      const {taskId , projectId}   = req.params

      const task = await Task.findOne({_id:taskId, project_id:projectId , account_id:req.user.account_id._id})
      //console.log(id);
      if (!task) return res.status(404).json({error:'Task Dos\'t  Exist'})
  
      await task.deleteOne()
  
      return res.status(200).json({ data:null, message:'Task Hase Been Deleted', success:true })
  
  } catch (err) {
      console.log(err)
      return res.status(500).json({ success:false, error : 'Server Error : '+err})
  }
  }



  //add comments

//   comments.content?[...task.comments,
//     {content:comments.content, user_id:req.user._id, created_at:new Date()}]:[...task.comments]

