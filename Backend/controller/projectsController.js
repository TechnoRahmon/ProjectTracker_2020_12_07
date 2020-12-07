const { check, validationResult } = require("express-validator");
const multer = require("multer");
const Project = require("../Models/projectModel");


const isNameExist = async (projectName)=>{
   const  project = await Project.find({ name: projectName });
    if(project.length) {
        return  true
    }
    return  false;
}





//@des Get all Projects
exports.getProjects = async (req, res) => {
  try {
    Project.get((err,projects) => {
      return res.status(200).json({
        success: true,
        data: projects,
      });
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      err: error.message
    });
  }
};

// // @des Get one Project

// exports.view = async (req, res) => {
//   try {
//     await Project.findById(req.params.project_id, (err, project) => {
      
//       if(err) {
//         console.log("error 404, prjocet not found".red);
//         return res.status(404).json({
//           success : false,
//           err: "Project is not found"
//         })
//       }

//      return res.status(200).json({
//         success: true,
//         data: project
//       });
//     }).catch(err) 
//     {return res.status(500).json({
//       success: false,
//       err: "Server error: " + error.message,
//     })}

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       err: "Server error: " + error.message,
//     });
//   }
// };


exports.view = async (req, res) => {
  try {
   const project = await Project.findById(req.params.project_id) 
      
      if (!project) {
        console.log("error 404, prjocet not found".red);
        return res.status(404).json({
          success: false,
          err: "Project is not found",
        });
      }

     return res.status(200).json({
        success: true,
        data: project
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      err: "Server error: " + error.message,
    });
  }
};


// @des Post new Project

exports.new = async (req, res) => {
  try {
    const errors = validationResult(req);
    const imagefile = req.file; 

    // check if image file here 
    if (!imagefile) return res.status(400).json({success:false , err:'Please Upload Image Type Of (gif ,png ,jpg) Maximum 1M Bytes'})

    //console.log(`req.body ${req.body}`.green);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({
        success: false,
        err: errors.array()[0].msg,
      });
    }
    
    const nameError = await isNameExist(req.body.name);
    if ( nameError){
        return res.status(401).json({
            success: false,
            err : "Name is already taken"
        })
    }    
    
   
    const project = new Project();
    project.name = req.body.name;
    project.url = req.body.url;
    project.source_code = req.body.source_code;
    project.img_path = `/images/${req.file.filename}`;
    project.description = req.body.description;
    console.log(req.body);
    await project.save();
    return res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    if (error.name === "ValidationError") 
      return res.status(402).json({  success: false, err: error });
      
    if (error.name=='MulterError') {console.log(error); return res.status(400).json({  success: false, err: error });}
    console.log('req.body : ',req.body,req.file);
    console.log(error.name=='MulterError');
    res.status(500).json({
      success: false,
      err: error.message
    });
  }
};

// @des Delete new Project

exports.delete =  async function (req, res) {

    try {
      const project = await Project.findById(req.params.project_id) 
      if(!project) {

        return res.status(404).json({
          success: false,
          err : "prjocet is not exist"
        })

      }
      await Project.deleteOne({_id:project._id}, (err)=>{
            res.json({
            status: "sucess",
            message: "project deleted",
            });
        })
         
    } catch (error) {
        if (err) {
            res.json({
                err: err.message,
                // message: "something worng!"
            });
            }
    }
}