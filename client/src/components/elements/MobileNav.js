import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class MobileNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchInputValue: '',
        }
    }

    static propTypes = {
        username: PropTypes.string.isRequired,
        open: PropTypes.bool.isRequired,
        handleSearch: PropTypes.func.isRequired,
        cartItemCount: PropTypes.number.isRequired,
        toggleMobileNav: PropTypes.func.isRequired,
    }

    handleInputChange = (event) => {
        this.setState({searchInputValue: event.target.value});
    }
    
    render = () => !this.props.open ? null : (
        <div className='mobile-nav-container' onClick={this.props.toggleMobileNav}>
            <div className='mobile-nav'>
                <ul>
                    <li>
                        <Link to='/products?group=men' onClick={this.props.toggleMobileNav}>Men</Link>
                    </li>
                    <li>
                        <Link to='/products?group=women' onClick={this.props.toggleMobileNav}>Women</Link>
                    </li>
                    <li>
                        <Link to='/products?group=kids' onClick={this.props.toggleMobileNav}>Kids</Link>
                    </li>
                    <li>
                        <Link to='/login' onClick={this.props.toggleMobileNav}> Log In </Link>
                    </li>
                    <li>
                        <Link to='/register' onClick={this.props.toggleMobileNav}> Create an Account </Link>
                    </li>
                    <li>
                        <Link to='/cart' onClick={this.props.toggleMobileNav}>Cart</Link>
                    </li>
                </ul>
                <div className='search'>
                    <form onSubmit={()=>{
                            this.props.handleSearch;
                            this.props.toggleMobileNav;
                        }}>
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