const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required entry to fill"],
        trim: true,
        maxLength: [25, "Max characters are 25"],
    },
    lastName:{
        type: String,
        required: false,
        trim: true,
        maxLength: [25, "Max characters are 25"],
    },
    email: {
        type: String,
        required: [true, "Email is required entry to fill"],
        trim: true,
        unique: true,
        lowercase:true,
        validate: {
            validator: function(email){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: ()=> `Please enter valid email address`,
        },
    },
    password: {
        type: String,
        required: [true, "Password is required entry to fill"],
    },
})

const User = model("User", userSchema);

module.exports = User;

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    required: 
 *      - firstName
 *      - email
 *      - password
 *    properties: 
 *      firstName:
 *        type: String
 *        description: This is the first name of the user
 *        maxLength: 100
 *      lastName:
 *        type: String
 *        description: This is the last name of the user
 *        maxLength: 100
 *      email:
 *        type: String
 *        description: A valid email address
 *      password:
 *        type: String
 *        description: Must contain atleast 8 characters and also a number, a capital letter and a special letter
 *    example:
 *      firstName: Pranel
 *      lastName: Agrawal
 *      email: pranel.ag@email.com
 *      password: Pranel@2
 *  */