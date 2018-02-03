import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class NavDropdown extends Component {
    
    static propTypes = {
        group: PropTypes.string.isRequired,
        setDropdownGroup: PropTypes.func.isRequired,
    }

    render = () => {
        let plural = "Kids"
        if (this.props.group !== plural) {
            plural = this.props.group + "'s";
        }
        if (this.props.group !== '') {
            return (
                <div 
                    className='nav-dropdown'
                    onMouseEnter={()=>{this.props.setDropdownGroup(this.props.group)}}
                    onMouseLeave={()=>{this.props.setDropdownGroup('')}}>
                    <ul>
                        <li><Link to={`/products/${this.props.group}/shoes`}><h3>Shoes</h3></Link></li>
                        <li><Link to={`/products/${this.props.group}/shoes`}>Basketball</Link></li>
                        <li><Link to='/'>Running</Link></li>
                        <li><Link to='/'>Lifestyle</Link></li>
                        <li><Link to='/'>Tennis</Link></li>
                        <li><Link to='/'>Soccer</Link></li>
                        <li><Link to='/'>Skateboarding</Link></li>
                        <li><Link to='/'>Cleats</Link></li>
                        <li><Link to={`/products/${this.props.group}/boots`}>Boots</Link></li>
                        <li><Link to='/'>{`All ${plural} Shoes`}</Link></li>
                        <li><Link to='/products/shoes'>All Shoes</Link></li>
                    </ul>
                    <ul>
                        <li><Link to={`/products/${this.props.group}/clothing`}><h3>Clothing</h3></Link></li>
                        <li><Link to={`/products/${this.props.group}/clothing/outerwear`}>Outerwear</Link></li>
                        <li><Link to={`/products/${this.props.group}/clothing/shirts`}>Shirts</Link></li>
                        <li><Link to={`/products/${this.props.group}/clothing/sweatshirts`}>Hoodies &amp; Sweatshirts</Link></li>
                        <li><Link to={`/products/${this.props.group}/clothing/socks`}>Socks</Link></li>
                        <li><Link to={`/products/${this.props.group}/clothing/pants`}>Pants</Link></li>
                        <li><Link to={`/products/${this.props.group}/clothing/shorts`}>Shorts</Link></li>
                        <li><Link to={`/products/${this.props.group}/clothing/swim`}>Swim</Link></li>
                        <li><Link to={`/products/${this.props.group}/clothing`}>{`All ${plural} Clothing`}</Link></li>
                        <li><Link to='/products/clothing'>All Clothing</Link></li>
                    </ul>
                    <ul>
                        <li><Link to={`/products/${this.props.group}/accessories`}><h3>Accessories</h3></Link></li>
                        <li><Link to={`/products/${this.props.group}/accessories/hats`}>Hats</Link></li>
                        <li><Link to={`/products/${this.props.group}/accessories/gloves`}>Gloves</Link></li>
                        <li><Link to={`/products/${this.props.group}/accessories/sunglasses`}>Sunglasses</Link></li>
                        <li><Link to={`/products/${this.props.group}/accessories/bags`}>Bags &amp; Backpacks</Link></li>
                        <li><Link to={`/products/${this.props.group}/accessories/watches`}>Watches</Link></li>
                        <li><Link to={`/products/${this.props.group}/accessories`}>{`All ${plural} Accessories`}</Link></li>
                        <li><Link to='/products/accessories'>All Accessories</Link></li>
                    </ul>
                </div>
            )
        }
        return null;
    }
}