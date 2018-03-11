import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

export default class Dashboard extends Component {

    //merchant

        //my products - table

        //my sales - line graph?

        //add a product

    //admin

        //total inventory

        //total sales - line graph? number?
        

    render = () => {
        if(!(this.props.loggedin && this.props.isAdmin)) {
            return (
                <Redirect to='/home'/>
            )
        } else {
            return (
                <div className='dashboard-page-container'>
                    <h1> Dashboard </h1>
                    <div className='dropdown'>
                        <h2>My Products</h2>
                    </div>
                    <div className='dropdown'>
                        <h2>My Products</h2>
                    </div>
                </div>
            )            
        }
    }
}