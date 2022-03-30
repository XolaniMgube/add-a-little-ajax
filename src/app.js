const express = require('express')
const bodyParser = require('body-parser')
const port = 3000;
const {client} = require("./client-connection")
const Visitors = require('./queries')
const path = require('path')

const app = express()
const urlencodedParser = bodyParser.urlencoded({extended: false})

app.use(express.static('src/public'))

app.get('/single-page-app', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/single-page-app.html'))
})

app.get('/update-visitor', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/update-visitor.html'))
})

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
    )
    
    res.redirect("/single-page-app") 
})

app.delete('/deleteVisitor/:id', async(req, res) => {
  const visitorsTable = new Visitors()
  const id = req.params.id
  const deleteVisitor = await visitorsTable.deleteAVisitor(id)
  res.send(deleteVisitor)
})

app.put('/updateVisitor/:id', async(req, res) => {
  let visitorsTable = new Visitors()
  let id = req.params.id
  // console.log(req)
  let updateVisitor = await visitorsTable.updateVisitor(
    req.body.names,
    req.body.ages,
    req.body.dates,
    req.body.times,
    req.body.assistedbys,
    req.body.commentss,
    id
  )
  // console.log(req.body)
  res.redirect("/single-page-app")
})

app.get('/viewVisitors', async(req, res) => {
  const visitorsTable = new Visitors()
  const viewVisitors = await visitorsTable.viewTable()
  res.send(viewVisitors)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
