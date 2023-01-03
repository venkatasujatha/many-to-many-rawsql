const router=require('express').Router()
const mainController =require('../controller/mainController');

router.post('/insert',mainController.insert);
router.get('/getall/:employee_age',mainController.findall);
router.get('/getall1/:num',mainController.findall1);

module.exports=router