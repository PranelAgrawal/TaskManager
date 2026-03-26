const {body} = require("express-validator");

const createUserValidator = [
    body("firstName","First name is required and a string").isString().notEmpty().trim().isLength({max:100}),
    body("lastName","Last name is a string").isString().optional().trim().isLength({max:100}),
    body("email","Email is required and a string").isEmail().notEmpty().trim().isLength({max:100}),
    body("password","Password must contain atleast one number, one uppercase letter, one lowercase letter and one special character")
        .notEmpty()
        .isLength({min:8})
        .matches(/(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
]

module.exports = createUserValidator;