const { query } = require("express");

const { database } = require("../database");

const insert = async (req, res) => {
    try {
        emp_id = req.body.emp_id;
        employee_name = req.body.employee_name;
        employee_age =req.body.employee_age;
        m_id =req.body.m_id;
        manager_name =req.body.manager_name;
        manager_age =req.body.manager_age;
        if(employee_name &&employee_age && manager_name && manager_age )
        {
            const sql = await database.query(
                `INSERT INTO Employee(employee_name,employee_age) VALUES ('${employee_name}',${employee_age});
                  INSERT INTO Manager(manager_name,manager_age) VALUES ('${manager_name}',${manager_age});`
              );
              console.log('inserted data into db',sql.rowCount)

               res.status(200).json({
          message: "inserted data into db",
          res: sql.rowCount
        });
        }
        else

        {
            const sql =await database.query(
                `INSERT INTO manager_employee(m_id,emp_id) VALUES (${m_id},${emp_id})`);
                console.log('inserted data into db',sql.rowCount)
                res.status(200).json({
                    message: "inserted data into db",
                    res: sql.rowCount
        })
    }
     
    }
    catch(error)
    {
        console.log(error);
    res.status(400).json({
      message: "unable to insert record into db",
    });

    }
}


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
  const findall1 = async (req, res) => {
    try {
     
      const sql = await database.query(`SELECT Employee
      FROM Employee 
         INNER JOIN manager_employee
           ON manager_employee.emp_id =employee.employee_id
            GROUP BY employee_id
              HAVING COUNT(*) <= ${req.params.num}`);

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
module.exports ={insert,findall,findall1}