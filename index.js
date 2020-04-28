let express = require('express');
let bodyParser = require('body-parser')

const{Client} = require('pg')
const client = new Client({
    user: "user",
    password: "pass",
    host: "localhost",
    port: 5432,
    database: "db"
})

let app = express();

let urlencodedParser = bodyParser.urlencoded({extended: false})//for viewing express on a pug template

app.set('view engine', 'pug');



app.get('/single-page-app', (req, res) => {
    res.sendFile(__dirname + '/form.html');
});

app.post('/success', function(req, res) { 
  
    res.render('successful', {data: req.body});
    console.log(req.body)

    // add new visitor function
    async function addVisitor(name, age, date, time, assistedBy, comments) {
      try{
        await client.connect()
        await client.query("BEGIN")
        await client.query("insert into visitors (name, age, date, time, assistedby, comments) values ($1, $2, $3, $4, $5, $6)", [name, age, date, time, assistedBy, comments])
        console.log("Inserted a new row")
        await client.query("COMMIT")
        await client.end()
      }
      catch(ex){
        console.log("Failed to add visitor " + ex)
      }
      finally{
        console.log("script closed")
        return res.rows
      }
    }

    // calling the addNewVisitor function
    addVisitor(
      req.body.name,
      req.body.age,
      req.body.date,
      req.body.time,
      req.body.assistedby,
      req.body.comments
      )
});

app.listen(5000, () => {
    console.log("Listening on port 5000");
});

// app.get('/', (req, res) => {
//         res.send('Welcome this is home')
//     });