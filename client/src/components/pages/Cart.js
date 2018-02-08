import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_ROOT } from './../../utils/api_config';
import { generateId } from './../../utils/uuid-generator';

export default class Cart extends Component {

    static propTypes = {
        username: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
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

    async removeItem(itemId) {
        try {
            await axios.delete(`${API_ROOT}/cartitems/${itemId}`);
        } catch(err) {
            console.log(err);
        }
    }

    async updateItemQuantity(itemId,newQuantity) {
        try {
            await axios.patch(`${API_ROOT}/cartitems/${itemId}`,{quantity: newQuantity});
        } catch(err) {
            console.log(err);
        }
    }

    getSubTotal = () => {
        
    }

    calculatePrice = (item) => {
        return item.price * item.quantity;
    }

    render = () => (
        <div className='sneakerstop-cart-layout-container'>
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
                    {this.state.cartItems.length === 0 ? (
                        <tr>
                            <td colSpan={6}>
                                There are no items in your cart.
                            </td>
                        </tr>
                    ) : this.state.cartItems.map(item => (
                        <tr>
                            <td>
                                <span onClick={()=>this.removeItem(item.id)}>&times;</span>
                            </td>
                            <td>
                                <Link to={`/products/${item.productId}`}>
                                    <img src={`http://res.cloudinary.com/djtc1xatx/image/upload/v1517870233/${item.productId}-1.jpg`}/>
                                </Link>
                            </td>
                            <td>
                                <Link to={`/products/${item.productId}`}>
                                    {item.name}
                                </Link>
                            </td>
                            <td>
                                {`$${item.price}`}
                            </td>
                            <td>
                                <input 
                                    className='cart-item-quantity'
                                    type="number" 
                                    value={item.quantity} 
                                    onChange={(event)=>this.updateItemQuantity(item.id,event.target.value)}/>
                            </td>
                            <td>
                                {`$${this.calculatePrice(item)}.00`}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='sneakerstop-cart-table-mobile'>
                {this.state.cartItems.length === 0 ? (
                    <tr>
                        <td colSpan={2}>
                            There are no items in your cart.
                        </td>
                    </tr>
                ) : this.state.cartItems.map(item => (
                    <div className='sneakerstop-mobile-cart-item'>
                        <div className='sneakerstop-mobile-cart-item-img-container'>
                            <Link to={`/products/${item.productId}`}>
                                <img src={`http://res.cloudinary.com/djtc1xatx/image/upload/v1517870233/${item.productId}-1.jpg`}/>
                            </Link>
                        </div>

                        <table>
                            <tr>
                                <td colSpan={5}>
                                
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Price
                                </td>
                                <td>
                                    {item.price}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Quantity
                                </td>
                                <td>
                                    <input 
                                        className='cart-item-quantity'
                                        type="number" 
                                        value={item.quantity}
                                        onChange={(event)=>this.updateItemQuantity(item.id,event.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Total
                                </td>
                                <td>
                                    {`$${this.calculatePrice(item)}.00`}
                                </td>
                            </tr>
                            <tr>
                                <td rowSpan={2}>
                                    <span onClick={()=>this.removeItem(item.id)}>Delete</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                ))}
            </div>

            <table className='sneakerstop-totals-table'>
                <tr>
                    <td>
                        Subtotal
                    </td>
                    <td>
                        {`$${this.getSubTotal()}.00`}
                    </td>
                </tr>
                <tr>
                    <td>
                        Shipping &amp; Handling
                    </td>
                    <td>
                    
                    </td>
                </tr>
                <tr>
                    <td>
                        Total
                    </td>
                    <td>
                        {`$${this.getSubTotal()}.00`}
                    </td>
                </tr>
            </table>
            <div className='sneakerstop-cart-nav-button-container'>
                <Link to='/products'>
                    &#8249; Continue Shopping 
                </Link>
                <Link to='/checkout'>
                    Check Out &#8250;
                </Link>
            </div>
        </div>
    )
}