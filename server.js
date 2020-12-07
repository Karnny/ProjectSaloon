const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const multer = require("multer");


// ----- Mysql ------
const mysql = require('mysql');
const dbConfig = require('./config/dbConfig.js');
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

app.get("/appointbarber", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/barber_appointment.html"));
})

app.get('/customer_appointment', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/customer_appointment.html'));
});

app.get('/shop_list', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/list_shop.html'));
});


//  Other route

// ----- register api ------
app.post('/api/register', (req, res) => {
    let userCred = {
        fullName: req.body.fullName,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,

    };

    bcrypt.hash(userCred.password, 10, function (err, hash) {
        if (err) {
            console.log(err);
            res.status(500).send('Hashing error');
        } else {
            // check user type of registeration
            if (req.body.registerType == 'barber') {
                console.log("Barber");

                const sql = "INSERT INTO users (fullname, username, password, email, phone_number, role) VALUES (?,?,?,?,?,?)";

                database.query(sql, [userCred.fullName, userCred.username, hash, userCred.email, userCred.phone, 'barber'], function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).send("DB server error");
                    } else {
                        if (result.affectedRows != 1) {
                            res.status(500).send("Query DB error");
                        } else {
                            res.json({ user_id: result.insertId, forwardUrl: '/edit_shop' });
                        }
                    }
                });

            } else if (req.body.registerType == 'customer') {
                console.log("Customer");

                const sql = "INSERT INTO users (fullname, username, password, email, phone_number, role) VALUES (?,?,?,?,?,?)";

                database.query(sql, [userCred.fullName, userCred.username, hash, userCred.email, userCred.phone, 'customer'], function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).send("DB server error");
                    } else {
                        if (result.affectedRows != 1) {
                            res.status(500).send("Query DB error");
                        } else {
                            res.json({ user_id: result.insertId, forwardUrl: '/login' });
                        }
                    }
                });

            } else {
                console.log("Unknown register type");
                res.status(400).send("Unkown register type");
            }
        }
    });



});


// ----- login api -----
app.post("/api/login", (req, res) => {
    let { username, password } = req.body;
    console.log(`New user logged: ${username}, ${password}`);
    const sql = `SELECT user_id, username, password, role FROM users WHERE username=?`;
    database.query(sql, [username], function (err, result, fields) {

        if (err) {
            console.log(err);
            res.status(500).send("Database Server Error.");
        } else {

            bcrypt.compare(password, result[0].password, function (err, hashResult) {
                if (err) {
                    console.log("Compare has error");
                    res.status(500).send("Compare hash error");
                } else {
                    if (hashResult != true) {
                        res.status(400).send("Wrong Username or Password.");
                    } else {
                        if (result[0].role == "barber" || result[0].role == "Barber") {
                            console.log('Role: barber ID: ', result[0].user_id);
                            res.json({ user_id: result[0].user_id, forwardUrl: "/appointbarber" });
                        } else {
                            res.json({ user_id: result[0].user_id, forwardUrl: "/customer_appointment" });
                        }

                    }
                }

            });



        }
    });
});

// -------- save edit shop ------

app.post('/api/edit_shop', (req, res) => {


    let shop = JSON.parse(req.headers.shop);
    console.log(shop);
    let imageName = Date.now() + "_" + shop.user_id + '.jpg';

    const options = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "public/images/");
        },
        filename: function (req, file, cb) {
            cb(null, imageName);
        }
    });

    const upload = multer({ storage: options }).single("fileUpload");

    try {
        const sql = "INSERT INTO stores (store_name, store_details, store_owner, store_location_lat, store_location_long, store_banner_image) VALUES (?,?,?,?,?,?)";
        database.query(sql, [shop.shop_name, shop.shop_details, shop.user_id, shop.shop_lat, shop.shop_long, imageName], function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send("DB error")
            } else {
                console.log(result)
                // start upload image
                upload(req, res, function (err) {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Upload error");
                    } else {
                        if (result.affectedRows == 1) {

                            insertShopServices(result.insertId, shop.shop_services);
                            res.send("Upload done");
                        } else {
                            res.status(500).send("Upload error");
                        }

                    }
                });

            }
        });

    } catch {
        console.log("[Critical]: Error querying database!")
    }

    function insertShopServices(store_id, services) {
        const sql = "INSERT INTO services (service_name, service_time, service_price, store_id) VALUES (?,?,?,?)";

        for (i in services) {
            database.query(sql, [services[i].name, services[i].time, services[i].price, store_id], function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send("Query service error");
                } else {
                    if (result.affectedRows == 1) {
                        return;
                    } else {
                        res.status(500).send("Add service error");
                    }
                }

            });
        }

    }

});

