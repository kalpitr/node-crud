  
const mysql = require("mysql");

var pool = mysql.createPool({
	multipleStatements: true,
	host: "localhost",
	user: "root",
	password: "",
	database: "crud",
});

pool.getConnection((err) => {
	if (err) {
		console.log("Error Connecting to DB.", err);
	} else {
		console.log("Successfully Connected to DB.");
	}
});

module.exports = pool;