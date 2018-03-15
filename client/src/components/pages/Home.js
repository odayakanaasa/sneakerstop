import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_ROOT } from './../../utils/api_config';
import ActionButton from '../elements/ActionButton';
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
    
    render = () => {
        return (
            <div>
                <div className='sneakerstop-banner-background'>
                    <div className='sneakerstop-banner'>
                        <h2> Introducing the </h2>
                        <h1> Nike Lebron X </h1>
                        <Link to='/products' className='sneakerstop-shop-now-button'>
                            <span>Shop Now</span>
                            <div>&#8250;</div>
                        </Link>
                    </div>
                </div>
                <div className='sneakerstop-products-container'>
                    <h2> Recently Released </h2>
                    <ProductRow products = {this.state.products.slice(0,10)}/>
                    <h2> Recommended For You </h2>
                    <ProductRow products = {this.state.products.slice(0,10)}/>
                </div>
            </div>
        )
    }
}