const Users = require('../Models/userModel')
const Account = require('../Models/accountModel')

const bcrypt  = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {  validationResult } = require('express-validator')
const {roles} = require('../roles/roles.js')
var mailer = require('nodemailer')







//********** Functions ************************************



//********** validation Resault ************

 function getValidationResualt(req){
            const error = validationResult(req)
            if(!error.isEmpty())
                return error.array() 
            return false
 }



//********** is email exist ************
async function isEmailExist(email){
        const user =await Users.find({ email : email})
        //console.log('inner func :',user);
        if (user) return user
        return false
}

async function isEmailExistInAccount(email,account_name){
        const account = await Account.findOne({ name : account_name })
        if (!account) return false
        //console.log('acc : ', account._id);
        const user =await Users.find({ email : email , account_id: account._id}).populate('account_id','name') ;
        //console.log('inner func :',user);
        if (user) return user
        return false
}

//********** is passwords Matched ************
async function isPwdsMatched(oldPwd , newPwd ){
        //compare the passwords 
        return await bcrypt.compare(oldPwd, newPwd)
}



async function createAccount(accountname){
    try{

            // if accountname exist return false
        const account = await Account.find({ name : accountname});
        //console.log(`account ${account}`.green)
        if (account.length>0) return {exist : true}

        const newAccount = new Account({name:accountname})
       const savedAccount =  await newAccount.save(); 
       return {id : savedAccount._id}
    }
    catch(err){
        return { error : err}
    }
        
}





//********** Functions End************************************






//********** default route ************
//@des Get all Users
//@route Get api/v1
//@accesss private (allow for all users)

exports.getAllUsers = async (req, res ,next)=>{
        try{
            const users = await Users.find({ account_id : req.user.account_id._id })
                .populate('account_id','name -_id').select('-password')
            if (!users.length) return res.status(404).json({ success:false , error : 'There is No Data Fount'})

            return res.status(200).json({ success:true , count: users.length , data: users })
        }
        catch(err){
            console.log(err)
            return res.status(500).json({ success:false, error : 'Server Error'})
        }
    }




//********** register **********
//@des Add  new User
//@route Post api/v1/user
//@accesss Public

exports.addUserDetails = async (req, res ,next)=>{
    try{
        const errors = getValidationResualt(req)
        if(errors)
        //returning only first error allways 
            return res.status(400).json({ success:false , msg:errors[0].msg })

        const { email , password , fullname, accountname} = req.body; 
        
        //check the eamil 
        const user =await isEmailExist(email)
        //console.log(user);
        if ( user.length) return res.status(400).json({ success:false , msg:'This Email is already registered'})
        

        // create account
        const account = await createAccount(accountname)
        if (account.error) return res.status(500).json({ success:false, error : 'Server Error : '+account.error})
        if (account.exist) return res.status(400).json({ success:false , msg:'The Account Name is already registered'})

        //hash password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        
        //add new user  
        const newUser = new Users({
            fullname : fullname, 
            email : email , 
            password : passwordHash,
            account_id:account.id,
            // user_type is AdminUser by default
            verified:true,
        })

        const savedUser = await newUser.save(); 
        
        
        return res.status(200).json({ success:true , data: savedUser})
    }
    catch(err){
        if ( err.name == 'ValidationError') return res.status(400).json({ success:false, error : 'Server Error'+err})
        return res.status(500).json({ success:false, error : 'Server Error : '+err})
    }
}




//********** invite **********

//@des invite User
//@route Post api/v1/invite
//@accesss Private Admin
exports.inviteUser = async (req, res ,next)=>{
    try{
        const errors = getValidationResualt(req)
        if(errors)
        //returning only first error allways 
            return res.status(400).json({ success:false , msg:errors[0].msg })

        const { email , role } = req.body; 
        
        //check the eamil 
        const user =await isEmailExistInAccount(email,req.user.account_id.name)
        //console.log(user);
        if ( (user.length>0 )&& (user[0].verified)) return res.status(400).json({ success:false , msg:'This Email is already registered in '+req.user.account_id.name+' account'})
        

        //console.log(req.user.account_id.name)

        if (!user.length){
            //add new user  
            const newUser = new Users({
                email : email , 
                account_id:req.user.account_id._id,
                user_type:role
                })

            const savedUser = await newUser.save(); 
                
            // setup invitation variable
            res.locals.inviteUser = { userID :savedUser._id, email, savedUser}
            next() 
            }else{

        // setup invitation variable
        res.locals.inviteUser = { userID :user[0]._id, email, savedUser:user}

        next()
            }

    }
    catch(err){
        if ( err.name == 'ValidationError') return res.status(400).json({ success:false, error : 'Server Error'+err})
        console.log(err)
        return res.status(500).json({ success:false, error : 'Server Error : '+err})
    }
}

