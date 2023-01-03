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
     await database.query(
        `CREATE TABLE if not exists Employee(
            employee_id serial primary key,
            employee_name VARCHAR NOT NULL,
            employee_age INT NOT NULL
            );
            
            CREATE TABLE  if not exists Manager(
                manager_id serial primary key,
                manager_name VARCHAR NOT NULL,
                manager_age INT NOT NULL
                );

                CREATE TABLE if not exists manager_employee (
                    m_id    int REFERENCES Manager (manager_id) ON UPDATE CASCADE ON DELETE CASCADE
                  , emp_id int REFERENCES Employee (employee_id) ON UPDATE CASCADE
                  , CONSTRAINT manager_employee_pkey PRIMARY KEY (m_id, emp_id)
                  );`
        
      );
      console.log("Employee TABLE CREATED");
      console.log("manager TABLE CREATED");
      console.log("manager_employee TABLE CREATED");
    console.log('database is initialized')
    app.listen(process.env.port,()=>{
        console.log(`server listening on port ${process.env.port}`)
    })
}
run()