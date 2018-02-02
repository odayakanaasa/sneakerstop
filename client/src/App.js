import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';

import NavBar from './components/elements/NavBar';
import MobileNav from './components/elements/MobileNav';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import ProductsPage from './components/pages/ProductsPage';
import ProductPage from './components/pages/ProductPage';
import AddProduct from './components/pages/AddProduct';
import SignUpPage from './components/pages/SignUpPage';
import LogInPage from './components/pages/LogInPage';
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
            loggedInUserId: undefined,
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
                <Route exact path='/products' component = {ProductsPage}/>
                <Route path='/products/:group' component = {ProductsPage}/>
                <Route path='/products/:group/:id' component = {ProductPage}/>
                <Route path='/dashboard' render = {() => <Dashboard/>}/>
                <Route path='/addproduct' render = {() => <AddProduct/>}/>
            </div>
            <Route path='/login' render = {() => <LogInPage username={auth.getUsername} login={auth.login}/>}/>
            <Route path='/signup' render = {() => <SignUpPage username={auth.getUsername} signup={auth.signup}/>}/>
            <Footer isAdmin={auth.isAdmin()}/>
        </div>
    );
}

export default withRouter(App);
