const express = require("express");
const fs = require("fs");
const app = express();

const users = require("./MOCK_DATA.json")
const port = 3000;
//midlleware-plugin
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}: ${req.method} ${req.path} from ${req.ip}`,
    (err) => {
      if (err) {
        console.error("Error writing to log file:", err);
      }
      next(); 
    }
  );
});


//routes
app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);

})
//rest apis

app.get('/api/users', (req, res) => {
    res.json(users);
})

app.route('/api/users/:id').get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
}).patch((req, res) => {
    //todo : to edit id
    return res.json({ status: "pendingg" });
}).delete((req, res) => {
    //todo : to delete id
    return res.json({ status: "pendingg" });
})



app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({...body,id: users.length +1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({ status: "pendingg" });
    } )
    
})


app.listen(port, () => {
    console.log(`SERVER STARTED AT PORT: ${port}`);
})