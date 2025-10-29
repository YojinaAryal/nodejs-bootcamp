const express = require("express");
const fs = require("fs");
const app = express();
const mongoose = require("mongoose");

const users = require("./MOCK_DATA.json");
const { default: mongoose } = require("mongoose");
const { stringify } = require("querystring");
const { type } = require("os");
const port = 3000;

//connection
mangoose.connect

//schema
const userSchema = new mangoose.Schema({
    first_name:{
        type: String,
        required:true,
    },
    last_name:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    job_title:{
        type: String,
    },
    gender:
    {
        type: String,
    }
})
const User=mangoose.model("user",userSchema);
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
//always add X to custom headers

app.get('/api/users/', (req, res) => {
    res.setHeader("X-myName", "Yojina aryal");

    return res.json(user);
})

app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        if (!user) {
            return res.status(404).json({ error: "YOUR USER ID IS BEYOND THE DATA" })
        }
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
    if (!body || !body.first_name || !body.email || !body.job_title) {
        return res.status(400).json({ msg: "ALL FIELDS ARE REQUIRED" });
    }
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "pendingg" });
    })

})



app.listen(port, () => {
    console.log(`SERVER STARTED AT PORT: ${port}`);
})