const mysql = require("mysql");

const connection = mysql.createConnection({
    host : "192.168.1.22",
    port : "3306",
    user : "hellbot",
    password : "hellbot",
    database : "discord-hellbot",
    charset : "utf8"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("-- Database connected --");

    //keep connection on
    setInterval(function(){
        connection.query("SELECT 1");
    }, 10000);
    
});