import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';

import NavBar from './components/elements/NavBar';
import Home from './components/pages/Home';
import ProductsPage from './components/pages/ProductsPage';
import ProductPage from './components/pages/ProductPage';
import SignUpPage from './components/pages/SignUpPage';
import LogInPage from './components/pages/LogInPage';
import Footer from './components/elements/Footer';

class App extends Component {
  render = () => (
    <div>
      <NavBar/>
      <Route exact path='/' render = {() => (<Redirect to='/home'/>)}/>
      <Route path='/home' component = {Home}/>
      <Route exact path='/products' component = {ProductsPage}/>
      <Route path='/products/:id' component = {ProductPage}/>
      <Route path='/login' component = {LogInPage}/>
      <Route path='/signup' component = {SignUpPage}/>
      <Footer/>
    </div>
  );
}

export default withRouter(App);
