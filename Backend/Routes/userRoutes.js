const Router = require('express').Router(); 
const UserController = require('../controller/userController')
const { addUserValidator , 
        AllowIfLogin, 
        grantAccess,
        inviteUserValidator,
        userVerficationValidator,
        updateUserDetails,
        userLoginValidator, } = require('../middleware/userMiddleware')


Router
    .route('/users')
        // create account  : public
        .post( addUserValidator ,UserController.addUserDetails)
        // get all users : private (all users only)
        .get(AllowIfLogin,UserController.getAllUsers )
        
Router
    .route('/users/invite')
        // invite   : Admin
        .post(AllowIfLogin,inviteUserValidator,UserController.inviteUser,UserController.sendInvitation)


Router
    .route('/users/:id')
        // accepting invitation   : public
        .put(userVerficationValidator,UserController.userAccecptInvitation)


Router
    .route('/user/:id')
        // delete user & update user  : privte AdminUser, and the owner MemberUser
        .delete(AllowIfLogin,UserController.deleteUser)
        .put(AllowIfLogin,updateUserDetails,UserController.updateUser) // user_type only the role


    //login
Router 
    .route('/login')
        .post(userLoginValidator,UserController.userLogin)
 //Token validation
Router 
    .route('/valid')
        .post(UserController.isTokenValid)
    
module.exports = Router;