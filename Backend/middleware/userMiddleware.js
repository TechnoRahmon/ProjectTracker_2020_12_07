const {check} = require('express-validator')


//must include one lowercase character, one uppercase character, a number, and a special character.
    const addUserValidator = [
        check('fullname').notEmpty().withMessage('Name Should Not Be Empty')
        .bail(),
        check('accountname').notEmpty().withMessage('Account Name Should Not Be Empty')
        .bail(),
        check('email').notEmpty().withMessage('Email Should Not Be Empty').bail()
        .isEmail().withMessage('Invalid Emial'),

        check('password').notEmpty().withMessage('Password Should Not Be Empty')
        .bail()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
        .withMessage('Invalid Password Entries, Use 8 or more characters with a mix of letters, numbers & symbols ')
    ]

    // invite user
    const inviteUserValidator = [

        check('email').notEmpty().withMessage('Email Should Not Be Empty').bail()
        .isEmail().withMessage('Invalid Emial'),
        check('role').notEmpty().withMessage('User Role Should Not Be Empty').bail()
        .custom((value,{req})=> value ==='ViwerUser'||value==='BasicUser'||value==='AdminUser').withMessage('Invalid Role Type'),
        
    ]
    
  // user acceptation
    const userVerficationValidator = [
        check('fullname').notEmpty().withMessage('Name Should Not Be Empty')
        .bail(),
        check('password').notEmpty().withMessage('Password Should Not Be Empty')
        .bail()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
        .withMessage('Invalid Password Entries, Use 8 or more characters with a mix of letters, numbers & symbols ')
    ]


  // update user
    const updateUserDetails = [

        check('role').notEmpty().withMessage('User Role Should Not Be Empty').bail()
        .custom((value,{req})=> value ==='ViwerUser'||value==='BasicUser'||value==='AdminUser').withMessage('Invalid Role Type'),
        
    ]


      // login user
      const userLoginValidator = [
        check('email').notEmpty().withMessage('Email Should Not Be Empty').bail()
        .isEmail().withMessage('Invalid Emial'),

        check('password').notEmpty().withMessage('Password Should Not Be Empty')
        .bail(),
        check('account_name').notEmpty().withMessage('Account Name Should Not Be Empty').bail()
        
        
    ]
// grantAccess function 

const grantAccess = (action, resource)=>{
    return (req,res,next)=>{

            try {
                const permission =  roles.can(req.user.role)[action](resource);
                console.log('PERMISSION IS '+permission.granted);
                //if permission not granted
                if(!permission.granted){
                    return res.status(401).json({error:'You don"t have enough permission to preform this action'})
                    
                    
                }else {  
                // if update has rate, trigger pass noly rate value from DB to rate function
                 next()
                
                }
               
               

            } catch (error) {   next(error)}
        }
}


//********** check if user loged in ************
const AllowIfLogin = async (req,res,next)=>{
        
    try {
        const user = res.locals.loggedInUser;
        //console.log(`user : `,user[0])
        if(!user.length) return res.status(401).json({success:false,  error:'You need to logged in to access this route'})
            req.user = user[0];
            next()

    } catch (error) {
        next(error)
    }
}




module.exports = {  addUserValidator,
                    userVerficationValidator,
                    inviteUserValidator,
                    updateUserDetails,
                    userLoginValidator,
                    AllowIfLogin,
                    grantAccess,
                }