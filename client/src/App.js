import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import { API_ROOT } from './utils/api_config';

import NavBar from './components/elements/NavBar';
import MobileNav from './components/elements/MobileNav';
import Home from './components/pages/Home';
import Cart from './components/pages/Cart';
import Checkout from './components/pages/Checkout';
import Dashboard from './components/pages/Dashboard';
import ProductCollection from './components/pages/ProductCollection';
import Product from './components/pages/Product';
import AddProduct from './components/pages/AddProduct';
import SignUpPage from './components/pages/SignUpPage';
import LogInPage from './components/pages/LogInPage';
import SearchResults from './components/pages/SearchResults';
import Footer from './components/elements/Footer';

import Auth from './utils/auth/Auth';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    /*if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }*/
    auth.handleAuthentication();
}

const ScrollToTop = () => {
    window.scrollTo(0, 0);
    return null;
};

class App extends Component {

    constructor() {
        super();
        this.state = {
            mobileNavOpen: false,
            cartItems: [],
            selectedShippingMethod: undefined,
            username: undefined,
        }
    }

    componentDidMount() {
        this.getCartItems();
        console.log(localStorage.getItem('username'));
        this.setState({username: localStorage.getItem('username')});    
    }

    getCartItems = async () => {
        let username = localStorage.getItem('username');
        if(username) {
            //retrieve cart from API
            try {
                let result = await axios.get(`${API_ROOT}/cartitems/${username}`);
                this.setState({cartItems: result.data});
                return result.data;
            } catch(err) {
                console.log(err);
            }
        } else {
            //try to retrieve cart from localStorage
            let cartFromStorage = localStorage.getItem('sneakerstop_cart');
            console.log(cartFromStorage);
            if (cartFromStorage!==null) {
                let parsedCart = JSON.parse(cartFromStorage);
                console.log(parsedCart);
                this.setState({cartItems: parsedCart});
            }
        }
    }

    toggleMobileNav = () => {
        this.state.mobileNavOpen ? this.setState({mobileNavOpen: false}) : this.setState({mobileNavOpen: true})
    }

    handleSearch = (query) => {
        this.props.history.push(`/search?q=${query}`);
    }

    render = () => {
        console.log(auth.isAuthenticated());
        return (
            <div>
                <NavBar
                    loggedIn={auth.isAuthenticated()}
                    toggleMobileNav={this.toggleMobileNav}
                    mobileNavOpen={this.state.mobileNavOpen}
                    cartItemCount={this.state.cartItems.length}
                    handleSearch={this.handleSearch}
                    logout={auth.logout}/>
                <MobileNav 
                    toggleMobileNav={this.toggleMobileNav}
                    open={this.state.mobileNavOpen}
                    cartItemCount={this.state.cartItems.length}
                    handleSearch={this.handleSearch}
                    logout={auth.logout}/>
                <div className='page-content'>
                    <Route component={ScrollToTop}/>  
                    <Route exact path='/' render = {() => 
                        <Redirect to='/home'/>
                    }/>
                    <Route path='/home' component = {Home}/>
                    <Route exact path='/products' component = {ProductCollection}/>
                    <Route path='/products/:id' render = {() => 
                        <Product 
                            getCartItems={this.getCartItems}/>
                    }/>
                    <Route path='/cart' render = {() => 
                        <Cart 
                            cartItems={this.state.cartItems}
                            getCartItems={this.getCartItems}/>
                    }/>
                    <Route path='/checkout' render = {() => 
                        <Checkout 
                            cartItems={this.state.cartItems}
                            selectedShippingMethod={this.state.selectedShippingMethod}/>
                    }/>
                    <Route path='/dashboard' render = {() => 
                        <Dashboard/>
                    }/>
                    <Route path='/addproduct' render = {() => 
                        <AddProduct/>
                    }/>
                    <Route path='/search' component={SearchResults}/>
                </div>
                <Route path='/login' render = {() => 
                    <LogInPage 
                        login={auth.login}/>
                }/>
                <Route path='/register' render = {() => 
                    <SignUpPage 
                        signup={auth.signup}/>
                }/>
                <Route path='/callback' render = {()=> {
                    handleAuthentication();
                    return (
                        <Redirect to='/home'/>
                    )
                }}/>
                <Footer 
                    isAdmin={auth.isAdmin()}/>
            </div>
        )
    }
}

export default withRouter(App);
