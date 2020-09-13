# Visitors Database

An application built to capture data for visitors to come in to visit the Umuzi Studio, then store that data in an SQL Database. That data can then be retrieved by the admin using a one page application process built using Ajax.

This will then allow the admin to update or delete the data, all these are api endpoints built using expressJS.

## API end-points created
### Please note, all these endpoints are preceded by `localhost:5000`
- Adding a visitor: `/addNewVisitor`
- Deleting a Visitor: `/deleteVisitor/:id`
- Deleting all Visitors: `/deleteAllVisitors`
- Updating a Visitor: `/updateVisitor/:id`
- Viewing a Single Visitor: `/viewVisitor/:id`
- Viewing all Visitors: `/viewVisitor/:id`

## Running the Application
- I'm using NPM to run the application there for to be able to run it you need to have node package manager installed in your system, which you can get installation instructions here: https://www.npmjs.com/

- You will also need the to have either (docker and docker-compose) or (postgres) installed in your system for the database.

### To contribute...
- Clone repo

- On the root folder, type `npm instal` to install all the node dependencies.

- Navigate to `src` folder and run `node app.js`

- User/Client Page: Open the browser then type the following url `http://localhost:5000/addNewVisitor`

- Admin Page: Open the browser the type the following url `http://localhost/single-page-app`

- You can also run delete and update endpoints using postman, and for the part that has `:id` you will need to replace that with an actual id of the visitor you want to delete, view or update.

- To view the database and run `docker-compose` and on your browser type in `localhost:8080` and the credantials you need to log in are found on the `docker-compose.yml` file in the root folder.

## Technologies Used
- ```Ajax```
- ```NodeJS```
- ```Express```
- ```PostgreSQL```
- ```HTML and CSS```
- ```PUG```
- ```Async Javascript```