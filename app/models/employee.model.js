const mongoose = require('mongoose');
const EmployeeSchema = mongoose.Schema({
	name: String,
	email:String,
	mobile:String,
	add:String
},{
	timestamps: true
});

module.exports = mongoose.model('Employee', EmployeeSchema);