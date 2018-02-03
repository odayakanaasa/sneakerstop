import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hamburger from './Hamburger';
import NavDropdown from './NavDropdown';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {

    static propTypes = {
        toggleMobileNav: PropTypes.func.isRequired,
        username: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            searchInputValue: '',
            hamburgerOpen: false,
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
            this.props.history.push(`/search/${this.state.searchInputValue}`)
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
                    <ul>
                        <li>
                            <Link to='/login'> Log In </Link>
                        </li>
                        <li>
                            <Link to='/register'> Create an Account </Link>
                        </li>
                        <li>
                            <Link to='/lang'>
                                <img src={require('../../assets/images/icons/flag-usa.png')}/>
                            </Link>
                        </li>
                    </ul>
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
                            <img src={require('../../assets/images/icons/shopping-cart.png')}/>
                        </div>
                    </Link>
                </div>
            </div>
            <div 
                className='sneakerstop-hamburger-container' 
                onClick={()=> {
                    if (this.state.hamburgerOpen) {
                        this.setState({hamburgerOpen: false});
                        this.props.toggleMobileNav();
                    } else {
                        this.setState({hamburgerOpen: true});
                        this.props.toggleMobileNav();
                    } 
                }}>
                <Hamburger open={this.state.hamburgerOpen}/>
            </div>
            <NavDropdown 
                group={this.state.dropdownGroup} 
                setDropdownGroup={(group)=>this.setState({dropdownGroup: group})}/>
        </div>
    )
}