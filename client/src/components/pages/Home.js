import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { generateId } from './../../utils/uuid-generator';
import { API_ROOT } from './../../utils/api_config';

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

    renderProducts = (products) => (
        products.map(product => (
            <div key={generateId()}>
                <h3>{product.name}</h3>
                <Link to={`/products/${product.productGroup.toLocaleLowerCase()}/${product.id}`}>
                    <img src={require(`../../assets/images/products/${product.id}/1.jpg`)}/>
                </Link>
            </div>
            )
        )
    )
    
    render = () => (
        <div>
            <div className='sneakerstop-banner-background'>
                <div className='sneakerstop-banner'>
                    <h1> Welcome </h1>
                </div>
            </div>
            <div className='sneakerstop-featured-products-container'>
                {this.state.products.length===0 ? (
                    <div className='sneakerstop-featured-products-loading'>
                    
                    </div>
                ) : (
                    <div className='sneakerstop-featured-products'>
                        <div className='sneakerstop-featured-products-row'>
                            {this.renderProducts(this.state.products.slice(0,4))}
                        </div>
                        <div className='sneakerstop-featured-products-row'>
                            {this.renderProducts(this.state.products.slice(4,8))}
                        </div>
                    </div>
                )}       
            </div>
        </div>
    )
}