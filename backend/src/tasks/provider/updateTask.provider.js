const Task = require("../task.schema.js");
const {matchedData} = require("express-validator");
const {StatusCodes} = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function updateTaskProvider(req,res){
    const validatedData = matchedData(req);

    try{
        //fetch the id
        const task = await Task.findById(req.body["_id"]);
        // update the changes
        task.title = validatedData.title || task.title;
        task.description = validatedData.description || task.description;
        task.status = validatedData.status || task.status;
        task.priority = validatedData.priority || task.priority;
        task.dueDate = validatedData.dueDate || task.dueDate;
        // save
        await task.save();

        return res.status(StatusCodes.OK).json(task);
    } catch(error){
        errorLogger("Error while updating task", req, error);
        res.status(StatusCodes.GATEWAY_TIMEOUT).json({
            reason: "Unable to process your request at the moment, pls try again later",
        });
    }
}

module.exports = updateTaskProvider;