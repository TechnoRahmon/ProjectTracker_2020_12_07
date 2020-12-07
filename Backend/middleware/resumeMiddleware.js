const { check } = require('express-validator')
const multer = require('multer')



// resume validator
const resumeValidate = [
    check('name')
        .notEmpty().withMessage('The Name Should Not Be Empty')
        .bail()
        .isString().withMessage('The Name Should Be String'),
    check('path')
        .notEmpty().withMessage('The Path Should Not Be Empty')
        .bail()
        .isString().withMessage('The Path Should Be String')
        ,
]



//Uploading File 
const Storge = multer.diskStorage({
        destination:(req,file ,callback)=>{callback(null,__dirname+'/../public/uploads')},
        filename: (req,file ,callback)=>{ callback(null, `${Date.now()}_${file.originalname}`)}
})

// check the file must be allways pdf only 
const FileFilter =(req,file,callback)=>{
     if ( file.mimetype =='application/pdf') {callback(null,true)} else callback(null, false)
}

const upload = multer({ storage:Storge , fileFilter : FileFilter }); 



module.exports = {
    resumeValidate,
    upload
}