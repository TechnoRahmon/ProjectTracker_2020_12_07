
const {roles} = require('../roles/roles')













// grantAccess function 

const grantAccess = (action, resource)=>{
    return (req,res,next)=>{

            try {
                const permission =  roles.can(req.user.user_type)[action](resource);
                console.log('PERMISSION IS '+permission.granted);
                //if permission not granted
                if(!permission.granted){
                    return res.status(401).json({success:false , error:'You don\'t have enough permission to preform this action'})
                    
                    
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
        if(!user) return res.status(401).json({success:false,  error:'You need to logged in to access this route'})
            req.user = user[0];
            next()

    } catch (error) {
        next(error)
    }
}


module.exports = { 
    AllowIfLogin,
    grantAccess,
}