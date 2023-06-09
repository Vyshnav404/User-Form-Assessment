const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 8000;
app.listen(port,()=>{
    console.log(`Listening on port  no ${port}`);
})