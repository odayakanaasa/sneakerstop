import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ActionButton from '../elements/ActionButton';
import { generateId } from './../../utils/uuid-generator';
import { API_ROOT } from './../../utils/api_config';
import Auth from './../../utils/auth/Auth';

const sizes = [7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12];

export default class Product extends Component {

    static propTypes = {
        username: PropTypes.string.isRequired,
        getCartItems: PropTypes.func.isRequired,
    }

    static contextTypes = {
    	router: PropTypes.object,
    	location: PropTypes.object
    }
    
    constructor(props) {
        super(props);
        this.state = {
            productData: undefined,
            selectedImage: 1,
            //handle sizes later
            //selectedSize: 1,
        }
    }

    async componentWillMount() {
        try {
            let id = this.context.router.route.match.params.id;        
            let result = await axios.get(`${API_ROOT}/products/${id}`);
            this.setState({productData: result.data});
        } catch(err) {
            console.log(err);
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.addToCart();
        this.context.router.history.push('/cart');
    }

    async addToCart() {
        if(localStorage.getItem('username')) {
            try {
                await axios.post(`${API_ROOT}/cartitems`,{
                    product_id: this.state.productData.id,
                    username: this.props.username,
                    quantity: 1,
                    purchased: false,
                });
            } catch(err) {
                console.log(err);
            }
        } else {
            let cart = localStorage.getItem('cart');
            if(cart) {
                let parsedCart = JSON.parse(cart);
                console.log(parsedCart);
            } else {
                localStorage.setItem('cart',JSON.stringify({
                    product_id: this.state.productData.id,
                    username: this.props.username,
                    quantity: 1,
                    purchased: false,
                }));
            }
        }
        this.props.getCartItems();
    }

    renderThumbnails = () => {
        let nums = [1,2,3,4];
        let selectedImage = this.state.selectedImage;
        return nums.map((num)=>(
            <img 
                key={generateId()}
                onClick={()=>this.setState({selectedImage: num})}
                src={`http://res.cloudinary.com/djtc1xatx/image/upload/v1517870233/${this.state.productData.id}-${num}.jpg`}/>            
        ))
    }

    render = () => (
        <div className='sneakerstop-product-layout-container'>
            <div className='row'>
                <div className='col-md-8'>
                    <div className='sneakerstop-product-images-container'>
                        {!this.state.productData ? null : (
                            <img 
                                className='main' 
                                src={`http://res.cloudinary.com/djtc1xatx/image/upload/v1517870233/${this.state.productData.id}-${this.state.selectedImage}.jpg`}/>
                        )}
                       {!this.state.productData ? null : (
                           <div className='thumbnail-container'>
                                {this.renderThumbnails()}
                            </div>
                       )}
                    </div>
                </div>
                <div className='col-md-4'>
                    {!this.state.productData ? null : (
                        <div className='sneakerstop-product-info'>
                            <h1> {this.state.productData.name} </h1>
                            <h2> {this.state.productData.brand} </h2>
                            <h3> ${this.state.productData.price} </h3>
                            <form>
                                <div className='form-row'>
                                    <span> Size </span>
                                    <select>
                                        {sizes.map(size => <option key={generateId()}>{size}</option>)}
                                    </select>
                                </div>
                                <div className='form-row'>
                                    <ActionButton 
                                        orientation='right' 
                                        text='Add to Cart' 
                                        onClick={this.handleSubmit}/>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}