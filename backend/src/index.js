const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const configureApp = require("./settings/config.js");

process.env.NODE_ENV = process.env.NODE_ENV||"development";
const envFile=`.env.${process.env.NODE_ENV}`;
dotenv.config({path:envFile});

const app = express();
const port = parseInt(process.env.PORT);

app.use(express.json());

configureApp(app);

// const middleware = function(req,res,next){
//     req.info = {appname: "Tasks Manager", author: "Pranel"};
//     next();
// }
// app.use(middleware);

// const corsOption = {
//     origin: ["example.com", "example2.com"],
// };
// app.use(cors(corsOption));


async function bootstrap(){ //this function starts our application 
    try{
        await mongoose.connect(
            process.env.DATABASE_URL, 
            {dbName: process.env.DATABASE_NAME}
        );
        console.log("COnnected to db");
        app.listen(port,()=>{
            console.log(`App listening to port no: ${port}`);
        })
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

bootstrap();