require('dotenv').config()
const express = require('express')
const app = express()
var cors = require('cors')

const PORT = process.env.PORT


app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});


//REGULAR MIDDLEWARE
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000'}));
// app.use(express.urlencoded({extended:true}))


// IMPORT ROUTES
const loggerHome = require('./routes/loggerHome');


// ROUTER MIDDLEWARE pass to route
app.use('/loggerHome',loggerHome)






app.listen(process.env.PORT,()=>{
    console.log(`server  running at port ${process.env.PORT}`)
    
})