import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_ROOT } from '../../utils/api_config';

const brands = ['Adidas', 'Air Jordan', 'Converse', 'Nike', 'Puma', 'Vans'];
const groups = ['Men','Women','Kids'];
const apparelTypes = ['Shoes', 'Clothing', 'Glasses'];

export default class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            brand: '',
            price: '',
            uploadSuccessful: false,
        }
    }
    
    static propTypes = {

    }

    async uploadImage(event) {
        event.preventDefault();
        try {
            await axios.post(`${API_ROOT}/upload`);
            this.setState({uploadSuccessful: true});
        } catch (err) {
            console.log('Image upload error:',err);
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        //this.setState({event.target.name: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.uploadSuccessful) {
             //make api POST call
            try {
                await axios.post(`${API_ROOT}/products`);
                this.props.router.push('/home');            
            } catch (err) {
                console.log('DELETE request error:',err);
            }
        }
    }

    render = () => (
        <div className='add-product-page'>
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} placeholder='Name'/>
                Brand
                <select>
                    {brands.map(brand => <option>{brand}</option>)}
                </select>
                Group
                <select>
                    {groups.map(group => <option>{group}</option>)}
                </select>
                Apparel Type
                <select>
                    {apparelTypes.map(type => <option>{type}</option>)}
                </select>
                $<input onChange={this.handleChange} type='number' placeholder='$' min={0} max={499.99}/>
                <button type='submit'>Add Product</button>
            </form>
            <form onSubmit={this.uploadImage}>
                Image
                <input type='file'/>
            </form>
        </div>

    ) 
    
}