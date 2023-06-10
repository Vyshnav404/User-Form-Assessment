const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./config/db')
const userRouter = require('./routes/userRouter')
const port = 8080;


db(()=>{
    try{
        console.log("Database successfully Connected");
    }catch (error) {
        console.log("Database Not Connected :",error);
    }
});

app.use(cors())
app.use(bodyParser.json())
app.use("/api",userRouter)

app.listen(port,()=>{
    console.log(`Listening on port  no ${port}`);
})