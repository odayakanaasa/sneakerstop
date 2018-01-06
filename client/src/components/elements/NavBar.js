import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hamburger from './Hamburger';
import NavDropdown from './NavDropdown';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {

    static propTypes = {

    }

    constructor(props) {
        super(props);
        this.state = {
            searchInputValue: '',
            open: false,
            dropdownGroup: '',
        }
    }

    handleChange = (event) => {
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
        <div className='navbar'>
            <div className='logo-container'><Link to='/home'> SneakerStop </Link></div>
            <div className='nav-container'>
                <div className='navbar-top'>
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
                <div className='navbar-bottom'>
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
                    <div className='search'>
                        <form onSubmit={this.handleSubmit}>
                            <input 
                                onChange={this.handleChange} 
                                placeholder={'Search...'} 
                                value={this.state.searchInputValue}/>
                        </form>
                    </div>
                    <Link to='/cart'>
                        <div className='cart'>
                            <img src={require('../../assets/images/icons/shopping-cart.png')}/>
                        </div>
                    </Link>
                </div>
            </div>
            <div 
                className='hamburger-container' 
                onClick={()=>this.state.open ? this.setState({open: false}) : this.setState({open: true})}>
                <Hamburger open={this.state.open}/>
            </div>
            <NavDropdown 
                group={this.state.dropdownGroup} 
                setDropdownGroup={(group)=>this.setState({dropdownGroup: group})}/>
        </div>
    )
}