const {database}=require('./database');
const express =require('express');
const app =express();
const cors =require('cors');
const bodyParser =require('body-parser');
require('dotenv').config()
const router =require('./router/router')
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/',router)

async function run()
{
    database.connect();
    
    console.log('database is initialized')
    app.listen(process.env.port,()=>{
        console.log(`server listening on port ${process.env.port}`)
    })
}
run()