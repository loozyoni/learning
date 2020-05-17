const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

const app = express()

app.use(bodyParser.json())
const postsRouter = require("./routes/posts")

app.use('/posts', postsRouter)

mongoose.connect(process.env.DB_CONNECTION,
    {useUnifiedTopology: true, useNewUrlParser: true},
    () => console.log("connected to mogodb"))

app.listen(3000)