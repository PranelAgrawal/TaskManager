const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");
const responseFormatter = require("../middleware/responseFormatter.js");
const tasksRouter = require("../tasks/tasks.router.js");
const authRouter = require("../auth/auth.router.js");
const usersRouter = require("../users/users.router.js");
const expressWinstonLogger = require("../middleware/expressWinston.middleware.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger.config.js");

function configureApp(app){
    app.use(cors()); // always use some origin never pass it like this irl

    let accessLogStream = fs.createWriteStream(path.join(__dirname,"..","access.log"), 
    {
        flags:"a", // append in the file
    });

    app.use(morgan("combined",{ stream: accessLogStream}));
    app.use(responseFormatter);
    app.use(expressWinstonLogger);

    app.use("/", tasksRouter);
    app.use("/auth", authRouter);
    app.use("/users", usersRouter);

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

    //bypassed all the middleware, hence the link/api doesnt exist
    app.use((req,res)=>{
        res.status(StatusCodes.NOT_FOUND).json(null);
    })
}

module.exports=configureApp;