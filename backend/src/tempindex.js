const express = require("express");
const app = express();
const port = 3001;

app.get("/users/:role/", (req,res)=>{
    console.log(req.params);
    console.log(req.query);
    res.send("Hello world");
})

app.get("/some.text", (req,res)=>{
    console.log(req.url);
    res.send("Hello world");
})
app.get("/posts?", (req,res)=>{   //s is optional
    console.log(req.url);
    res.send("Hello world");
})
app.get("/tag*?", (req,res)=>{   // * means you can add anything after that 
    console.log(req.url);
    res.send("Hello world");
})
app.get("/error/*", (req,res)=>{   // * grab the url with error in it and display the error
    console.log(req.url);
    res.send("Hello world");
})
app.get("/.*fly$/", (req,res)=>{   // it should end with fly but neve start with fly
    console.log(req.url);
    res.send("Hello world");
})


app.listen(port, ()=>{
    console.log(`App listening to port no: ${port}`);
});