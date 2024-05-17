const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const app = express();
app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["POST", "GET"],
    credentials:true
}));
app.use(cookieParser());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Qwerty123@#$",
  database: "signup",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to the database.");

  // bcrypt.hash(password.toString(), saltRounds, (err, hash) => {
  //     if (err) {
  //         return res.status(500).json({ Error: "Error hashing password" });
  //     }

  // const values = [];
  //   db.query(sql, (err, data) => {
  //     if (err) throw err;
  //     console.log("1 record inserted");
  // return res.json({ Status: "Success" });
  //   });
});
// });

const verifyUser = (req, res, next) =>{
    const token = req.cookies.token;
    if(!token){
        return res.json({ Error: "you are not authenticated!" });
    }else{
        jwt.verify(token, "jwt-secret-key", (err, decoded)=>{
            if(err){
                return res.json({ Error: "Token is not correct!" });
            }else{
                req.name = decoded.name;
                next();
            }
        })
    }
}

app.get('/', verifyUser, (req, res)=>{
return res.json({Status:"Success", name:req.name});
})

app.post("/signup", (req, res) => {
  console.log("Received signup request:", req.body);
  const { name, email, password } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ Error: "All fields are required" });
  }

  bcrypt.hash(password.toString(), saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({ Error: "Error hashing password" });
    }

    // Insert the data into the database using parameterized query
    const sql = "INSERT INTO data (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hash], (err, result) => {
      if (err) {
        console.error("Error inserting record:", err);
        return res.status(500).json({ Error: "Database error" });
      }
      console.log("1 record inserted");
      return res.json({ Status: "Success" });
    });
  });
});

app.post('/login', (req, res)=>{
    console.log("Please Verify Yourself...");
    const { email, password } = req.body;
    const sql = "SELECT * FROM data WHERE email = ?";
    db.query(sql, [email], (err, dt)=>{
        if (err) {
            console.error("Error inserting record:", err);
            return res.status(500).json({ Error: "Login error in server" });
          }
          if(dt.length > 0){
            bcrypt.compare(password.toString(), dt[0].password, (err,response)=>{
                if(err){
                    return res.status(500).json({ Error: "Password error" });
                }
                if(response){
                    const name = dt[0].name;
                    const token = jwt.sign({name}, "jwt-secret-key", {expiresIn:'1d'});
                    res.cookie('token', token);
                    return res.json({ Status: "Success" });
                }else{
                    return res.json({ Error: "Password is INCORRECT!" });
                }
            })
          }else{
            return res.status(500).json({ Error: "No Email in server" });
          }
    })
})

app.get('/logout', (req, res)=>{
    res.clearCookie('token');
    return res.json({Status: "Success"});
});

app.listen(8282, () => {
  console.log("Listening...");
});
