const Router = require('express').Router()
const ResumeController = require('../controller/resumesController')
const { resumeValidate , upload }=require('../middleware/resumeMiddleware')



//get all and post new resume
Router
    .route('/resumes')
        .get( ResumeController.getResumes)
        .post( upload.single('myfile') ,resumeValidate,ResumeController.AddResumes)

//download resume file
Router
    .route('/resume/:id/download')
        .get(ResumeController.downloadFile)


//delete resume file  && get single resume 
Router
    .route('/resume/:id')
        .delete(ResumeController.deleteResume)
        .get(ResumeController.resumeDetails)

        
module.exports= Router