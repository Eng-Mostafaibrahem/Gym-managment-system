import mysql2 from "mysql2";

const db_connection =  mysql2.createConnection({
  host: "localhost",
  user: "root",
  database: "gym",
});

db_connection.connect((err) => {
  if (err) {
    console.log("cannot connection to db",err.message);
  } else console.log("connect successfully");
});


export default db_connection;