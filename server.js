const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const multer = require("multer");


// ----- Mysql ------
const mysql = require('mysql');
const dbConfig = require('./config/dbConfig.js');
const e = require('express');
const database = mysql.createConnection(dbConfig);

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

app.get("/edit_shop", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/editshop.html"));
});

app.get("/appointbarber", (req, res)=> {
    res.sendFile(path.join(__dirname, "/views/appointment.html"));
})

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

// -------- save edit shop ------

app.post('/api/edit_shop', (req, res) => {
    
    
    let shop = JSON.parse(req.headers.shop);
    console.log(shop);
    let imageName = Date.now() + "_" + shop.user_id + '.jpg';
    const options = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, "public/images/");
        },
        filename: function(req, file, cb){
            cb(null, imageName);
        }
    });
    
    const upload = multer({storage: options}).single("fileUpload");

    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            res.status(500).send("Upload error");
        } else {

            const sql = "INSERT INTO stores (store_name, store_details, store_owner, store_location_lat, store_location_long, store_banner_image) VALUES (?,?,?,?,?,?)";
            database.query(sql, [shop.shop_name, shop.shop_details, shop.user_id, shop.shop_lat, shop.shop_long, imageName], function(err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send("DB error")
                } else {
                    res.send("Upload done");
                }
            });

            
        }
    });
});

async function getShopDetails() {

}


const PORT = 3000;
app.listen(PORT, (req, res) => {
    console.log("Server is running on port " + PORT);
});

