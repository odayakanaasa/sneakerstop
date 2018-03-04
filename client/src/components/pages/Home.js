import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { generateId } from './../../utils/uuid-generator';
import { API_ROOT } from './../../utils/api_config';
import ProductRow from '../elements/ProductRow';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
    }

    async componentDidMount() {
        let result = await axios.get(`${API_ROOT}/products`);
        console.log(result);
        this.setState({products: result.data});
    }

    renderProducts = (products) => products.map(product => (
            <Link key={generateId()} to={`/products/${product.id}`}>
                <div className='sneakerstop-product-thumbnail'>
                    <img 
                        src={`http://res.cloudinary.com/djtc1xatx/image/upload/v1517870233/${product.id}-1.jpg`}
                        alt={product.name}/>
                    <h3>{product.name}</h3>
                    <h4>${product.price}</h4>
                </div>
            </Link>
        )
    )
    
    render = () => {
        return (
            <div>
                <div className='sneakerstop-banner-background'>
                    <div className='sneakerstop-banner'>
                        <h2> Introducing the </h2>
                        <h1> Nike Lebron X 2018 </h1>
                        <Link to='/products' className='sneakerstop-shop-now-button'>
                            Shop Now &#8250;
                        </Link>
                    </div>
                </div>
                <div className='sneakerstop-products-container'>
                    <h2> Featured Products </h2>
                    <ProductRow products = {this.state.products.slice(0,10)}/>
                    <h2> Recommended For You </h2>
                    <ProductRow products = {this.state.products.slice(0,10)}/>
                </div>
            </div>
        )
    }
}