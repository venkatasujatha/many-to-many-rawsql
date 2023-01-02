const {Client} =require('pg');
const database =new Client({
    host:"localhost",
    port:5432,
    userName:'postgres',
    password:'postgres',
    dialect:'postgres',
    database:'postgres'
})

module.exports={database}