//********** invite **********

//@des invite User
//@route Post api/v1/invite
//@accesss Private Admin

exports.sendInvitation= async (req, res ,next)=>{
            try {


    const { userID,email,savedUser} = res.locals.inviteUser


    // send invitation
    const transporter = mailer.createTransport({
        service:'gmail',
         //service is the e-mail service that you want to use
        auth:{
        user: process.env.EMAIL,
         //user should be sender email 
        pass:process.env.PASSWORD
          }
        })

        //console.log(` PASSWORD : ${process.env.PASSWORD}`)

    const mailOptions={
            from:process.env.EMAIL,
            to:email,
            cc:'',
            bcc:'',
            subject: `[ProjectTracker] ${req.user.fullname} has invited you to ${req.user.account_id.name}'s ProjectTracker account`,
            // here should we send end point to react route to complete the registration
            text: `${req.user.name} has invited you to ProjectTracker\n\n
                    accept the invitation go to : ${req.headers.host}/users/${userID} `,
            html:`<!DOCTYPE html>
            <html><body>
            
                     <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;width: 80%;
                    background-color: rgb(245, 245, 245);margin:50px auto 0 auto; padding:45px;">
                    <h2 style="text-align:center;font-size:32px;width:100%;">${req.user.fullname} has invited you to ProjectTracker </h2><hr><br>
                    <p style="text-align:center; display: flex;justify-self: center;width:80%;" > accept the invitation go to : </p>
                    <a href="http://${req.headers.host}/users/${userID}"
                        style="background-color:#fc8621; padding:10px 20px; color:#393e46;text-decoration: none;margin:0 auto; display:inline-block">
                        accept invtation
                        </a></div>
            
            </body> </html>  `,
            amp: `<!DOCTYPE html>
            <html ⚡4email><body style="display: flex;flex-direction: column;justify-content: center;align-items: center;width: 80%;
            background-color: rgb(245, 245, 245);margin:50px auto 0 auto; padding:45px;">
            
                     
                    <h2 style="text-align:center;font-size:32px;width:100%;">${req.user.fullname} has invited you to ProjectTracker </h2><hr><br>
                    <p style="text-align:center; display: flex;justify-self: center;width:80%;" > accept the invitation go to : </p>
                    <a href="http://${req.headers.host}/users/${userID}"
                        style="background-color:#fc8621; padding:10px 20px; color:#393e46;text-decoration: none;margin:0 auto; display:inline-block">
                        accept invtation
                        </a>
            
            </body> </html>  `
            
            }


    transporter.sendMail(mailOptions, function(err, info){
                if(err) return res.status(400).json({ success:false, error : 'MailError : '+err})


                //console.log("Email Sent: " + info.response);
        return res.status(200).json({ 
            success:true , 
            msg:"invitation is successfully Send ", 
            link:`http://${req.headers.host}/users/${userID}` , 
            data:savedUser })

                })


        } catch (err) {
            return res.status(500).json({ success:false, error : 'Server Error : '+err})
        }
   
}



//********** accept invitation **********

//@des complete User registration
//@route PUT api/v1/users/:id
//@accesss Private Admin
exports.userAccecptInvitation = async (req, res ,next)=>{
    try{
        const errors = getValidationResualt(req)
        if(errors)
        //returning only first error allways 
            return res.status(400).json({ success:false , msg:errors[0].msg })

        const {  password , fullname} = req.body; 
        const { userId } = req.params;


        //hash password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        
        //update user info 
         
        const user = await Users.findByIdAndUpdate(id,{
            fullname : fullname, 
            password : passwordHash,
            verified:true,
        })

        
        
        
        return res.status(200).json({ success:true , data: await Users.findById(id)})
    }
    catch(err){
        if ( err.name == 'ValidationError') return res.status(400).json({ success:false, error : 'Server Error'+err})
        console.log(err)
        return res.status(500).json({ success:false, error : 'Server Error : '+err})
    }
}







