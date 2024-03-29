const express = require('express');
const { exec } = require('node:child_process');

const app = express();
const ejsLayouts = require("express-ejs-layouts");
const port = process.env.PORT || 5000;

app.use(ejsLayouts);
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");


// MySQL Connection
const mysql = require('mysql');
const { stdout, stderr } = require('node:process');
const connection = mysql.createConnection({
  host: 'NEW-LOAD-BALANCE-ad0db12a5863bb78.elb.us-east-1.amazonaws.com',
  port: 3306,
  user: 'Jordan',
  password: 'Password'
})

// initial connection
connection.connect(function(err){
  if (err) throw err;
  console.log("Connected")
});


// Server Setup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// main
app.get('', (req, res) => {
    res.render('index', {title: 'Home Page'})
})

// test query
// see public script
app.get('/get_data', (req, res) => {
    connection.query('SHOW DATABASES', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// get host name
app.get('/EC2Hostname', (req, res) => {
  exec('echo $(hostname)', (error, stdout, stderr) => {
    if (error) return error
    res.send(stdout)
  });
});

// get host name
app.get('/EC2ip', (req, res) => {
  exec("echo $(hostname -I | awk '{print $1}')", (error, stdout, stderr) => {
    if (error) return error
    res.send(stdout)
  });
});


// start app
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
