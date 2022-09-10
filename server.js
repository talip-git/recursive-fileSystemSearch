const express = require("express")
const search = require("./utils/search");
const fs = require("fs")
const path = require("path")
const searchRouter = require('./routes/searchRoute')
const app = express()

app.use(express.json())
app.use(express.static("public"))
app.use("/api/search",searchRouter)

app.get("/",(req,res)=>{
    return res.status(200).sendFile(path.join(__dirname,"public/index.html"));
})


app.listen(5000,()=>{
    console.log("Server is listening on port 5000...")
})