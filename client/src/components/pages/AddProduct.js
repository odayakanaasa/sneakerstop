import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import uuidv1 from 'uuid';
import { API_ROOT } from '../../utils/api_config';

const brands = ['Adidas', 'Air Jordan', 'Converse', 'Nike', 'Puma', 'Vans'];
const groups = ['Men','Women','Kids'];
const categories = ['Shoes','Clothing','Accessories'];
const shoeCategories = ['Basketball','Running','Lifestyle','Tennis','Soccer','Skateboarding','Cleats','Boots'];
const clothingCategories = ['Outerwear','Shirts','Hoodies & Sweatshirts','Socks','Pants','Shorts','Swim'];
const accessoryCategories = ['Hats','Gloves','Sunglasses','Bags & Backpacks','Watches'];

//TODO: react DND tags for all of these???

export default class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.generateId(),
            name: '',
            brand: '',
            group: '',
            category: '',
            subcategory: '',
            price: '',
            image1uploadSuccessful: false,
            image2uploadSuccessful: false,
            image3uploadSuccessful: false,
            image4uploadSuccessful: false,
            formValid: false,
        }
    }
    
    static propTypes = {

    }

    generateId = () => {
	    let uuidv1 = require('uuid/v1');
        return uuidv1();
    }

    async uploadImage(event) {
        event.preventDefault();
        try {
            await axios.post(`${API_ROOT}/images/${this.state.id}`);
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

    handleUploadAttempt = () => {

    }

    renderSubcategories = () => {
        switch (this.state.category) {
            case 'Shoes':
                return shoeCategories.map(category => <option>{category})</option>);
            case 'Clothing':
                return clothingCategories.map(category => <option>{category})</option>);
            case 'Accessories':
                return accessoryCategories.map(category => <option>{category})</option>);
            default:
                return <option></option>
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
                    Category
                <select>
                    {categories.map(type => <option>{type}</option>)}
                </select>
                    Subcategory
                <select>
                    {this.renderSubcategories()}
                </select>
                    Price
                $<input onChange={this.handleChange} type='number' placeholder='$' min={0} max={499.99}/>
            </form>
            <form onSubmit={this.uploadImage}>
                Image 1
                <input type='file'/>
                Image 2
                <input type='file'/>
                Image 3
                <input type='file'/>
                Image 4
                <input type='file'/>
            </form>
            <button type='submit'>Add Product</button>
        </div>

    ) 
    
}