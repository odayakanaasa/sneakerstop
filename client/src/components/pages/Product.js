import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { generateId } from './../../utils/uuid-generator';
import { API_ROOT } from './../../utils/api_config';

const sizes = [7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12];

export default class Product extends Component {

    static contextTypes = {
    	router: PropTypes.object,
    	location: PropTypes.object
    }
    
    constructor(props) {
        super(props);
        this.state = {
            productData: undefined,
            selectedImage: 1,
        }
    }

    async componentDidMount() {
        let id = this.context.router.route.match.params.id;
        let result = await axios.get(`${API_ROOT}/products/${id}`);
        console.log(result);
        this.setState({productData: result.data});
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

    render = () => !this.state.productData ? null : (
        <div className='sneakerstop-product-layout-container'>
            <div className='row'>
                <div className='col-md-8'>
                    <div className='sneakerstop-product-images-container'>
                        <img 
                            className='main' 
                            src={`http://res.cloudinary.com/djtc1xatx/image/upload/v1517870233/${this.state.productData.id}-${this.state.selectedImage}.jpg`}/>
                        <div className='thumbnail-container'>
                            {this.renderThumbnails()}
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='sneakerstop-product-info'>
                        <h1> {this.state.productData.name} </h1>
                        <h2> {this.state.productData.brand} </h2>
                        <h3> ${this.state.productData.price} </h3>
                        <form>
                            <div>
                                <span> Size </span>
                                <select>
                                    {sizes.map(size => <option key={generateId()}>{size}</option>)}
                                </select>
                            </div>
                            <div>
                                <button type='submit'> Add to Cart </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}