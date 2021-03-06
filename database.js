const Sequelize = require('sequelize');

//connection
const database = new Sequelize(process.env.DATABASE_URL,{
	host: process.env.DATABASE_URL.host,
	dialect: 'postgres'
});

/*
id            | uuid                     |           | not null | 
name          | character varying(255)   |           | not null | 
price         | numeric                  |           | not null | 
brand         | character varying(255)   |           | not null | 
product_group | character varying(255)   |           | not null | 
category      | character varying(255)   |           | not null | 
sub_category  | character varying(255)   |           | not null | 
quantity      | integer                  |           | not null | 
createdAt     | timestamp with time zone |           | not null | 
updatedAt     | timestamp with time zone |           | not null | 
*/

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
    product_group: {
        type: database.Sequelize.STRING,
        allowNull: false,
        unique: false,
    },
    category: {
        type: database.Sequelize.STRING,
        allowNull: false,
        unique: false,
    },
    sub_category: {
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

/*
 id         | uuid                     |           | not null | 
 username   | character varying(255)   |           | not null | 
 product_id | uuid                     |           | not null | 
 quantity   | integer                  |           | not null | 
 purchased  | boolean                  |           | not null | 
 createdAt  | timestamp with time zone |           | not null | 
 updatedAt  | timestamp with time zone |           | not null |
*/

const CartItem = database.define('cartitem', {
    id: {
		type: database.Sequelize.UUID,
		defaultValue: Sequelize.UUIDV1,
		allowNull: false,
		unique: true,
		primaryKey: true,
    },
    username: {
        type: database.Sequelize.STRING,
		allowNull: false,
		unique: false,
    },
    product_id: {
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
            group: 'men',
            category: 'shoes',
            subCategory: 'basketball',
            quantity: '100',
        },
        {
            id: '680c94e6-1fa5-4849-827e-90a6811bded3',
            name: 'Vans Sk8-Hi',
            price: '59.99',
            brand: 'Vans',
            group: 'men',
            category: 'shoes',
            subCategory: 'skateboarding',
            quantity: '100',
        },
        {
            id: '2332c699-ad9c-439d-8b55-76724b23102c',
            name: 'Nike Air Max 90 Premium "Skulls"',
            price: '89.99',
            brand: 'Nike',
            group: 'men',
            category: 'shoes',
            subCategory: 'lifestyle',
            quantity: '100',
        },
        {
            id: '80280ddd-0457-42c0-ae58-b4b092bdd91e',
            name: 'Vans Old Skool "2-Tone"',
            price: '59.99',
            brand: 'Vans',
            group: 'men',
            category: 'shoes',
            subCategory: 'skateboarding',
            quantity: '100',
        },
        {
            id: 'a943a750-ed39-4029-bc1c-47d56c9a812a',
            name: 'Nike SB Zoom Blazer Mid',
            price: '89.99',
            brand: 'Nike',
            group: 'men',
            category: 'shoes',
            subCategory: 'skateboarding',
            quantity: '100',
        },
        {
            id: 'abee1d1b-1a35-46e7-84d7-70d4a615dcb6',
            name: `Air Jordan 11 Retro "Win Like '96"`,
            price: '149.99',
            brand: 'Air Jordan',
            group: 'men',
            category: 'shoes',
            subCategory: 'basketball',
            quantity: '100',
        },
        {
            id: 'c70e42a0-ecd0-11e7-a4c0-7cd1c3f6c253',
            name: 'Air Jordan 5 Retro Blue Suede',
            price: '159.99',
            brand: 'Air Jordan',
            group: 'men',
            category: 'shoes',
            subCategory: 'basketball',
            quantity: '100',
        },
        {
            id: 'e96fed3c-20d0-45c5-a7b8-97783a7b2578',
            name: 'Adidas Stan Smith White',
            price: '59.99',
            brand: 'Adidas',
            group: 'men',
            category: 'shoes',
            subCategory: 'lifestyle',
            quantity: '100',
        },
        {
            id: 'cbca7a0d-9df8-464a-b729-2ac974c8c9dd',
            name: 'Air Jordan 13 Retro "Bred"',
            price: '149.99',
            brand: 'Air Jordan',
            group: 'men',
            category: 'shoes',
            subCategory: 'basketball',
            quantity: '100',
        },
        {
            id: 'fb5fbb05-b2a6-4e82-ae21-5314473cef07',
            name: 'Nike Air Max 97 Og Qs "Silver Bullet 2017"',
            price: '89.99',
            brand: 'Nike',
            group: 'men',
            category: 'shoes',
            subCategory: 'lifestyle',
            quantity: '100',
        },
    ];

    const cartItems = [
        {
            username: 'jhinsch799',
            productId: '80280ddd-0457-42c0-ae58-b4b092bdd91e',
            quantity: 2,
            purchased: false,
        },
        {
            username: 'jhinsch799',
            productId: 'fb5fbb05-b2a6-4e82-ae21-5314473cef07',
            quantity: 1,
            purchased: false,
        },
    ];

	return sync().then(()=>{
		const seedProducts = products.map(product => Product.create({
            id: product.id,
            name: product.name,
            price: product.price,
            brand: product.brand,
            product_group: product.group,
            category: product.category,
            sub_category: product.subCategory,
            quantity: product.quantity,
        }));
        return Promise.all(seedProducts).then(()=>{
            const seedCartItems = cartItems.map(item => CartItem.create({
                id: item.id,
                username: item.username,
                product_id: item.productId,
                quantity: item.quantity,
                purchased: item.purchased,
            }));
            return Promise.all(seedCartItems);
        }).catch(err => console.log(err));
    });
}

module.exports = {
    database,
	models: {
        Product,
        CartItem
	},
	sync,
	seed,
}