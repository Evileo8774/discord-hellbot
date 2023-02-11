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

    //Database management requests
    /*connection.query("", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });*/
});

/*
DATABASE ORGANISATION


INFOS:
DATE format : YYYY-MM-DD


Requests history

*/