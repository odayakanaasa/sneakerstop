import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ActionButton from '../elements/ActionButton';

export default class Checkout extends Component {
    
    //walk user through checkout process
    
    static propTypes = {

    }

    submitOrder = () => {
        
    }

    render = () => {
        return (
            <div className='checkout-page-container'>
                <form>
                    <ActionButton text='Submit Order' orientation='right' onClick={this.submitOrder}/>
                </form>
            </div>
        )
    }
}