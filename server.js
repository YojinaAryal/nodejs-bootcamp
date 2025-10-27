const http=require("http");
const fs=require("fs");
const url = require("url");

const myServer=http.createServer(( req,res)=>{
    if (req.url=="/favicon.ico") return res.end();
    const log=`:${req.url} new req received \n`;
    const myUrl=url.parse(req.url,true);
    console.log(myUrl);
  fs.appendFile("log.txt",log,(err,data)=>
  {
 switch(myUrl.pathname)
    {
        case '/':
            res.end("YOU ARE IN HOMEPAGE");
            break
        case '/about':
            const username= myUrl.query.myname;

            res.end(`HI , ${username}`);
            break
          default:  res.end("Heeello from server");
        }
    });
});
myServer.listen(8000,()=>console.log("server started"));
