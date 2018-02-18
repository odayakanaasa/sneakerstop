import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_ROOT } from './../../utils/api_config';
import { generateId } from './../../utils/uuid-generator';

const shippingMethods = [
    {
        name: 'Standard (5-7 days)',
        price: 4.99
    },
    {
        name: 'Priority (2-3 days)',
        price: 12.99
    },
    {
        name: 'Next Day',
        price: 21.99
    }
]

export default class Cart extends Component {

    static propTypes = {
        username: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            shippingPrice: 4.99,
        }
    }

    async componentDidMount() {
        try {
            let result = await axios.get(`${API_ROOT}/cartitems/${this.props.username}`);
            console.log(result);
            this.setState({cartItems: result.data});
        } catch(err) {
            console.log(err);
        }
    }

    removeItem = async (itemId) => {
        try {
            await axios.delete(`${API_ROOT}/cartitems/${itemId}`);
            let cartWithoutItem = this.state.cartItems.filter(item => item.id !== itemId);
            this.setState({cartItems: cartWithoutItem});
        } catch(err) {
            console.log(err);
        }
    }

    updateItemQuantity = async (itemId,newQuantity) => {
        if (newQuantity>0) {
            try {
                await axios.patch(`${API_ROOT}/cartitems/${itemId}`,{quantity: newQuantity});
                let cartItemToUpdate = this.state.cartItems.find(item => item.id === itemId);
                cartItemToUpdate.quantity = newQuantity;
                let cartCopy = this.state.cartItems.filter(item => item.id !== itemId);;
                cartCopy.push(cartItemToUpdate);
                this.setState({cartItems: cartCopy});
            } catch(err) {
                console.log(err);
            }
        }        
    }

    getSubTotal = () => {
        let subTotal = 0;
        this.state.cartItems.forEach(item => {
            subTotal += this.calculatePrice(item);
        });
        return subTotal;
    }

    calculatePrice = (item) => {
        return item.price * item.quantity;
    }

    render = () => {
        this.state.cartItems.sort((item1,item2) => item1.id > item2.id);
        return (
            <div className='sneakerstop-cart-layout-container'>
            {this.state.cartItems.length === 0 ? (
                <div className='cart-no-items'>
                    <h1>There are no items in your cart.</h1>
                </div>
            ) : (
                <div>
                    <h1> Cart </h1>
                    <table className='sneakerstop-cart-table'>
                        <thead>
                            <tr>
                                <th colSpan={3}>
                                    Product
                                </th>
                                <th>
                                    Price
                                </th>
                                <th>
                                    Quantity
                                </th>
                                <th>
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.cartItems.map(item => (
                                <tr key={generateId()}>
                                    <td className='sneakerstop-cart-item-remove'>
                                        <span onClick={()=>this.removeItem(item.id)}>&times;</span>
                                    </td>
                                    <td className='sneakerstop-cart-item-image'>
                                        <Link to={`/products/${item.product_id}`}>
                                            <img 
                                                src={`http://res.cloudinary.com/djtc1xatx/image/upload/v1517870233/${item.product_id}-1.jpg`}
                                                alt={item.name}/>
                                        </Link>
                                    </td>
                                    <td className='sneakerstop-cart-item-name'>
                                        <Link to={`/products/${item.product_id}`}>
                                            {item.name}
                                        </Link>
                                    </td>
                                    <td className='sneakerstop-cart-item-price'>
                                        {`$${item.price}`}
                                    </td>
                                    <td className='sneakerstop-cart-item-quantity'>
                                        <span onClick={()=>this.updateItemQuantity(item.id,item.quantity-1)}>
                                            &#8249;
                                        </span>
                                        {item.quantity}
                                        <span onClick={()=>this.updateItemQuantity(item.id,item.quantity+1)}>
                                            &#8250;
                                        </span>
                                    </td>
                                    <td className='sneakerstop-cart-item-total'>
                                        {`$${this.calculatePrice(item)}`}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className='sneakerstop-mobile-cart'>
                        {this.state.cartItems.length === 0 ? (
                            <div>There are no items in your cart.</div>
                        ) : this.state.cartItems.map(item => (
                            <div className='sneakerstop-mobile-cart-item' key={generateId()}>
                                <div className='sneakerstop-mobile-cart-item-image'>
                                    <Link to={`/products/${item.product_id}`}>
                                        <img 
                                            src={`http://res.cloudinary.com/djtc1xatx/image/upload/v1517870233/${item.product_id}-1.jpg`}
                                            alt={item.name}/>
                                    </Link>
                                </div>
                                <div className='sneakerstop-mobile-cart-table-container'>
                                    <table>
                                        <tbody>
                                            <tr className='sneakerstop-mobile-cart-item-name'>
                                                <td colSpan={2}>
                                                    <Link to={`/products/${item.product_id}`}>
                                                        {item.name}
                                                    </Link>
                                                </td>
                                            </tr>
                                            <tr className='sneakerstop-mobile-cart-item-price'>
                                                <td>
                                                    Price:
                                                </td>
                                                <td>
                                                    {`$${item.price}`}
                                                </td>
                                            </tr>
                                            <tr className='sneakerstop-mobile-cart-item-quantity'>
                                                <td>
                                                    Quantity:
                                                </td>
                                                <td>
                                                    <span onClick={()=>this.updateItemQuantity(item.id,item.quantity-1)}>
                                                        &#8249;
                                                    </span>
                                                    {item.quantity}
                                                    <span onClick={()=>this.updateItemQuantity(item.id,item.quantity+1)}>
                                                        &#8250;
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr className='sneakerstop-mobile-cart-item-total'>
                                                <td>
                                                    Total:
                                                </td>
                                                <td>
                                                    {`$${this.calculatePrice(item)}`}
                                                </td>
                                            </tr>
                                            <tr className='sneakerstop-mobile-cart-item-remove'>
                                                <td colSpan={2}>
                                                    <span onClick={()=>this.removeItem(item.id)}>Remove</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                
            
                <table className='sneakerstop-totals-table'>
                    <tbody>
                        <tr>
                            <td>
                                Subtotal
                            </td>
                            <td>
                                {`$${this.getSubTotal()}`}
                            </td>
                        </tr>
                        <tr className='sneakerstop-totals-table-shipping'>
                            <td>
                                Shipping &amp; Handling
                            </td>
                            <td>
                                <select 
                                    onChange={event=>this.setState({shippingPrice: event.target.value})}
                                    value={this.state.shippingPrice}>
                                    {shippingMethods.map(method => (
                                        <option
                                            key={generateId()}
                                            value={method.price}>{`${method.name} - $${method.price}`}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Total
                            </td>
                            <td>
                                {`$${this.getSubTotal()+parseFloat(this.state.shippingPrice)}`}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            )}
            <div className='sneakerstop-cart-nav-button-container'>
                <Link to='/products'>
                    &#8249; Continue Shopping 
                </Link>
                {this.state.cartItems.length === 0 ? null : (
                    <Link to='/checkout'>
                        Check Out &#8250;
                    </Link>
                )}
            </div>
        </div>
        )
    }
}