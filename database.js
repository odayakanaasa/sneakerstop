const Sequelize = require('sequelize');

//connection
const database = new Sequelize(process.env.DATABASE_URL,{
	host: process.env.DATABASE_URL.host,
	dialect: 'postgres'
});

//model
const Product = database.define('product', {
	id: {
		type: database.Sequelize.UUID,
		defaultValue: Sequelize.UUIDV1,
		allowNull: false,
		unique: true,
		primaryKey: true,
    },
    name: {
		type: database.Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	description: {
		type: database.Sequelize.STRING,
		allowNull: true,
		unique: false,
	},
	price: {
        type: database.Sequelize.DECIMAL,
        allowNull: false,
        unique: false,
    },
    brand: {
        type: database.Sequelize.STRING,
        allowNull: false,
        unique: false,
    },
    productGroup: {
        type: database.Sequelize.STRING,
        allowNull: false,
        unique: false,
    },
    type: {
        type: database.Sequelize.STRING,
        allowNull: false,
        unique: false,
    },
    subtype: {
        type: database.Sequelize.STRING,
        allowNull: false,
        unique: false,
    },
    quantity: {
        type: database.Sequelize.INTEGER,
        allowNull: false,
        unique: false,
    },
});

const CartItem = database.define('cartitem', {
    id: {
		type: database.Sequelize.UUID,
		defaultValue: Sequelize.UUIDV1,
		allowNull: false,
		unique: true,
		primaryKey: true,
    },
    userId: {
        type: database.Sequelize.UUID,
		allowNull: false,
		unique: false,
    },
    productId: {
        type: database.Sequelize.UUID,
		allowNull: false,
		unique: false,
    },
    quantity: {
        type: database.Sequelize.INTEGER,
        allowNull: false,
        unique: false,
    },
});

const sync = () => database.sync({force:true});

const seed = () => {
    const products = [];
    const cartItems = [];
	return sync().then(()=>{
		const seedProductData = products;
		return Promise.all(seedProductData);
	}).then(()=>{
        const seedCartItemData = cartItems;
        return Promise.all(seedCartItemData);
    }).catch(err => console.log(err));
}

module.exports = {
	models: {
        Product,
        CartItem
	},
	sync,
	seed,
}