import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_ROOT } from '../../utils/api_config';
import { generateId } from '../../utils/uuid-generator';

export default class ProductRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,

            scrollPos: 0,
            displayedProducts: [],
            isRotating: false,
        }
    }

    async componentDidMount() {
        let result = await axios.get(`${API_ROOT}/products`);
        this.setState({displayedProducts: result.data});
    }

    rotate = (direction) => {
        this.setState({isRotating: true});
        let currentScrollPos = this.state.scrollPos;
        if(direction==='left') {
            this.setState({scrollPos: currentScrollPos+210});                        
            let nextProducts = this.state.displayedProducts.slice();
            let productToRotate = nextProducts.shift();
            nextProducts.push(productToRotate);
            setTimeout(()=>{
                this.setState({displayedProducts: nextProducts, isRotating: false});             
            },500);
        } else if (direction==='right') {
            this.setState({scrollPos: currentScrollPos-210});            
            let nextProducts = this.state.displayedProducts.slice();
            let productToRotate = nextProducts.pop();
            nextProducts.unshift(productToRotate);
            setTimeout(()=>{
                this.setState({displayedProducts: nextProducts, isRotating: false});                
            },500);
        }
    }

    renderProduct = (product) => (
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

    render = () => {
        console.log(this.state.displayedProducts);
        return (
            <div className='sneakerstop-product-row'>
                <div 
                    className='left arrow-container'
                    onClick={()=>{
                        if(!this.state.isRotating) {
                            this.rotate('left')
                        }
                    }}
                    style={this.state.scrollPos === 0 ? {visibility: 'hidden'} : {}}>
                    &#x276E;
                </div>
                <div className='sneakerstop-product-thumbnails-container'>
                    <div className='sneakerstop-product-thumbnails'>
                        <div
                            className='sneakerstop-product-thumbnail-set'
                            style={{marginLeft:`${this.state.scrollPos}px`}}
                            >
                            {this.state.displayedProducts.slice(1,this.state.displayedProducts.length-1).map(product => this.renderProduct(product))}
                        </div>
                    </div>
                </div>
                <div
                    className='right arrow-container'
                    onClick={()=>{
                        if(!this.state.isRotating) {
                            this.rotate('right')
                        }
                    }}
                    style={this.state.scrollPos === 1000 ? {visibility: 'hidden'} : {}}>
                    &#x276F;
                </div>
            </div>
        )
    }
}