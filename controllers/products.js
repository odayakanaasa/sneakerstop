const Product = require('../database.js').models.Product;

//GET Request
const findAll = (req,res,next) => {
	console.log('Request Type:', req.method);
	Product.findAll().then(result => {
    	return res.send(result);
    }).catch(next);
}

//GET Request
const findById = (req,res,next) => {
	console.log('Request Type:', req.method);
	console.log('Request ID parameter: ',req.params.id);
	Product.findOne({ where: { id: req.params.id } }).then(result => {
     	return res.send(result);
    }).catch(next);
}

//POST Request
const add = (req,res,next) => {
	console.log('Request Type:', req.method);
	console.log('Request Body: ',req.body);
	Product.create(req.body).then(result => {
		return res.send(result);
	}).catch(next);
}

//PUT Request
const updateById = (req,res,next) => {
	console.log('Request Type: ',req.method);
	console.log('Request ID parameter: ',req.params.id);
	console.log('Request Body: ',req.body);
	Product.update(req.body, { where: { id: req.params.id }}).then(result => {
		return res.send(result);
	}).catch(next);
}

//DELETE Request
const deleteById = (req,res,next) => {
	console.log('Request Type:', req.method);
	console.log('Request ID parameter: ',req.params.id);
	Product.destroy({ where: {id: req.params.id }}).then(() => {
		return res.sendStatus(200);
	}).catch(next);
}

const search = (req,res,next) => {
    let terms = req.params.terms;
    let resultIds = [];
    terms.forEach(term => {
        sequelize.query(`SELECT 'products.id' 
                FROM 'products' 
                WHERE 'products.brand' LIKE ${term}
                OR 'products.name' LIKE ${term}
                OR 'products.name`, { type: sequelize.QueryTypes.SELECT}).then(result => {
            resultIds.push(result);
       }).catch(next);
    });
    return res.send(resultIds);
}

module.exports = {
	findAll,
	findById,
	add,
	updateById,
    deleteById,
    search
}