const Product = require('../database.js').models.Product;
const sequelize = require('../database.js').database;

//GET Request
const findAll = (req,res,next) => {
    console.log('query:',req.query);
    console.log('Request Type:', req.method);
    let whereClause = {};
    if (req.query.group) {
        whereClause.product_group = req.query.group;
    }
    if (req.query.category) {
        whereClause.category = req.query.category;
    }
    if (req.query.subcategory) {
        whereClause.sub_category = req.query.subcategory;
    }
    console.log(whereClause);
	Product.findAll(whereClause === {} ? '' : {where: whereClause}).then(result => {
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


//https://stackoverflow.com/questions/4014519/fulltext-query-with-scores-ranks-in-postgresql


//GET Request
const search = (req,res,next) => {
    console.log(req.params.query);
    let terms = req.params.query.split('%20');
    console.log(terms)
    let resultIds = [];
    terms.forEach(term => {
        sequelize.query(
            `SELECT products.id, MATCH (products.name,products.brand) AGAINST ${term} AS relevance
            FROM products WHERE products.brand LIKE '%${term}%'
            OR products.name LIKE '%${term}%'
            ORDER BY relevance DESC`, 
            { 
                type: sequelize.QueryTypes.SELECT
            }
        ).then(result => {
            console.log(result);
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