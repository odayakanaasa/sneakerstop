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

const sync = () => database.sync({force:true});

const seed = () => {
	const products = [];
	return sync().then(()=>{
		const seedProductData = products;
		return Promise.all(seedTodoData);
	});
}

module.exports = {
	models: {
		Product,
	},
	sync,
	seed,
}