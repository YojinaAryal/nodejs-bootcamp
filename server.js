const express = require("express");
const app=express();
port=8000;
app.get("/",(req,res)=>{
    return res.send("HELLO FROM HOMEPAGE.")
});
app.get('/about',(req,res)=>{
    return res.send("HELLO FROM ABOUT PAGE.....  "+"HEY "+req.query.name + " I KNOW YOU ARE "+req.query.age);
});


app.listen(port,()=>console.log("server started"));
