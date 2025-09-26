const express = require('express');
const bodyParser = require('body-parser');


var cors = require('cors')
//var app = express()
const app = express();

app.use(cors())




app.use(bodyParser.urlencoded({extended : true }))

app.use(bodyParser.json())


// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url,{
	useNewUrlParser: true
}).then(()=>{
	console.log("Successfully connected to the database");
}).catch(err =>{
	console.log('Could not connected to the database. Exiting now...',err);
	process.exit();
});



app.get('/',(req, res)=>{
	res.json({"message" : "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
	
});

// Require Notes routes
require('./app/routes/note.routes.js')(app);
require('./app/routes/employee.routes.js')(app);


app.listen(3000, ()=>{
	console.log("Server is listening on port 3000");
});