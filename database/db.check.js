const mysql = require("mysql");

const connection = mysql.createConnection({
    host : "161.97.78.70",
    port : "3306",
    user : "u10589_wjBzts8zih",
    password : "dtWcca+k1HH1E+2dLiCatX7K",
    database : "s10589_hellBotDatabase",
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
test(testID, username)
logs(logID, username, logType, logDate, reason)


INFOS:
DATE format : YYYY-MM-DD


Requests history

CREATE TABLE logs (logID INT NOT NULL AUTO_INCREMENT, guild VARCHAR(50) NOT NULL, username VARCHAR(50) NOT NULL, logType VARCHAR(50) NOT NULL, reason VARCHAR(250) NOT NULL, logDate DATE NOT NULL, PRIMARY KEY(logID))
CREATE EVENT rm_sanction ON SCHEDULE EVERY 1 DAY DO DELETE FROM logs WHERE YEAR(CURDATE()) - 1 = YEAR(logDate) AND MONTH(CURDATE()) = MONTH(logDate) AND DAY(CURDATE()) = DAY(logDate)
*/