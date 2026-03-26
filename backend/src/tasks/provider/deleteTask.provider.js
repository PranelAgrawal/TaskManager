const Task = require("../task.schema.js");
const {matchedData} = require("express-validator");
const {StatusCodes} = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function deleteTaskProvider(req,res){
    const validatedData = matchedData(req);

    try{
        const deletedTask = await Task.deleteOne({ _id: req.body["_id"] });
        return res.status(StatusCodes.OK).json(deletedTask);
    }catch(error){
        errorLogger("Error deleting the data",req,error);
        return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
            reason: "Unable to process your request at the moment, pls try again later",
        });
    }
}

module.exports = deleteTaskProvider;