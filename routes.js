const router = require('express').Router();

//REST http methods
module.exports = (router) => {
	const products = require('./controllers/products.js');
    router.get('/api/products', products.findAll);
    router.get('/api/products/:id', products.findById);
    router.get('/api/products/search/:terms', products.search);
    router.post('/api/products', products.add);
    router.put('/api/products/:id', products.updateById);
    router.delete('/api/products/:id', products.deleteById);
    const images = require('./controllers/images.js');
    router.post('/api/images', images.add);
    const users = require('./controllers/users');
    router.get('/api/users/:id', users.findById);
    router.put('/api/users/:id', users.updateById);
    router.delete('/api/users/:id', users.deleteById);
}
