const mysql = require('mysql');

var con = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"crud_node"
})
//connect to database
con.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
module.exports = con;