//********** login **********
//@des login User
//@route Post api/v1/login
//@accesss Public

exports.userLogin = async (req, res ,next)=>{
    try{
        const errors = getValidationResualt(req)
        if(errors)
        //returning only first error allways 
            return res.status(400).json({ success:false , msg:errors[0].msg })



        const { email , password, account_name } = req.body; 
        //check the eamil 
        const user =await isEmailExistInAccount(email,account_name) ;
        //console.log(user);

        if ( !user.length ) return res.status(400).json({ success:false , msg:'This Email is Not registered in '+account_name+' account'})
        
        // is the passwords matched  (new pwd , old pwd )
        const isMatched = await isPwdsMatched(password, user[0].password ); 
        //console.log('matcheing pwd' ,isMatched);

        if ( !isMatched )return res.status(400).json({ success:false , msg:'The Password is Not Correct'})
        //console.log(`res.locals.loggedInUser: ${res.locals.loggedInUser}`)
        
        //generate token 
        const token = jwt.sign({userId : user[0]._id.toString() }, process.env.TOKEN , { algorithm:"HS256"} )
        
        res.cookie('token',token )
        
        return res.status(200).json({ 
            success:true ,
            token, 
            user:{
                id:user[0]._id,
                fullname:user[0].fullname , 
                image_path: user[0].image_path, 
                user_type :user[0].user_type,
                account:user[0].account_id, 
               }
            })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ success:false, error : 'Server Error : '+err})
    }
}






exports.logout = async (req,res,next)=>{
    // Set token to none and expire after 5 seconds
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 1 * 1000),
        httpOnly: true,
        })

        res.status(200).json({ success:true, msg:'User logged out successfully'})
}







//********** valid token  ********** 
//@des Check token validation
//@route GET api/v1/valid
//@accesss Public
exports.isTokenValid = async(req,res,next)=>{
    try{
        const token =  req.cookies['token'];
        console.log('token from controller : '.green ,token,'*'.green);
        if (!token) return res.status(401).json(false)

        const verified = jwt.verify(token , process.env.TOKEN)
        if(!verified) return res.status(401).json(false)

        let user = await Users.findById(verified.userId).populate('account_id','name')
        if(!user) return res.status(404).json(false)
        //user = await user
        return res.status(200).json({
            success:true,
            user:{
                id:user._id,
                firstname : user.fullname,
                account: user.account_id,
                user_type :user.user_type,
            }
        })
    }
    catch(err){
        return res.status(500).json({ success:false, error : 'Server Error : '+err})
    }
}



//********** delete User  ********** 
//@des delete User 
//@route DELETE api/v1/user/:id
//@accesss privte AdminUser, and the owner MemberUser
exports.deleteUser = async (req,res,next)=>{
    try {
        const {id}  = req.params
        const user = await Users.find({_id:id , account_id:req.user.account_id._id})
        //console.log(userId);
        if (!user.length) return res.status(404).json({error:'User does not exisit in '+req.user.account_id.name})

        await user[0].deleteOne()
  
        return res.status(200).json({
            data:null, message:'User hase been deleted', success:true
        })

    } catch (err) {
        return res.status(500).json({ success:false, error : 'Server Error : '+err})
    }
}


//********** update User  ********** 
//@des update User 
//@route PUT api/v1/user/:id
//@accesss privte AdminUser, and the owner MemberUser
exports.updateUser = async (req,res,next)=>{
    try {
        const errors = getValidationResualt(req)
        if(errors)
        //returning only first error allways 
            return res.status(400).json({ success:false , msg:errors[0].msg })

        const {role} = req.body
        const {userId} = req.params; 
        await Users.findOneAndUpdate({_id:userId , account_id:req.user.account_id._id} ,{user_type: role})
        // retrieve the data to return it 
        const user = await Users.findOne({_id:userId , account_id:req.user.account_id._id})
        if (!user) return res.status(404).json({error:'User does not exisit'})

        return res.status(200).json({
            data:user
        })
    } catch (err) {
        return res.status(500).json({ success:false, error : 'Server Error : '+err})
    }
}