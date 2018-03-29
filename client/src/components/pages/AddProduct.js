import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import uuidv1 from 'uuid';
import { API_ROOT } from '../../utils/api_config';
import { generateId } from '../../utils/uuid-generator';

const brands = ['Adidas', 'Air Jordan', 'Converse', 'Nike', 'Puma', 'Vans'];
const groups = ['Men','Women','Kids'];
const categories = ['Shoes','Clothing','Accessories'];
const shoeCategories = ['Basketball','Running','Lifestyle','Tennis','Soccer','Skateboarding','Cleats','Boots'];
const clothingCategories = ['Outerwear','Shirts','Hoodies & Sweatshirts','Socks','Pants','Shorts','Swim'];
const accessoryCategories = ['Hats','Gloves','Sunglasses','Bags & Backpacks','Watches'];

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
            image1: undefined,
            image2: undefined,
            image3: undefined,
            image4: undefined,
            formValid: false,
        }
    }

    async handleSubmit(event) {
        event.preventDefault();

        if(this.state.image1 && this.state.image2 && this.state.image3 && this.state.image4) {
            let images = [
                this.state.image1,
                this.state.image2,
                this.state.image3,
                this.state.image4,
            ]
            //upload images

            //add product to database
            try {
                await axios.post(`${API_ROOT}/products`,{
                    //product data here
                });
                this.props.router.push('/home');            
            } catch (err) {
                console.log('DELETE request error:',err);
            }
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        //this.setState({event.target.name: event.target.value});
    }

    handleFileChoice = (event) => {
        event.preventDefault();
        if(this.checkFileType(event.target.files[0])) {
            this.setState({[event.target.name]: event.target.files[0]});            
        }
    }

    checkFileType = () => {

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

    render = () => {
        return (
            <div className='add-product-page'>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} placeholder='Name'/>
                        Brand
                    <select onChange={this.handleChange}>
                        {brands.map(brand => <option>{brand}</option>)}
                    </select>
                        Group
                    <select onChange={this.handleChange}>
                        {groups.map(group => <option>{group}</option>)}
                    </select>
                        Category
                    <select onChange={this.handleChange}>
                        {categories.map(type => <option>{type}</option>)}
                    </select>
                        Subcategory
                    <select onChange={this.handleChange}>
                        {this.renderSubcategories()}
                    </select>
                        Price
                    $<input onChange={this.handleChange} type='number' placeholder='$' min={0} max={499.99}/>
                    Image 1
                    <input type='file' name='image1' onChange={this.handleFileChoice}/>
                    <span className='err-msg'>{}</span>
                    Image 2
                    <input type='file' name='image2' onChange={this.handleFileChoice}/>
                    <span className='err-msg'>{}</span>
                    Image 3
                    <input type='file' name='image3' onChange={this.handleFileChoice}/>
                    <span className='err-msg'>{}</span>
                    Image 4
                    <input type='file' name='image4' onChange={this.handleFileChoice}/>
                    <span className='err-msg'>{}</span>
                </form>
                <button type='submit'>Add Product</button>
            </div>
        );
    } 
}