import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { generateId } from './../../utils/uuid-generator';

export default class ProductRow extends Component {

    static propTypes = {
        //<=10 products
        products: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            isScrolled: false,
        }
    }

    moveSlider = () => {
        if (this.state.isScrolled) {
            this.setState({isScrolled: false});
        } else {
            this.setState({isScrolled: true});
        }
    }

    //sets of 4-5 products
    //each set gets a sneakerstop-product-thumbnails container (display:flex)
    //thumbnails in set are 

    render = () => {
        let set = this.props.products;

        return (
            <div className='sneakerstop-product-row'>
                <div 
                    className='left arrow-container' 
                    onClick={()=>this.moveSlider()} 
                    style={this.state.isScrolled ? {} : {visibility: 'hidden'}}>
                    &#x276E;
                </div>
                <div className='sneakerstop-product-thumbnails-container'>
                    <div className='sneakerstop-product-thumbnails'>
                        <div className={`sneakerstop-product-thumbnail-set ${this.state.isScrolled ? 'scrolled' : ''}`}>
                            {set.map(product => (
                                <Link key={generateId()} to={`/products/${product.id}`}>
                                    <div className='sneakerstop-product-thumbnail'>
                                        <img 
                                            src={`http://res.cloudinary.com/djtc1xatx/image/upload/v1517870233/${product.id}-1.jpg`}
                                            alt={product.name}/>
                                        <h3>{product.name}</h3>
                                        <h4>${product.price}</h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div 
                    className='right arrow-container' 
                    onClick={()=>this.moveSlider()}
                    style={this.state.isScrolled ? {visibility: 'hidden'} : {}}>
                    &#x276F;
                </div>
            </div>
        )
    }
}