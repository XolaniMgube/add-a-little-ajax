const express = require('express');
const bodyParser = require('body-parser');
const {Client} = require('pg')

require('dotenv').config({path: '../.env'})

const client = new Client({
  user: process.env.PGUSER || 'user',
  password: process.env.PGPASSWORD || 'pass',
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || '5432',
  database: process.env.PGDATABASE || 'db'
})

const Visitors = require('./queries')

const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false})

app.set('view engine', 'pug');
app.use('/css', express.static('css'))

app.get('/new_visit', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/single-page-app', function(req, res) {
  res.sendFile(__dirname + '/single-page-app.html');
});

app.post('/success', urlencodedParser, async (req, res) => { 
  const visitorsTable = new Visitors() 
  const newVisitorsTable = await visitorsTable.createTable() 

  const addNew = await visitorsTable.addVisitor(
    req.body.name,
    req.body.age,
    req.body.date,
    req.body.time,
    req.body.assistedby,
    req.body.comments
    );
      
    console.log(addNew) 
});

app.delete('/deleteVisitor/:id', async(req, res) => {
  const visitorsTable = new Visitors()
  const id = req.params.id
  const deleteVisitor = await visitorsTable.deleteAVisitor(id)
  res.send(deleteVisitor)
})

app.get('/viewVisitors', async(req, res) => {
  const visitorsTable = new Visitors()
  const viewVisitors = await visitorsTable.viewTable()
  res.send(viewVisitors)
})

app.listen(3000, () => {
  console.log('Listening on port 3000...')
});
