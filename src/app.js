const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const {client} = require("./client-connection");
const Visitors = require('./queries');
const path = require('path');

const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});

// app.use(express.json());
// app.use(express.urlencoded());

app.use(express.static('src/public'))

app.get('/single-page-app', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/single-page-app.html'))
});

// app.get('/javascript', function (req, res) {
//   res.sendFile(path.join(__dirname, './public/ajax.js'))
// })

// app.get('/css', function(req, res) {
//   res.sendFile(path.join(__dirname, './public/css/style.css'))
// })

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

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
});
