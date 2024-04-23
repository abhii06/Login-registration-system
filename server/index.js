require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const { default: mongoose } = require("mongoose");
const User =require('./models/user')



// middlewares
app.use(express.json());
app.use(cors());



mongoose.connect("mongodb://127.0.0.1:27017/employee");

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.get('/getUser',(req,res) =>{
User.find()
.then(users =>req.json(users))
.catch(err =>res.json(err))
})

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));