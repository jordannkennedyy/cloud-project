const express = require('express');

const app = express();
const ejsLayouts = require("express-ejs-layouts");
const port = process.env.PORT || 5000;

app.use(ejsLayouts);
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");


// MySQL Connection
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'NEW-LOAD-BALANCE-ad0db12a5863bb78.elb.us-east-1.amazonaws.com',
  port: 3306,
  user: 'Jordan',
  password: 'Password'
})

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
