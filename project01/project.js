const express =require ("express");
const app=express();
const users=require("./MOCK_DATA.json")
const port=3000;

//routes
app.get('/users',(req,res)=>{
    const html=`
    <ul>
    ${users.map(user=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);

})
//rest apis

app.get('/api/users',(req,res)=>
{
    res.json(users);
})

//app.route('/api/users/:id').get((req,res)=>{
  //  const id=Number(req.params.id);
    //const user =users.find((user)=>user.id===id);
    //return res.json(user);
//}).patch((req,res)=>{
    //todo : to edit id
    //return res.jso({status:"pendingg"});
//}).delete((req,res)=>{
    //todo : to delete id
   // return res.jso({status:"pendingg"});
//})



app.post('/api/users',(req,res)=>{
    //todo : to create a new user
    return res.jso({status:"pendingg"});
})


app.listen(port,()=>
{
    console.log(`SERVER STARTED AT PORT: ${port}`);
})