const { check } = require('express-validator')
const multer = require('multer')



// update task validator
const updateTaskValidator = [

    check("start_date")
        .custom((value,{req})=> new Date(req.body.end_date) >= new Date(value)).withMessage('Invalid Timeline Entries'),
    check("comments")
        .custom((value,{req})=> {if (value.content){console.log(value.content.length);return Number(value.content.length)<=300}
                                     else return true}
        ).withMessage('Content Should Be Maximum 300 letter'),

      //new Date('2020-12-10')>=new Date('2020-12-09')
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
    updateTaskValidator,
    upload
}