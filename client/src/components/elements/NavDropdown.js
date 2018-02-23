import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//import { categories,subcategories } from '../../utils/categories.js';

const groups = ['Men','Women','Kids'];
const categories = {
    'Shoes':[
        'Basketball','Running','Lifestyle','Tennis','Soccer','Skateboarding','Cleats','Boots'
    ],
    'Clothing':[
        'Outerwear','Shirts','Hoodies & Sweatshirts','Socks','Pants','Shorts','Swim'
    ],
    'Accessories':[
        'Hats','Gloves','Sunglasses','Bags & Backpacks','Watches'
    ],
}

export default class NavDropdown extends Component {
    
    static propTypes = {
        group: PropTypes.string.isRequired,
        setDropdownGroup: PropTypes.func.isRequired,
    }

    render = () => {
        if (this.props.group === '') {
            return null;
        } else {
            let plural = "Kids";
            if (this.props.group !== plural) {
                plural = this.props.group + "'s";
            }
            return (
                <div 
                    className='nav-dropdown'
                    onMouseEnter={()=>{this.props.setDropdownGroup(this.props.group)}}
                    onMouseLeave={()=>{this.props.setDropdownGroup('')}}>
                    {Object.keys(categories).map(category => (
                        <ul>
                            <li>
                                <Link to={`/products?group=${this.props.group.toLowerCase()}`
                                    +`&category=${category.toLowerCase()}`}>
                                    <h3>{category}</h3>
                                </Link>
                            </li>
                            {categories[category].map(subcategory => (
                                <li>
                                    <Link to={
                                        `/products?group=${this.props.group.toLowerCase()}`
                                            +`&category=${category.toLowerCase()}`
                                                +`&subcategory=${subcategory.toLowerCase()}`}>
                                        {subcategory}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link to={
                                    `/products/?group=${this.props.group.toLowerCase()}`
                                        +`&category=${category.toLowerCase()}`}>
                                    All {plural} {category}
                                </Link>
                            </li>
                            <li>
                                <Link to={
                                    `/products?category=${category.toLowerCase()}`}>
                                    All {category}
                                </Link>
                            </li>
                        </ul>
                    ))}
                </div>
            )
        }
    }
}