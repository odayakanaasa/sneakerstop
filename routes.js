
const router = require('express').Router();

//REST http methods
module.exports = (router) => {
	const products = require('./controllers/products.js');
    router.get('/api/products', products.findAll);
    router.get('/api/products/:id', products.findById);
    router.post('/api/products', products.add);
    router.put('/api/products/:id', products.updateById);
    router.delete('/api/products/:id', products.deleteById);
}
