const {body} = require("express-validator");

const deleteTaskValidator =[
    body("_id","Valid Document id is required").notEmpty().isMongoId(),
]

module.exports = deleteTaskValidator;