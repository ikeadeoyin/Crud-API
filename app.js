require("dotenv").config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const todoRouter = require("./routes/todoRoutes")
const port = 3000;

// connect the app to the database
const dbUrl = process.env.DATABASE_URL;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("connected to db"))
    .catch((err) => console.log(err))

app.use(express.json());

app.use(todoRouter)

app.listen(port, ()=>{
    console.log("May Node be with you")
})