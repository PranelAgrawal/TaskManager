const { Schema,model } = require("mongoose");

const taskSchema = new Schema({
    title:{
        type: String,
        required: [true, "This is a required criteria"],
        maxLength: [100, "Title cannot be more than 100 characters"],
        trim: true,
    },
    description:{
        type: String,
        required: [true, "This is a required criteria"],
        maxLength: [500, "Title cannot be more than 500 characters"],
        trim: true,
    },
    status: {
        type: String,
        required: [true, "THis is a required criteria"],
        enum: ["todo", "inProgress", "completed"],
        default: "todo",
    },
    priority: {
        type: String,
        required: [true, "This is a required criteria"],
        enum: ["low", "normal", "high"],
        default: "normal",
    },
    dueDate: {
        type: Date,
        required: [true, "This is a required criteria"],
    },
    user: {type:Schema.Types.ObjectId, ref: "User", required: true},
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    // done by timestamps located in the 2nd arg
},
{
    timestamps: true, versionKey: false
});

const Task = model("Task",taskSchema);
module.exports=Task;

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *   Task:
 *    type: object
 *    required: 
 *      - title
 *      - description
 *      - status
 *      - priority
 *      - dueDate
 *    properties: 
 *      title:
 *        type: String
 *        description: This is the title of the task
 *        maxLength: 100
 *      description:
 *        type: String
 *        description: This is the description of the task
 *        maxLength: 500
 *      status:
 *        type: String
 *        description: This is the statu of the task
 *        enum: ["todo", "inProgress", "Completed"]
 *      priority:
 *        type: String
 *        description: This is the priority of the task
 *        enum: ["low", "normal", "high"]
 *      dueDate:
 *        type: string
 *        format: ISO8601 Date String
 *        description: The due date for the task
 *    example:
 *      title: Create a new task
 *      description: Fullstack course
 *      status: todo
 *      priority: high
 *      dueDate: 2025-01-01T12:00:00Z
 *  */

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *   TaskUpdate:
 *    type: object
 *    required: 
 *      - _id
 *    properties: 
 *      _id:
 *        type: String
 *        description: MongoDb Object Id of the task
 *        format: ObjectId
 *      title:
 *        type: String
 *        description: This is the title of the task
 *        maxLength: 100
 *      description:
 *        type: String
 *        description: This is the description of the task
 *        maxLength: 500
 *      status:
 *        type: String
 *        description: This is the statu of the task
 *        enum: ["todo", "inProgress", "Completed"]
 *      priority:
 *        type: String
 *        description: This is the priority of the task
 *        enum: ["low", "normal", "high"]
 *      dueDate:
 *        type: string
 *        format: ISO8601 Date String
 *        description: The due date for the task
 *    example:
 *      _id: 6974fc48ed55d1695fc6bf5c
 *      title: Create a new task
 *      description: Fullstack course
 *      status: todo
 *      priority: high
 *      dueDate: 2025-01-01T12:00:00Z
 *  */

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *   TaskDelete:
 *    type: object
 *    required: 
 *      - _id
 *    properties: 
 *      _id:
 *        type: String
 *        description: MongoDb Object Id of the task
 *        format: ObjectId
 *    example:
 *      _id: 6974fc48ed55d1695fc6bf5c
 *  */