const {  validationResult } = require("express-validator");
const multer = require("multer");
const Project = require("../Models/projectModel");
const Task = require('./../Models/taskModel')



//********** Functions ************************************

//********** validation Resault ************

function getValidationResualt(req){
  const error = validationResult(req)
  if(!error.isEmpty())
      return error.array() 
  return false
}

//********** is Name exist ************
const isNameExist = async (projectName)=>{
   const  project = await Project.find({ name: projectName  });
    if(project.length) {
        return  true
    }
    return  false;
}


//********** Functions End************************************





//********** default route ************
//@des Get all Projects for specific account
//@route Get api/v2/projects
//@accesss private (allow for all users)

exports.getAllProjects = async (req, res ,next)=>{
  try{
      const projects = await Project.find({ account_id : req.user.account_id._id }).populate('account_id','name _id').select('name')
      if (!projects.length) return res.status(404).json({ success:false , error : 'There is No Data Found'})
      
      return res.status(200).json({ 
        success:true , 
        count: projects.length , 
        
        data: projects
        })
  }
  catch(err){
      return res.status(500).json({ success:false, error : 'Server Error'+err })
  }
}




//@des POST new Project for specific account
//@route POST api/v2/projects
//@accesss private (allow for all users)
exports.newProject = async (req, res,next) => {
  try {

    const projects = await Project.find({ account_id: req.user.account_id._id  })
    console.log(`projects ${projects.length} ${req.user.account_id._id}`)
    
    // default new project 
    const project = new Project();
    project.name = `Project ${projects.length+1}`;
    project.description = 'The essence of this board is to provide a high-level overview of your project. This is the place to plan and track your progress. ';
    project.account_id= req.user.account_id._id; 
    //project.created_at = 
    const savedProject = await project.save()

      return res.status(201).json({ 
        success: true, 
        data: { _id : savedProject._id , 
                name: savedProject.name ,
                created_at :  Project.getDate(savedProject.created_at),
                description:savedProject.description,
                account_id: savedProject.account_id,
                  }
              });

  } catch (err) {
    console.log(err)
      return res.status(500).json({ success: false, error: 'Server Error'+err });
  }
};






//@des GET single Project for specific account
//@route GET api/v2/project/:id
//@accesss private (allow for Admin)
exports.projectDetails = async (req, res) => {
  try {
    const id = req.params.id; 
   const project = await Project.findOne({_id:id , account_id : req.user.account_id._id }) 
      
      if (!project) {
        console.log("error 404, prjocet not found".red);
        return res.status(404).json({ success: false, error: "Project is not found" });
      }
      //console.log(project.created_at.toString())
     return res.status(200).json({
        success: true,
        data: { _id : project._id , 
          name: project.name ,
          created_at :  Project.getDate(project.created_at),
          description:project.description,
          account_id: project.account_id,
            }
      });

  } catch (err) {
    return res.status(500).json({ success: false, error: "Server error: " + err });
  }
};


//@des PUT Update single Project for specific account
//@route PUT api/v2/project/:id
//@accesss private (allow for Admin)
exports.updateProject =  async function (req, res) {

  try {
    const errors = getValidationResualt(req)
    if(errors)
    //returning only first error allways 
        return res.status(400).json({ success:false , msg:errors[0].msg })


    const {name , description } = req.body
    const id = req.params.id; 

    await Project.findOneAndUpdate({_id:id , account_id:req.user.account_id._id} ,{ name:name , description:description })
    const project = await Project.findOne({_id:id , account_id:req.user.account_id._id})
    if (!project) return res.json({error:'project does not exist in '+req.user.account_id.name+' account'})

    return res.status(200).json({ 
      success:false , 
      data: { _id : project._id , 
        name: project.name ,
        created_at :  Project.getDate(project.created_at),
        description:project.description,
        account_id: project.account_id,
          } 
    })
  } catch (err) {
      return res.status(500).json({ success:false, error : 'Server Error : '+err})
  }
}



//@des DELETE single Project for specific account
//@route DELETE api/v2/project/:id
//@accesss private (allow for Admin)
exports.deleteProjcet =  async function (req, res) {

  try {
    const {id}  = req.params
    const project = await Project.findOne({_id:id , account_id:req.user.account_id._id})
    //console.log(id);
    if (!project) return res.status(404).json({error:'Project Dos\'t  Exist In '+req.user.account_id.name+' Account'})

    await project.deleteOne()

    return res.status(200).json({
        data:null, message:'Project hase been deleted', success:true
    })

} catch (err) {
    return res.status(500).json({ success:false, error : 'Server Error : '+err})
}
}