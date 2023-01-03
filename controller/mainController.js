const { query } = require("express");

const { database } = require("../database");


const findall = async (req, res) => {
    try {
     
      const sql = await database.query(`SELECT 
      manager_id,manager_name,manager_age,
      count (manager_employee.emp_id) as mcount,  
      count (employee.employee_id) as ccount
   FROM Manager 
   left  JOIN manager_employee
   on manager_employee.m_id = manager.manager_id 
   left JOIN employee
   on employee.employee_id = manager_employee.emp_id 
             and employee.employee_age>='${req.params.employee_age}'
   GROUP BY manager_id  
   Having   count (employee.employee_id)=0
   ORDER BY manager_id;`);

      console.log("rows in db", sql.rows);
      if (sql.rows < "1") {
        res.status(400).json({ message: "no rows exists in db" });
      } else {
        console.log("fetched all records from db", sql);
        res.status(200).json({
          message: "fetched all records from db",
          res: sql.rows,
        });
      }
    } catch (error) {
      console.log("unable fetch records from db");
      console.log(error.message);
      res.status(400).json({
        message: "unable fetch records from db",
      });
    }
  };
  module.exports ={findall}