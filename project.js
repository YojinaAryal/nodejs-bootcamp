const express = require("express");
const fs = require("fs");
const app = express();

const users = require("./MOCK_DATA.json");
const { default: mongoose } = require("mongoose");
const port = 3000;
//connection 
mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
.then(()=>console.log("Mongo db connected"))
.catch(err=>console.log("Mongo error",err));
//schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastname:{
        type:String,

    },
    email: {
        type : String,
        required: true,
        unique: true,
    },
    jobtitle:
    {
        type : String,
    },
    gender:
    {
        type : String,
    }
});
const User= mongoose.model("user",userSchema)
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



app.post('/api/users', async (req, res) => {
    const body = req.body;
    if (!body || !body.first_name ||body.last_name || !body.email || !body.job_title) {
        return res.status(400).json({ msg: "ALL FIELDS ARE REQUIRED" });
    }
    const result = await User.create({
        firstName: body.first_name,
        lastname: body.last_name,
        email: body.email,
        gender: body.gender,
        jobtitle: body.job_title,
     });
     console.log("result : ",result);
     return res.status(201).json({msg: "success"});
    
});



app.listen(port, () => {
    console.log(`SERVER STARTED AT PORT: ${port}`);
})