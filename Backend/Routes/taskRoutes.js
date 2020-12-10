const Router = require('express').Router()
const TaskController = require('../controller/taskController')
const { updateTaskValidator , upload }=require('../middleware/taskMiddleware')
const {AllowIfLogin, grantAccess,} = require('./../middleware/GlobalMiddleware')




Router
    .route('/project/:projectId/tasks')   
        // Get all  tasks & Add new project @accesss private (allow for all users)  
        .get(AllowIfLogin,grantAccess('readAny','task'), TaskController.getTasks) 
        // add new  task //@accesss private (allow for Admin)
        .post( AllowIfLogin,grantAccess('createAny','task'),TaskController.newTask)
Router
    .route('/project/:projectId/task/:taskId')  
        // get taskDetails @accesss private (allow for all users) 
        .get(AllowIfLogin,grantAccess('readAny','task'),TaskController.taskDetails)
        // update task (task's Details & owners & commnets) @accesss private (allow for admin and BasicUser onwer)
        .put(AllowIfLogin,grantAccess('updateAny','task'),updateTaskValidator,TaskController.updateTask,TaskController.sendUpdateRes)
        // delete task //@accesss private (allow for Admin)
        .delete(AllowIfLogin,grantAccess('deleteAny','task'),TaskController.deleteTask)

        

module.exports= Router