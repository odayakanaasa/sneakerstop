const CartItem = require('../database.js').models.CartItem;
const sequelize = require('../database.js').database;

//GET Request
const countByUsername = (req,res,next) => {
    console.log('Request Type:', req.method);
    CartItem.count({where: {username: req.params.username}}).then(result => {
        return res.send({count: result});
    }).catch(next);
}

//GET Request
const findAll = (req,res,next) => {
	console.log('Request Type:', req.method);
	CartItem.findAll().then(result => {
    	return res.send(result);
    }).catch(next);
}

//GET REQUEST
const findByUsername = (req,res,next) => {
    console.log('Request Type:', req.method);
    console.log('Request Username parameter: ',req.params.username);    
    sequelize.query(
        `SELECT products.name, products.price, cartitems.* 
        FROM cartitems
        INNER JOIN products
        ON products.id = cartitems.product_id
        WHERE cartitems.username = '${req.params.username}'`, 
        { type: sequelize.QueryTypes.SELECT}).then(result => {
            return res.send(result);
    }).catch(next);
}

//POST Request
const add = (req,res,next) => {
	console.log('Request Type:', req.method);
	console.log('Request Body: ',req.body);
	CartItem.create(req.body).then(result => {
		return res.send(result);
	}).catch(next);
}

//TODO: Patch Request??
//PUT Request
const updateById = (req,res,next) => {
	console.log('Request Type: ',req.method);
	console.log('Request ID parameter: ',req.params.id);
	console.log('Request Body: ',req.body);
	CartItem.update(req.body, { where: { id: req.params.id }}).then(result => {
		return res.send(result);
	}).catch(next);
}

//DELETE Request
const deleteById = (req,res,next) => {
	console.log('Request Type:', req.method);
	console.log('Request ID parameter: ',req.params.id);
	CartItem.destroy({ where: {id: req.params.id }}).then(() => {
		return res.sendStatus(200);
	}).catch(next);
}

module.exports = {
    countByUsername,
	findAll,
	findByUsername,
	add,
	updateById,
	deleteById
}