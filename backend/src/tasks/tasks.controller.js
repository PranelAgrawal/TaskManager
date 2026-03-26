const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const createTaskProvider = require("./provider/createTask.provider.js");
const getTasksProvider = require("./provider/getTasks.provider.js");
const updateTaskProvider = require("./provider/updateTask.provider.js");
const deleteTaskProvider = require("./provider/deleteTask.provider.js");

async function handleGetTasks(req,res){
    return await getTasksProvider(req,res);
} 

async function handlePostTasks(req,res){
    return await createTaskProvider(req,res);
} 

async function handlePatchTasks(req,res){
    return await updateTaskProvider(req,res);
} 

async function handleDeleteTasks(req,res){
    return await deleteTaskProvider(req,res);
} 

module.exports = {
    handleGetTasks, handleDeleteTasks,handlePatchTasks,handlePostTasks
};