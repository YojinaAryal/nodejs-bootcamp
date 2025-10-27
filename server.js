const http=require("http");
const fs=require("fs");

const myServer=http.createServer(( req,res)=>{
    const log=`${Date.now()}:${req.url} new req received \n`;
  fs.appendFile("log.txt",log,(err,data)=>
  {
 switch(req.url)
    {
        case '/':
            res.end("YOU ARE IN HOMEPAGE");
            break
        case '/about':
            res.end("HELLO CLIENT I AM YOJINA ");
            break
          default:  res.end("Heeello from server");
        }
    });
});
myServer.listen(8000,()=>console.log("server started"));
