const express = require("express");
const usersController = require("./users.controller.js");
const createTaskValidator = require("./validators/createUser.validator.js");
const { StatusCodes} =require("http-status-codes");
const { validationResult } = require("express-validator");

const usersRouter = express.Router();

/**
 * @swagger
 * 
 * /users/create:
 *  post:
 *    summary: Create a new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema: 
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201: 
 *        description: User created successfully
 *        content: 
 *          application/json:
 *            example: 
 *              status: success
 *              statusCode: 201
 *              message: Created 
 *              data: 
 *                _id: 69750127e46599e4b3d0ea55
 *                firstName: Pranel
 *                lastName: Agrawal
 *                email: pranel.ag@email.com
 */

usersRouter.post("/create",createTaskValidator, (req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()){
        return usersController.handleCreateUsers(req,res);
    }
    else{
        res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});

module.exports = usersRouter;