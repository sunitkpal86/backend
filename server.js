const express = require('express');
const bodyParser = require('body-parser');

var cors = require('cors')
const corsConfig = {
	origin: "*",
	Credential : true,
	methods : ["GET", "POST", "PUT", "DELETE"],
}
const app = express();
app.options("", cors(corsConfig));
app.use(cors(corsConfig))

app.use(bodyParser.urlencoded({extended : true }))

app.use(bodyParser.json())


// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
//mongoose.connect(dbConfig.url,{
mongoose.connect('mongodb+srv://sunitkpal86_db_user:wW7gwcHkY2WpHyv0@cluster0.5zodcua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
	useNewUrlParser: true
}).then(()=>{
	console.log("Successfully connected to the database");
}).catch(err =>{
	console.log('Could not connected to the database. Exiting now...',err);
	process.exit();
});



app.get('/',(req, res)=>{
	res.json({"message" : "Welcome to EarSoft Developer Backend API..."});
	
});

// Require Notes routes
require('./app/routes/note.routes.js')(app);
require('./app/routes/employee.routes.js')(app);

const PORT = 8000;

app.listen(PORT, ()=>{
	console.log("Server is listening on port 8000");
});