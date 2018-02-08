const CartItem = require('../database.js').models.CartItem;

//GET Request
const findAll = (req,res,next) => {
	console.log('Request Type:', req.method);
	CartItem.findAll().then(result => {
    	return res.send(result);
    }).catch(next);
}

//GET Request

//TODO: join the products table to get the price and name of each product by id
//TODO: make this association between products and cartitems
//User.hasMany(Post, {foreignKey: 'user_id'})
//Post.belongsTo(User, {foreignKey: 'user_id'})
/*
Posts.findAll({
  include: [{
    model: User,
    where: {year_birth: 1984}
    required: false,
   }]
})
*/
//Something like
//SELECT cartitems. FROM CartItems INNER JOIN products ON product.id = cartitem.productId
const findByUsername = (req,res,next) => {
    console.log('Request Type:', req.method);
    console.log('Request ID parameter: ',req.params.id);
    CartItem.findAll({ where: { username: req.params.username } }).then(result => {
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
	findAll,
	findByUsername,
	add,
	updateById,
	deleteById
}