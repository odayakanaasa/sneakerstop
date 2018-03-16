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
    
    render = () => {
        return (
            <div>
                <div className='sneakerstop-banner-background'>
                    <div className='sneakerstop-banner'>
                        <h2> Introducing the </h2>
                        <h1> Nike Lebron X </h1>
                        <Link to='/'>
                            <ActionButton text='Shop Now' url='/products' orientation='right'/>
                        </Link>
                    </div>
                </div>
                <div className='sneakerstop-products-container'>
                    <h2> Recently Released </h2>
                    <ProductRow/>
                    <h2> Recommended For You </h2>
                    <ProductRow/>
                </div>
            </div>
        )
    }
}