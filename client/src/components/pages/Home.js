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

    renderProducts = (products) => products.map(product => (
            <Link key={generateId()} to={`/products/${product.productGroup.toLocaleLowerCase()}/${product.id}`}>
                <div className='sneakerstop-product-thumbnail'>
                    <img src={`http://res.cloudinary.com/djtc1xatx/image/upload/v1517870233/${product.id}-1.jpg`}/>
                    <h3>{product.name}</h3>
                    <h4>${product.price}</h4>
                </div>
            </Link>
        )
    )
    
    render = () => (
        <div>
            <div className='sneakerstop-banner-background'>
                <div className='sneakerstop-banner-left'>

                </div>
                <div className='sneakerstop-banner-right'>
            
                </div>
            </div>
            <div className='sneakerstop-featured-products-container'>
                <h2> Featured Products </h2>
                {this.state.products.length===0 ? (
                    <div className='sneakerstop-featured-products-loading'>
                    
                    </div>
                ) : (
                    <div className='sneakerstop-featured-products'>
                        <div className='sneakerstop-featured-products-row'>
                            {this.renderProducts(this.state.products.slice(0,5))}
                        </div>
                        <h2> Recommended For You </h2>
                        <div className='sneakerstop-featured-products-row'>
                            {this.renderProducts(this.state.products.slice(5,10))}
                        </div>
                    </div>
                )}       
            </div>
        </div>
    )
}