const {body} = require("express-validator");

const createTaskValidator = [
    body("title", "Title should not be empty").notEmpty(),
    body("title", "Title should be a string").isString(),
    body("title").isLength({max:100}),
    body("title").trim(),

    body("dueDate", "DueDate needs to be a valid ISO8601 string").notEmpty().isISO8601(),

    body("description", "Description should not be empty and needs to be a string").notEmpty().isString().trim(),
    body("description").isLength({max:500}),

    body("priority").isIn(["low", "normal", "high"]),
    body("status").isIn(["todo", "inProgress", "completed"]),
]

module.exports = createTaskValidator;