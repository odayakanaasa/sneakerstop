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
        handleSearch: PropTypes.func.isRequired,
        cartItemCount: PropTypes.number.isRequired,
    }

    handleInputChange = (event) => {
        this.setState({searchInputValue: event.target.value});
    }
    
    render = () => !this.props.open ? null : (
        <div className='mobile-nav-container'>
            <div className='mobile-nav'>
                <ul>
                    <li>
                        <Link to='/products?group=men'>Men</Link>
                    </li>
                    <li>
                        <Link to='/products?group=women'>Women</Link>
                    </li>
                    <li>
                        <Link to='/products?group=kids'>Kids</Link>
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
                </ul>
                <div className='search'>
                    <form onSubmit={this.props.handleSearch}>
                        <input 
                            onChange={this.handleInputChange} 
                            placeholder={'Search...'} 
                            value={this.state.searchInputValue}/>
                    </form>
                </div>
            </div>
        </div>
    )
}