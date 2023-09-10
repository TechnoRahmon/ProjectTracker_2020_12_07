const Router = require("express").Router();
const UserController = require("../controller/userController");
const {
  AllowIfLogin,
  grantAccess,
} = require("./../middleware/GlobalMiddleware");
const {
  addUserValidator,
  inviteUserValidator,
  userVerficationValidator,
  updateUserDetails,
  userLoginValidator,
} = require("../middleware/userMiddleware");
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user account
 *     tags: [Users]
 *     requestBody:
 *       description: User data to create an account
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User account created successfully
 *       400:
 *         description: Bad request, invalid user data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users (restricted for non-admin users)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of users (limited details for non-admin users)
 *       401:
 *         description: Unauthorized (user not logged in)
 *       403:
 *         description: Forbidden (user does not have permission to access)
 *       500:
 *         description: Internal server error
 */
Router.route("/users")
  // create account  : public
  .post(addUserValidator, UserController.addUserDetails)
  // get all users : private (all users only [ return less details if user not Admin ])
  .get(
    AllowIfLogin,
    grantAccess("readAny", "profile"),
    UserController.getAllUsers
  );
/**
 * @swagger
 * /api/v1/users/invite:
 *   post:
 *     summary: Invite a new user
 *     tags: [Users]
 *     description: Admin can invite a new user by sending an invitation email.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: User invitation data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User invited successfully
 *       400:
 *         description: Bad request, invalid user invitation data
 *       401:
 *         description: Unauthorized (user not logged in)
 *       403:
 *         description: Forbidden (user does not have permission to invite)
 *       500:
 *         description: Internal server error
 */
Router.route("/users/invite")
  // invite   : Admin
  .post(
    AllowIfLogin,
    grantAccess("createAny", "invite"),
    inviteUserValidator,
    UserController.inviteUser,
    UserController.sendInvitation
  );

/**
 * @swagger
 * /api/v1/{accountId}/users/{userId}:
 *   put:
 *     summary: Accept user invitation
 *     tags: [Users]
 *     description: Public endpoint to accept a user invitation by verifying the user's identity.
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         description: ID of the account to which the user belongs
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user accepting the invitation
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User verification data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User invitation accepted successfully
 *       400:
 *         description: Bad request, invalid user verification data
 *       404:
 *         description: Account or user not found
 *       500:
 *         description: Internal server error
 */
Router.route("/:accountId/users/:userId")
  // accepting invitation   : public
  .put(userVerficationValidator, UserController.userAccecptInvitation);
/**
 * @swagger
 * /api/v1/user/{userId}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     description: Privileged operation to delete a user profile.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized (user not logged in)
 *       403:
 *         description: Forbidden (user does not have permission to delete)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   put:
 *     summary: Update a user profile
 *     tags: [Users]
 *     description: Privileged operation to update a user's profile information.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: User profile data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Bad request, invalid user profile data
 *       401:
 *         description: Unauthorized (user not logged in)
 *       403:
 *         description: Forbidden (user does not have permission to update)
 *       500:
 *         description: Internal server error
 */
Router.route("/user/:userId")
  // delete user & update user  : privte AdminUser, and the owner MemberUser
  .delete(
    AllowIfLogin,
    grantAccess("deleteAny", "profile"),
    UserController.deleteUser
  )
  .put(
    AllowIfLogin,
    grantAccess("updateAny", "profile"),
    updateUserDetails,
    UserController.updateUser
  ); // user_type only the role

//login
Router.route("/login").post(userLoginValidator, UserController.userLogin);

//logout
Router.route("/logout").get(UserController.logout);

//Token validation
Router.route("/valid").get(UserController.isTokenValid);

module.exports = Router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         fullname:
 *           type: string
 *           description: Full name of the user.
 *         email:
 *           type: string
 *           description: Email address of the user.
 *         password:
 *           type: string
 *           description: Password of the user.
 *         image_path:
 *           type: string
 *           description: Path to the user's image.
 *         account_id:
 *           type: string
 *           description: ID of the associated account.
 *         user_type:
 *           type: string
 *           description: Type of user (e.g., ViwerUser, BasicUser, AdminUser).
 *           enum: [ViwerUser, BasicUser, AdminUser]
 *         verified:
 *           type: boolean
 *           description: Indicates whether the user is verified.
 *       required:
 *         - email
 *         - user_type
 */
