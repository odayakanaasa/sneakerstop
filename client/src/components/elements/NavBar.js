import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hamburger from './Hamburger';
import NavDropdown from './NavDropdown';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {

    static propTypes = {
        mobileNavOpen: PropTypes.bool.isRequired,
        toggleMobileNav: PropTypes.func.isRequired,
        loggedIn: PropTypes.bool.isRequired,
        username: PropTypes.string.isRequired,
        logout: PropTypes.func.isRequired,
        cartItemCount: PropTypes.number.isRequired,
        handleSearch: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            searchInputValue: '',
            dropdownGroup: '',
        }
    }

    handleInputChange = (event) => {
        event.preventDefault();        
        this.setState({searchInputValue: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.searchInputValue!=='') {
            this.props.handleSearch(this.state.searchInputValue);        
        }
        this.setState({searchInputValue: ''});
    }

    render = () => (
        <div className='sneakerstop-navbar'>
            <div className='sneakerstop-logo-container'>
                <h1 className='logo sneakerstop-logo'>
                    <Link to='/home'> SneakerStop </Link>
                </h1>
            </div>
            <div className='sneakerstop-nav-container'>
                <div className='sneakerstop-navbar-top'>        
                    {this.props.loggedIn ? (
                        <ul>
                            <li>
                                Welcome, {this.props.username}
                            </li>
                            <li>
                                <span
                                    className='sneakerstop-logout-link'
                                    onClick={()=>this.props.logOut()}>Log Out</span>
                            </li>
                        </ul>
                    ) : (
                        <ul>
                            <li>
                                <Link to='/login'> Log In </Link>
                            </li>
                            <li>
                                <Link to='/register'> Create an Account </Link>
                            </li>
                        </ul>
                    )}
                </div>
                <div className='sneakerstop-navbar-bottom'>
                    <ul>
                        <li onMouseEnter={()=>{this.setState({dropdownGroup:'Men'})}} 
                            onMouseLeave={()=>{this.setState({dropdownGroup:''})}}
                            style={{
                                backgroundColor: (this.state.dropdownGroup==='Men' ? 'white' : 'transparent'), 
                                color: (this.state.dropdownGroup==='Men' ? 'black' : 'white')
                            }}>
                            <a> Men </a>
                        </li>
                        <li onMouseEnter={()=>{this.setState({dropdownGroup:'Women'})}} 
                            onMouseLeave={()=>{this.setState({dropdownGroup:''})}}
                            style={{
                                backgroundColor: (this.state.dropdownGroup==='Women' ? 'white' : 'transparent'), 
                                color: (this.state.dropdownGroup==='Women' ? 'black' : 'white')
                            }}>
                            <a> Women </a>
                        </li>
                        <li onMouseEnter={()=>{this.setState({dropdownGroup:'Kids'})}}
                            onMouseLeave={()=>{this.setState({dropdownGroup:''})}}
                            style={{
                                backgroundColor: (this.state.dropdownGroup==='Kids' ? 'white' : 'transparent'), 
                                color: (this.state.dropdownGroup==='Kids' ? 'black' : 'white')
                            }}>
                            <a> Kids </a>
                        </li>
                    </ul>
                    <div className='sneakerstop-search'>
                        <form onSubmit={this.handleSubmit}>
                            <input 
                                onChange={this.handleInputChange} 
                                placeholder={'Search...'} 
                                value={this.state.searchInputValue}/>
                        </form>
                    </div>
                    <Link to='/cart'>
                        <div className='sneakerstop-cart-icon-container'>
                            <img src={require('../../assets/images/icons/shopping-cart.png')} alt='shopping cart'/>
                        </div>
                        <div className='sneakerstop-cart-item-count'>
                            {this.props.cartItemCount}
                        </div>
                    </Link>
                </div>
            </div>
            <div 
                className='sneakerstop-hamburger-container' 
                onClick={()=> {
                    if (this.props.mobileNavOpen) {
                        this.props.toggleMobileNav();
                    } else {
                        this.props.toggleMobileNav();
                    } 
                }}>
                <Hamburger open={this.props.mobileNavOpen}/>
            </div>
            <NavDropdown 
                group={this.state.dropdownGroup} 
                setDropdownGroup={group => this.setState({dropdownGroup: group})}/>
        </div>
    )
}