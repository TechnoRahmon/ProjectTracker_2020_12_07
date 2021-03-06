
const {check,validatorresult } = require('express-validator');
const multer = require('multer')
const path = require('path')




  // update project validator
 const updateProject = [
  check('name')
        .notEmpty().withMessage('The Name Should Not Be Empty')
        .bail()
        .isString().withMessage('The Name Should Be String'),
  check("description")
   .isString().withMessage('The Name Should Be String'),

    
];




//Uploading File 
const Storge = multer.diskStorage({
  destination:(req,file ,callback)=>{callback(null,__dirname+'/../public/images')},
  filename: (req,file ,callback)=>{ callback(null, file.originalname)}
})

// check the file must be allways pdf only 
const FileFilter =(req,file,callback)=>{
  const ext = path.extname(file.originalname).toLocaleLowerCase()
if ( ext =='.gif' || ext =='.png'||ext =='.jpeg'||ext =='.jpg') {callback(null,true)} else callback(null, false)
}

const Limits = {
    fileSize: 1024*1024 // 1MB  max
}
const upload = multer({ storage:Storge , fileFilter : FileFilter , limits: Limits}); 

const makeUpload = upload.single('myImage')

// Multer error handler 
const uploadCallBack =  (req, res ,next )=>{
     makeUpload(req,res,(err)=>{
          if (err instanceof multer.MulterError){
            console.log('error multer ', err.message);
              return res.status(400).json({success:false , err:err.message})
          }else if(err) return res.status(500).json({success:false , err:err})
          next()
    })
}


module.exports = { 
  updateProject,
  uploadCallBack,};