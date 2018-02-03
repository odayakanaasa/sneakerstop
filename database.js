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
    category: {
        type: database.Sequelize.STRING,
        allowNull: false,
        unique: false,
    },
    subCategory: {
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
    userName: {
        type: database.Sequelize.STRING,
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
    purchased: {
        type: database.Sequelize.BOOLEAN,
        allowNull: false,
        unique: false,
    }
});

const sync = () => database.sync({force:true});

//default data
const seed = () => {
    const products = [
        {
            id: '38a23cf6-a223-4b02-8fb9-4ca1348ae459',
            name: 'Air Jordan 11 Retro "72-10"',
            price: '169.99',
            brand: 'Air Jordan',
            group: 'Men',
            category: 'Shoes',
            subCategory: 'Basketball',
            quantity: '100',
        },
        {
            id: '680c94e6-1fa5-4849-827e-90a6811bded3',
            name: 'Vans Sk8-Hi',
            price: '59.99',
            brand: 'Vans',
            group: 'Men',
            category: 'Shoes',
            subCategory: 'Skateboarding',
            quantity: '100',
        },
        {
            id: '2332c699-ad9c-439d-8b55-76724b23102c',
            name: 'Nike Air Max 90 Premium "Skulls"',
            price: '89.99',
            brand: 'Nike',
            group: 'Men',
            category: 'Shoes',
            subCategory: 'Lifestyle',
            quantity: '100',
        },
        {
            id: '80280ddd-0457-42c0-ae58-b4b092bdd91e',
            name: 'Vans Old Skool "2-Tone"',
            price: '59.99',
            brand: 'Vans',
            group: 'Men',
            category: 'Shoes',
            subCategory: 'Skateboarding',
            quantity: '100',
        },
        {
            id: 'a943a750-ed39-4029-bc1c-47d56c9a812a',
            name: 'Nike SB Zoom Blazer Mid',
            price: '89.99',
            brand: 'Nike',
            group: 'Men',
            category: 'Shoes',
            subCategory: 'Skateboarding',
            quantity: '100',
        },
        {
            id: 'abee1d1b-1a35-46e7-84d7-70d4a615dcb6',
            name: `Air Jordan 11 Retro "Win Like '96"`,
            price: '149.99',
            brand: 'Air Jordan',
            group: 'Men',
            category: 'Shoes',
            subCategory: 'Basketball',
            quantity: '100',
        },
        {
            id: 'c70e42a0-ecd0-11e7-a4c0-7cd1c3f6c253',
            name: 'Air Jordan 5 Retro Blue Suede',
            price: '159.99',
            brand: 'Air Jordan',
            group: 'Men',
            category: 'Shoes',
            subCategory: 'Basketball',
            quantity: '100',
        },
        {
            id: 'e96fed3c-20d0-45c5-a7b8-97783a7b2578',
            name: 'Adidas Stan Smith White',
            price: '59.99',
            brand: 'Adidas',
            group: 'Men',
            category: 'Shoes',
            subCategory: 'Lifestyle',
            quantity: '100',
        },
    ];
	return sync().then(()=>{
		const seedProductData = products.map(product => Product.create({
            id: product.id,
            name: product.name,
            price: product.price,
            brand: product.brand,
            productGroup: product.group,
            category: product.category,
            subCategory: product.subCategory,
            quantity: product.quantity,
        }));
		return Promise.all(seedProductData);
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