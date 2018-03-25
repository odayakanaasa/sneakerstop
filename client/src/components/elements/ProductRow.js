import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_ROOT } from '../../utils/api_config';
import { generateId } from '../../utils/uuid-generator';

export default class ProductRow extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        products: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            scrollPos: -160,
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
            this.setState({scrollPos: currentScrollPos+180});                        
            let nextProducts = this.state.displayedProducts.slice();
            let productToRotate = nextProducts.pop();
            nextProducts.unshift(productToRotate);
            setTimeout(()=>{
                this.setState({
                        displayedProducts: nextProducts,
                        isRotating: false,
                        scrollPos: currentScrollPos,
                    });
                this.setState({scrollPos: currentScrollPos});                                  
            },500);
        } else if (direction==='right') {
            this.setState({scrollPos: currentScrollPos-180});   
            let nextProducts = this.state.displayedProducts.slice();
            let productToRotate = nextProducts.shift();
            nextProducts.push(productToRotate);         
            setTimeout(()=>{
                this.setState({
                        displayedProducts: nextProducts,
                        isRotating: false,
                    });
                this.setState({scrollPos: currentScrollPos});              
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
        return (
            <div className='sneakerstop-product-row'>
                <h2>{this.props.title}</h2>
                <div className='sneakerstop-product-thumbnails'>
                    <div className='left arrow-container'
                        onClick={()=>{
                            if(!this.state.isRotating) {
                                this.rotate('left')
                            }
                        }}>
                        &#x276E;
                    </div>
                    <div className='sneakerstop-product-thumbnails-flex-container'
                        style={{
                            marginLeft:`${this.state.scrollPos}px`,
                            transition: (this.state.isRotating ? 'margin-left 0.5s' : null),
                            }}>
                        {this.state.displayedProducts.map(product => this.renderProduct(product))}
                    </div>
                    <div className='right arrow-container'
                        onClick={()=>{
                            if(!this.state.isRotating) {
                                this.rotate('right')
                            }
                        }}>
                        &#x276F;
                    </div>
                </div>
            </div>
        )
    }
}