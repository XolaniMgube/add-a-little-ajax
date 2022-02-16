// requiring frameworks to use
const express = require('express');
const bodyParser = require('body-parser');
const {Client} = require('pg')

require('dotenv').config({path: '../.env'})

// postgres class that will start the connection
const client = new Client({
  user: process.env.PGUSER || 'user',
  password: process.env.PGPASSWORD || 'pass',
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || '5432',
  database: process.env.PGDATABASE || 'db'
})

// importing database queries
const Visitors = require('./queries')

let app = express(); // starting the program
let urlencodedParser = bodyParser.urlencoded({extended: false}) // for viewing express on a pug template

app.set('view engine', 'pug'); // setting pug as view engine
app.use('/css', express.static('css')) // linking css to the html

// home page
app.get('/new_visit', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/single-page-app', function(req, res) {
  res.sendFile(__dirname + '/single-page-app.html');
});

// posting to new visitor path to render the html form data
app.post('/success', urlencodedParser, async (req, res) => { 
  let visitorsTable = new Visitors() // creating an instance of the visitor table 
  let newVisitorsTable = await visitorsTable.createTable() // this will create the visitor's table if it does not already exist
  
    // calling the addNewVisitor function
    let addNew = await visitorsTable.addVisitor(
      req.body.name,
      req.body.age,
      req.body.date,
      req.body.time,
      req.body.assistedby,
      req.body.comments
      );
      
      console.log(addNew)
      res.render('success.pug', 
      {
        data: addNew[0],
      });  
});

app.delete('/deleteVisitor/:id', async(req, res) => {
  let visitorsTable = new Visitors() // creating an instance of the visitor table
  let id = req.params.id
  let deleteVisitor = await visitorsTable.deleteAVisitor(id)
  res.send(deleteVisitor)
})

app.get('/viewVisitors', async(req, res) => {
  let visitorsTable = new Visitors() // creating an instance of the visitor table
  let viewVisitors = await visitorsTable.viewTable()
  res.send(viewVisitors)
})

// function loadDoc() {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//      document.getElementById("demo").innerHTML = this.responseText;
//     }
//   };
//   xhttp.open("GET", "ajax_info.txt", true);
//   xhttp.send();
// }

app.listen(3000, () => {
  console.log('Listening on port 3000...')
});
