const Resume  = require('../Models/resumeModel')
const { validationResult } = require('express-validator')
const fs = require('fs')



//@des Get all Resuems
//@route Get api/v2/resumes
//@accesss Public
exports.getResumes  = async (req,res,next)=>{        

        try{
            const resumes = await Resume.find(); 
            if(!resumes.length) return res.status(404).json({ success:false , error:'There is no resumes to view'}); 
            return res.status(200).json({ 
                success:true,
                data: resumes
            })
        }
        catch(err){
                return res.status(500).json({ success:false , error:'Server Error'+err })
        }
}




//@des POST new resume
//@route POST api/v2/resumes
//@accesss Public
exports.AddResumes  = async (req,res,next)=>{        

    try{
        const {name,path} = req.body;
        const errors = validationResult(req)
        const file = req.file ; 

        // check if there is any error form express-validator (resumeValidator.js) middleware
        //if(!errors.isEmpty()) return res.status(422).json({ success:false , error:errors.array() })
        
        //check if file exist !! 
        if(!file) return res.status(400).json({ success:false , error:'Please Upload a PDF File' })
        
        //check the databasse elements
        const resumes = await Resume.find()
        if (resumes.length>0){
            //delete the file from the Server storage
            fs.unlinkSync(resumes[0].path)
            await resumes[0].deleteOne() 
        
        }
        // add new resume 
        const resume = new Resume({
            name : file.filename, 
            path : file.path,
        }); 
        await resume.save()
        return res.status(200).json({ 
            success:true,
            data: resume
        })
    }
    catch(err){        
        if(err.name == 'ValidationError') return res.status(422).json({ success:false , error:err.errors.name.message}); 
            return res.status(500).json({ success:false , error:'Server Error : '+err })
    }
}





//@des GET Download resume file
//@route GET  api/v2/resume/:id/download
//@accesss Public

exports.downloadFile= async (req,res,next)=>{
        try{
            //get the resume id 
            const id = req.params.id

            // get specific resume from db 
            const resume = await Resume.findById(id)

            // check if resume is Not exist
            if (!resume) return res.status(404).json({ success:false , error : 'File Not found'})
            
            //download the PDF file
            return res.download(resume.path)

        }
        catch(err){
            return res.status(500).json({ success:false , error:'Server Error : '+err })
        }
}




//@des GET single resume file
//@route GET api/v2/resume/:id/download
//@accesss Public

exports.resumeDetails= async (req,res,next)=>{
    try{
        //get the resume id 
        const id = req.params.id

        // get specific resume from db 
        const resume = await Resume.findById(id)

        // check if resume is Not exist
        if (!resume) return res.status(404).json({ success:false , error : 'File Not found'})
        console.log(resume);
        //return the resume details
        return res.status(200).json({ 
            success:false ,
             data: {
                 name: resume.name,
                 url : `/uploads/${resume.name}`,
                 path: resume.path,
             } })

    }
    catch(err){
        return res.status(500).json({ success:false , error:'Server Error : '+err })
    }
}






//@des DELETE Delete resume file
//@route DELETE api/v2/resume/:id/
//@accesss Public

exports.deleteResume = async (req,res,next)=>{
    try{
        //get the resume id 
        const id = req.params.id

        // get specific resume from db 
        const resume = await Resume.findById(id)
        console.log();
        // check if resume is Not exist
        if (!resume) return res.status(404).json({ success:false , error : 'File Not found'})
        
        //delete the file from the Server storage
         fs.unlinkSync(resume.path)
        
        //delete the file's record from the mongodb 
        await resume.deleteOne()

        return res.status(200).json({ success:true, msg:'File Has Been Deleted Successfly'})

        
    }
    catch(err){
        return res.status(500).json({ success:false , error:'Server Error : '+err })
    }
}