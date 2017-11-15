import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';

import Header from './components/elements/Header';
import Home from './components/pages/Home';
import Products from './components/pages/Products';
import Product from './components/pages/Product';
import SignUpPage from './components/pages/SignUpPage';
import LogInPage from './components/pages/LogInPage';
import Footer from './components/elements/Footer';

class App extends Component {
  render = () => (
    <div>
      <Header/>
      <Route exact path='/' render={<Redirect to='/home'/>}/>
      <Route path='/home' component={Home}/>
      <Route exact path='/products' component={Products}/>
      <Route path='/products/:id' component={Product}/>
      <Route path='/login' component={LogInPage}/>
      <Route path='/signup' component={SignUpPage}/>
      <Footer/>
    </div>
  );
}

export default withRouter(App);
