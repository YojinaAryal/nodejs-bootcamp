const fs=require("fs");
const os= require("os");
console.log(os.cpus().length)
fs.writeFileSync("./test.txt","hey there");

fs.readFile("./contact.txt","utf-8",(err,result)=>
{
    if (err)
    {
        console.log("error",err);
    }
    else{
        console.log(result);
    }
});

