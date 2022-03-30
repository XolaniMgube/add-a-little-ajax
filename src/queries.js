const {client} = require("./client-connection")

client.connect()

class Visitors {
    async createTable() {
      try{
        await client.query("BEGIN")
        await client.query(
          `create table if not exists visitors
          (visitor_id serial primary key, 
          visitor_name varchar(20),
          visitor_age int, 
          date_of_visit date, 
          time_of_visit time, 
          assisted_by varchar(20), 
          comments varchar(50))`
          );
        await client.query("COMMIT")
      }
      catch(ex){
        console.log("Failed to create table " + ex)
      }
      finally{
        console.log("script closed")
      }  
    }

    async addVisitor(name, age, date, time, assistedBy, comments) {
      try{
        await client.query("BEGIN")
        let data = await client.query(
          `insert into visitors 
          (visitor_name, visitor_age, date_of_visit, time_of_visit, assisted_by, comments) 
          values ($1, $2, $3, $4, $5, $6) 
          RETURNING *`,
          [name, age, date, time, assistedBy, comments]
          );
        console.log("Inserted a new row")
        await client.query("COMMIT")
        return data.rows
      }
      catch(ex){
        console.log("Failed to add visitor " + ex)
      }
      finally{  
        console.log("script closed")
      }
    }

    async deleteAVisitor(visitorId) {
      try {
          await client.query("BEGIN")
          let data = await client.query("delete from visitors where visitor_id=$1 returning *", [visitorId])
          console.log("visitor deleted")
          await client.query("COMMIT")
          return data.rows
      } catch (ex) {
          console.log("Failed to delete visitor " + ex)
      }
  }

  async viewTable() {
    try{
        await client.query("BEGIN")
        let results = await client.query("select * from visitors") 
        return results.rows
    } catch (ex) {
        console.log("Failed to view table" + ex)
    }
  }

  async updateVisitor(visitorName, visitorAge, dateOfVisit, timeOfVisit, assistedBy, comments, idToBeUpdated) {
    try {
        await client.query("BEGIN")
        let data = await client.query("update visitors set visitor_name = $1, visitor_age = $2, date_of_visit = $3, time_of_visit = $4, assisted_by = $5, comments = $6 where visitor_id = $7 returning *", [visitorName, visitorAge, dateOfVisit, timeOfVisit, assistedBy, comments, idToBeUpdated])
        console.log("visitor updated")
        await client.query("COMMIT")
        console.log(data.rows)
        return data.rows
    } catch (ex) {
        console.log("Failed to update visitor" + ex)
    }
}
}

module.exports = Visitors