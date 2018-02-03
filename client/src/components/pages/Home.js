import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import generateId from './../../utils/uuid-generator';

export default class Home extends Component {

    generateId = () => {
	    let uuidv1 = require('uuid/v1');
        return uuidv1();
    }

    renderProducts = (products) => (
        products.map((el)=>(
            <div key={this.generateId()}>
                <h3>{el.name}</h3>
                <Link to={`/products/${el.id}`}>
                    <img src={require(`../../assets/images/products/${el.id}/1.jpg`)}/>
                </Link>
            </div>
            )
        )
    )
    
    render = () => (
        <div>
            <div className='sneakerstop-banner-background'>
                <div className='sneakerstop-banner'>

                </div>
            </div>
            <div className='sneakerstop-featured-products'>
                <div>
                    {this.renderProducts(products.slice(0,4))}
                </div>
                <div>
                    {this.renderProducts(products.slice(4,8))}
                </div>
            </div>
        </div>
    )
}


const products = [
    {
        name: 'Test Sneaker 1',
        id: 'c70e42a0-ecd0-11e7-a4c0-7cd1c3f6c253'
    },
    {
        name: 'Test Sneaker 2',
        id: 'c70e42a0-ecd0-11e7-a4c0-7cd1c3f6c253'
    },
    {
        name: 'Test Sneaker 3',
        id: 'c70e42a0-ecd0-11e7-a4c0-7cd1c3f6c253'
    },
    {
        name: 'Test Sneaker 4',
        id: 'c70e42a0-ecd0-11e7-a4c0-7cd1c3f6c253'
    },
    {
        name: 'Test Sneaker 5',
        id: 'c70e42a0-ecd0-11e7-a4c0-7cd1c3f6c253'
    },
    {
        name: 'Test Sneaker 6',
        id: 'c70e42a0-ecd0-11e7-a4c0-7cd1c3f6c253'
    },
    {
        name: 'Test Sneaker 7',
        id: 'c70e42a0-ecd0-11e7-a4c0-7cd1c3f6c253'
    },
    {
        name: 'Test Sneaker 8',
        id: 'c70e42a0-ecd0-11e7-a4c0-7cd1c3f6c253'
    },
]
