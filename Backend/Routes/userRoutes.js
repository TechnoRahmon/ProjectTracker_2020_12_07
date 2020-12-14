const Router = require('express').Router(); 
const UserController = require('../controller/userController')
const {AllowIfLogin, grantAccess,} = require('./../middleware/GlobalMiddleware')
const { addUserValidator , 
        inviteUserValidator,
        userVerficationValidator,
        updateUserDetails,
        userLoginValidator, } = require('../middleware/userMiddleware')

Router
    .route('/users')
        // create account  : public
        .post( addUserValidator ,UserController.addUserDetails)
        // get all users : private (all users only [ return less details if user not Admin ])
        .get(AllowIfLogin,grantAccess('readAny','profile'),UserController.getAllUsers )
        
Router
    .route('/users/invite')
        // invite   : Admin
        .post(AllowIfLogin,grantAccess('createAny','invite'),inviteUserValidator,UserController.inviteUser,UserController.sendInvitation)


Router
    .route('/:accountId/users/:userId')
        // accepting invitation   : public
        .put(userVerficationValidator,UserController.userAccecptInvitation)


Router
    .route('/user/:userId')
        // delete user & update user  : privte AdminUser, and the owner MemberUser
        .delete(AllowIfLogin,grantAccess('deleteAny','profile'),UserController.deleteUser)
        .put(AllowIfLogin,grantAccess('updateAny','profile'),updateUserDetails,UserController.updateUser) // user_type only the role

    //login
Router 
    .route('/login')
        .post(userLoginValidator,UserController.userLogin)
    
    //logout
Router 
    .route('/logout')
        .get(UserController.logout)


 //Token validation
Router 
    .route('/valid')
        .get(UserController.isTokenValid)
    
module.exports = Router;