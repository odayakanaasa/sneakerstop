const User = require('../database.js').models.User;

//GET Request
const findAll = (req,res,next) => {
	console.log('Request Type:', req.method);
	User.findAll().then((result) => {
    	return res.send(result);
    }).catch(next);
}

//GET Request
const findById = (req,res,next) => {
	console.log('Request Type:', req.method);
	console.log('Request ID parameter: ',req.params.id);
	User.findAll({ where: { id: req.params.id } }).then((result) => {
     	return res.send(result);
    }).catch(next);
}

//POST Request
const add = (req,res,next) => {
	console.log('Request Type:', req.method);
	console.log('Request Body: ',req.body);
	User.create(req.body).then((result) => {
		return res.send(result);
	}).catch(next);
}

//PUT Request
const updateById = (req,res,next) => {
	console.log('Request Type: ',req.method);
	console.log('Request ID parameter: ',req.params.id);
	console.log('Request Body: ',req.body);
	User.update(req.body, { where: { id: req.params.id }}).then((result) => {
		return res.send(result);
	}).catch(next);
}

//DELETE Request
const deleteById = (req,res,next) => {
	console.log('Request Type:', req.method);
	console.log('Request ID parameter: ',req.params.id);
	User.destroy({ where: {id: req.params.id }}).then(() => {
		return res.sendStatus(200);
	}).catch(next);
}

module.exports = {
	findAll,
	findById,
	add,
	updateById,
	deleteById
}