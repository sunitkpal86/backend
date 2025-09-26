const Employee = require('../models/employee.model.js');

exports.create = (req, res) =>{
	if(!req.body.email){
		return res.status(400).send({
			message: "Employee email can not be emplty"
		});
	}
	const employee = new Employee({
		name:req.body.name || "Untitled Employee",
		email: req.body.email,
		mobile: req.body.mobile,
		add:req.body.add
	});
	
	employee.save()
	.then(data=>{
		res.send(data);
	}).catch(err =>{
		res.status(500).send({
			message: err.message || "Some error occurred while creating the Employee."
		});
	});
};

exports.findAll = (req, res) => {
	try{
		Employee.find()
	.then(employees =>{
		res.send(employees);
	}).catch(err =>{
		res.status(500).send({
			message : err.message || "Some error occurred while retrieving employees."
		});
	});
	}
	catch(ex){
		console.log(ex);
	}
};

exports.findOne = (req, res) => {
	Employee.findById(req.params.employeeId)
	.then(employee =>{
		if(!employee){
			return res.status(400).send({
				message: "Employee not found with id " + req.params.employeeId
			});
		}
		res.send(employee);
	}).catch(err=>{
		if(err.kind === 'ObjectId'){
			return res.status(404).send({
			message: "Employee not found with id " + req.params.employeeId
		});
		
	}
	return res.status(500).send({
		message: "Error retrieve employee with id " + req.params.employeeId
	});
	});
};

exports.update = (req, res) => {
	if(!req.body.email){
		return res.status(400).send({
			message: " Employee email can not be emplty"
		});
	}
	
	Employee.findByIdAndUpdate(req.params.employeeId, {
		name: req.body.name || "Untitled Employee",
		email:req.body.email,
		mobile:req.body.mobile,
		add: req.body.add
	}, {new: true})
	.then(employee =>{
		if(!employee){
			return res.status(404).send({
				message: "Employee not found with id " + req.params.employeeId
			});
		}
		res.send(employee);
	}).catch(err =>{
		if(err.kind === 'ObjectId'){
			return res.status(404).send({
				message: "Employee not found with id " + req.params.employeeId
			});
		}
		return res.status(500).send({
			message: "Error updating employee with id " + req.params.employeeId
		});
	});
};

exports.delete = (req, res) => {
	Employee.findByIdAndRemove(req.params.employeeId)
	.then(employee =>{
		if(!Employee){
			return res.status(404).send({
				message: "Employee not found with id " + req.params.employeeId
			});
		}
		res.send({message: "Employee deleted successfully !"});
	}).catch(err =>{
		if(err.kind === 'ObjectId' || err.name === 'NotFound'){
			return res.status(404).send({
				message: "Employee not found with id " + req.params.employeeId
			});
		}
		return res.status(500).send({
			message: "Could not delete employee with id " + req.params.employeeId
		});
	});
};