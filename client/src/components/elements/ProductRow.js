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
            atBeginning: false,
            atEnd: false,
            sliderOffset: '0px',
        }
    }

    moveSlider = () => {

    }

    //sets of 4-5 products
    //each set gets a sneakerstop-product-thumbnails container (display:flex)
    //thumbnails in set are 

    render = () => {
        let set1 = this.props.products.slice(0,5);
        let set2 = this.props.products.slice(5,10);

        return (
            <div className='sneakerstop-product-row'>
                <div 
                    className='left arrow-container' 
                    onClick={()=>this.moveSlider('left')} 
                    style={this.state.atBeginning ? {visibility: 'hidden'}: {}}>
                    &#x276E;
                </div>
                <div className='sneakerstop-product-thumbnails-container'>
                    <div className='sneakerstop-product-thumbnails'>

                        <div className='sneakerstop-product-thumbnail-set'>
                            {set1.map(product => (
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
                        <div className='sneakerstop-product-thumbnail-set'>
                            {set2.map(product => (
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
                    onClick={()=>this.moveSlider('right')}
                    style={this.state.atEnd ? {visibility: 'hidden'} : {}}>
                    &#x276F;
                </div>
            </div>
        )
    }
}