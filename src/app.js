const express = require('express')
const bodyParser = require('body-parser')
const port = 3000;
const {client} = require("./client-connection")
const Visitors = require('./queries')
const path = require('path')

const app = express()
const urlencodedParser = bodyParser.urlencoded({extended: false})

app.use(express.static('src/public'))

app.get('/single-page-app', async (req, res) => {
  const visitorsTable = new Visitors()
  const newVisitorsTable = await visitorsTable.createTable()
  res.sendFile(path.join(__dirname, '/public/single-page-app.html'))
})

app.get('/update-visitor', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/update-visitor.html'))
})

app.post('/success', urlencodedParser, async (req, res) => { 
  const visitorsTable = new Visitors()  
  const addNew = await visitorsTable.addVisitor(
    req.body.addName,
    req.body.addAge,
    req.body.addDate,
    req.body.addTime,
    req.body.addAssistedby,
    req.body.addComments
    )
    res.redirect("/single-page-app") 
})

app.delete('/deleteVisitor/:id', async(req, res) => {
  const visitorsTable = new Visitors()
  const id = req.params.id
  const deleteVisitor = await visitorsTable.deleteAVisitor(id)
  res.send(deleteVisitor)
})

app.post('/updateVisitor/:id', urlencodedParser, async(req, res) => {
  const visitorsTable = new Visitors()
  const id = req.params.id
  const updateVisitor = await visitorsTable.updateVisitor(
    req.body.updateName,
    req.body.updateAge,
    req.body.updateDate,
    req.body.updateTime,
    req.body.updateAssistedby,
    req.body.updateComments,
    id
  )
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
