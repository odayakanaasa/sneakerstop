import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';

import NavBar from './components/elements/NavBar';
import MobileNav from './components/elements/MobileNav';
import Home from './components/pages/Home';
import Cart from './components/pages/Cart';
import Dashboard from './components/pages/Dashboard';
import ProductCollection from './components/pages/ProductCollection';
import Product from './components/pages/Product';
import AddProduct from './components/pages/AddProduct';
import SignUpPage from './components/pages/SignUpPage';
import LogInPage from './components/pages/LogInPage';
import SearchResults from './components/pages/SearchResults';
import Footer from './components/elements/Footer';

import Callback from './utils/auth/Callback';
import Auth from './utils/auth/Auth';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
}

class App extends Component {

    constructor() {
        super();
        this.state = {
            mobileNavOpen: false,
        }
    }

    toggleMobileNav = () => {
        this.state.mobileNavOpen ? this.setState({mobileNavOpen: false}) : this.setState({mobileNavOpen: true})
    }

    render = () => (
        <div>
            <NavBar username={auth.getUsername()} toggleMobileNav={this.toggleMobileNav} />
            <MobileNav username={auth.getUsername()} open={this.state.mobileNavOpen}/>
            <div className='page-content'>    
                <Route exact path='/' render = {() => <Redirect to='/home'/>}/>
                <Route path='/home' component = {Home}/>
                <Route exact path='/products' component = {ProductCollection}/>
                <Route path='/products/:id' render = {() => <Product username={auth.getUsername()}/>}/>
                <Route path='/cart' render = {() => <Cart username={auth.getUsername()}/>}/>
                <Route path='/dashboard' render = {() => <Dashboard/>}/>
                <Route path='/addproduct' render = {() => <AddProduct/>}/>
                <Route path='/search/:terms' render = {()=><SearchResults/>}/>
            </div>
            <Route path='/login' render = {() => <LogInPage username={auth.getUsername()} login={auth.login}/>}/>
            <Route path='/signup' render = {() => <SignUpPage username={auth.getUsername()} signup={auth.signup}/>}/>
            <Footer isAdmin={auth.isAdmin()} username={auth.getUsername()}/>
        </div>
    );
}

export default withRouter(App);
