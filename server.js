const express = require('express');
const app = express();
const path = require('path');

// ----- Mysql ------
const mysql = require('mysql');
const config = require('./config/dbConfig.js');
database = mysql.createConnection(config);

// ---- Middleware -----
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Page route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/login.html"));
});

app.get("/register_user", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/register_user.html"));
});

app.get("/register_barber", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/register_barber.html"));
});

app.get("/user", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/user.html"));
});

app.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/test"));
});


//  Other route

app.post("/api/login", (req, res) => {
    let { username, password } = req.body;
    console.log(`New user logged: ${username}, ${password}`);
    const sql = `SELECT username, role FROM user WHERE username=? AND password=?`;
    database.query(sql, [username, password], function (err, result, fields) {

        if (err) {
            console.log(err);
            res.status(500).send("Database Server Error.");
        } else {
            if (result.length != 1) {
                res.status(400).send("Wrong Username or Password.");
            } else {
                if (result[0].role == 1) {
                    res.send("/admin");
                } else {
                    res.send("/user");
                }
                
            }
        }
    });
});


const PORT = 3000;
app.listen(PORT, (req, res) => {
    console.log("Server is running on port " + PORT);
});

