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
            scrollPos: 0,
        }
    }

    moveSliderRight = () => {
        let currentScrollPos = this.state.scrollPos;
        this.setState({scrollPos: currentScrollPos-210});
    }

    moveSliderLeft = () => {
        let currentScrollPos = this.state.scrollPos;
        this.setState({scrollPos: currentScrollPos+210});
    }

    render = () => {
        return (
            <div className='sneakerstop-product-row'>
                <div 
                    className='left arrow-container' 
                    onClick={()=>this.moveSliderLeft()} 
                    style={this.state.scrollPos === 0 ? {visibility: 'hidden'} : {}}>
                    &#x276E;
                </div>
                <div className='sneakerstop-product-thumbnails-container'>
                    <div className='sneakerstop-product-thumbnails'>
                        <div 
                            className='sneakerstop-product-thumbnail-set' 
                            style={{marginLeft:`${this.state.scrollPos}px`}}>
                            {this.props.products.map(product => (
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
                    onClick={()=>this.moveSliderRight()}
                    style={this.state.scrollPos === 1000 ? {visibility: 'hidden'} : {}}>
                    &#x276F;
                </div>
            </div>
        )
    }
}