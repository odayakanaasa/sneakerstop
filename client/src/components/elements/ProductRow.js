import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';



export default class ProductRow extends Component {

    static propTypes = {
        //<=10 products
        products: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render = () => {

        return (
            <div className='sneakerstop-product-row'>
                <div className='left arrow-container'>

                </div>
                {this.props.products.map(product => (
                    <div>

                    </div>
                ))}
                <div className='right arrow-container'>

                </div>
            </div>
        )
    }
}