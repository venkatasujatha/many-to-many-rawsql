const router=require('express').Router()
const mainController =require('../controller/mainController');


router.get('/getall/:employee_age',mainController.findall);

module.exports=router