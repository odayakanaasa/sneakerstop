import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

export default class ProductPage extends Component {

    static contextTypes = {
    	router: PropTypes.object,
    	location: PropTypes.object
    }
    
    constructor(props) {
        super(props);
        this.state = {
            selectedImage: 1,
        }
    }
    
    generateId = () => {
	    let uuidv1 = require('uuid/v1');
        return uuidv1();
    }

    componentDidMount() {
        let id = this.context.router.route.match.params.id;
        //make api call here
    }

    renderThumbnails = () => {
        let nums = [1,2,3,4];
        let selectedImage = this.state.selectedImage;
        return nums.map((num)=>(
            <img 
                key={this.generateId()}
                onClick={()=>this.setState({selectedImage: num})}
                src={require(`../../assets/images/products/${this.context.router.route.match.params.id}/${num}.jpg`)}/>            
        ))
    }

    render = () => (
        <div className='product-layout-container'>
            <div className='row'>
                <div className='col-md-8'>
                    <div className='images-container'>
                        <img 
                            className='main' 
                            src={require(`../../assets/images/products/${this.context.router.route.match.params.id}/${this.state.selectedImage}.jpg`)}/>
                        <div className='thumbnail-container'>
                            {this.renderThumbnails()}
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='product-info'>
                        <h1> Air Jordan 5 Retro Blue Suede </h1>
                        <h2> Air Jordan </h2>
                        <form>
                            <div>
                                <span> Size </span>
                                <select>
                                    <option> 7 </option>
                                    <option> 7.5 </option>
                                    <option> 8 </option>
                                    <option> 8.5 </option>
                                    <option> 9 </option>
                                    <option> 9.5 </option>
                                    <option> 10 </option>
                                    <option> 10.5 </option>
                                    <option> 11 </option>
                                    <option> 11.5 </option>
                                    <option> 12 </option>
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
    );
}