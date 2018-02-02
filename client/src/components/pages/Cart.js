import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Cart extends Component {

    static propTypes = {
        cart: PropTypes.array.isRequired,
        editCart: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    //products, quantity, price

    //total
    //tax & shipping - enter zip code?

    //checkout ->

    getSubTotal = () => {
        
    }

    handleQuantityChange = () => {
        
    }

    calculatePrice = (item) => {
        return item.price * item.quantity;
    }

    render = () => {
        <div className='cart-container'>
            <h1> Cart </h1>
            <table>
                <thead>
                    <th>

                    </th>
                    <th>
                        Product
                    </th>
                    <th>

                    </th>
                </thead>
                <tbody>
                    {this.props.cart.map(item => (
                        <tr>
                            <td className='cart-item-thumbnail'>
                                <img src={require()}/>
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {`$${this.calculatePrice(item)}.00`}
                            </td>
                            <td>
                                <input type="number" value={item.quantity} onChange={this.handleQuantityChange}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="subtotal">
                {`$${this.getSubTotal()}.00`}
            </div>
            <Link to='/checkout'>
                <button>
                    Check Out
                </button>
            </Link>
        </div>

    }
}