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
    router.get('/api/images/:id', images.findById);

    const cartItems = require('./controllers/cart_items.js');
    
    router.post('/api/cartitems', cartItems.add);
    router.get('/api/cartitems/:userId', cartItems.findByUsername);
    router.put('/api/cartitems/:id', cartItems.updateById);
    router.delete('/api/cartitems/:id', cartItems.deleteById);
}