// =========== Major services for getting information from Database ============

// --- services for checking user role ----
app.get('/api/check_user/:user_id', (req, res) => {
    let userToCheck = req.params.user_id;

    const sql = "SELECT role FROM users u WHERE u.user_id = ?";

    database.query(sql, [userToCheck], fun);
    console.log("User to check:", userToCheck, " has role ", "")
});

app.get('/api/get_shop_list', (req, res) => {

    const sql = "SELECT store_id, store_name, store_details, store_banner_image AS 'store_image_url' FROM stores";

    database.query(sql, function (err, result) {
        if (err) {
            res.status(500).send("DB server error");
        } else {
            res.json(result);
        }
    });
});

app.get('/api/get_shop_details_by_id/:shop_id', (req, res) => {
    let idShopToFind = req.params.shop_id;

    const sql = `SELECT st.store_id, st.store_name, st.store_details, st.store_location_lat, st.store_location_long, sv.service_id, sv.service_name, sv.service_time, sv.service_price
    FROM stores st JOIN services sv
    ON sv.store_id = st.store_id
    WHERE st.store_id = ?`;

    database.query(sql, [idShopToFind], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("DB server error");
        } else {
            res.json(result);
        }
    });
});

app.post('/api/save_booking', (req, res) => {
    let booking = req.body.booking;
    console.log(booking);

    const sql = "INSERT INTO appointments (appointment_details, appointment_date, appointment_cardnumber, booking_totalprice, booker_id, store_id) VALUES (?,?,?,?,?,?)";
    database.query(sql, [booking.booking_details, booking.appointment_date, booking.card_number, booking.booking_price, booking.booker_id, booking.shop_id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("DB server error");
        } else {
            if (result.affectedRows != 1) {
                res.status(500).send("Booking error");
            } else {
                insertAppointmentServices(result.insertId, booking.selected_services);
                res.send('Booking complete');
            }
        }
    });

    function insertAppointmentServices(app_id, services) {
        console.log("Start INSERT AS: ", app_id, services);
        const sql = "INSERT INTO appointment_has_services (appointment_id, service_id) VALUES (?,?)";
        for (i in services) {
            database.query(sql, [app_id, parseInt(services[i])], function (err, result) {
                console.log("Inserting..");
                if (err) {
                    console.log(err);
                    res.status(500).send("DB server error");
                } else {
                    if (result.affectedRows == 1) {
                        return;
                    } else {
                        res.status(500).send('Booking error');
                    }
                }
            });
        }


    }

});

app.get('/api/get_appointment_list_by_id/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    const sql = `SELECT ap.appointment_id, ap.appointment_details, ap.appointment_date, ap.booking_totalprice, ap.store_id, st.store_name, st.store_location_lat, st.store_location_long
    FROM appointments ap JOIN stores st ON ap.store_id = st.store_id
    WHERE ap.booker_id = ?`;

    database.query(sql, [user_id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send("DB server error");
        } else {
            res.json(result);
        }
    });
});

app.get('/api/get_barber_appointment_by_id/:barber_id', (req, res) => {
    const barber_id = req.params.barber_id;

    const sql = `SELECT ap.appointment_id AS 'id', ap.appointment_date AS 'start', ap.appointment_date AS 'stop', u.fullname as 'title' 
    FROM stores st JOIN appointments ap ON st.store_id = ap.store_id JOIN users u ON ap.booker_id = u.user_id
    WHERE st.store_owner = ?`;

    database.query(sql, [barber_id], function (err, result) { 
        if (err) {
            console.log(err);
            res.status(500).send("DB server error");
        } else {
            res.json(result);
        }
     });


});



const PORT = 3000;
app.listen(PORT, (req, res) => {
    console.log("Server is running on port " + PORT);
});

