import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export default class MobileNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchInputValue: "",
        }
    }

    static propTypes = {
        username: PropTypes.string.isRequired,
        open: PropTypes.bool.isRequired,
        handleInputChange: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
    }
    
    render = () => !this.props.open ? null : (
        <div className='mobile-nav-container'>
            <div className='mobile-nav'>
                <ul>
                    <li>
                        <Link to='/products/men'>Men</Link>
                    </li>
                    <li>
                        <Link to='/products/women'>Women</Link>
                    </li>
                    <li>
                        <Link to='/products/kids'>Kids</Link>
                    </li>
                    <li>
                        <Link to='/login'> Log In </Link>
                    </li>
                    <li>
                        <Link to='/register'> Create an Account </Link>
                    </li>
                    <li>
                        <Link to='/cart'>Cart</Link>
                    </li>
                    <li>
                        <Link to='/lang'><img src={require('../../assets/images/icons/flag-usa.png')}/></Link>
                    </li>
                </ul>
                <div className='search'>
                    <form onSubmit={this.props.handleSubmit}>
                        <input 
                            onChange={this.props.handleInputChange} 
                            placeholder={'Search...'} 
                            value={this.state.searchInputValue}/>
                    </form>
                </div>
            </div>
        </div>
    )
}