import React, { Component } from 'react';

export default class ProductsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            title: '',
        }
    }

    
    render = () => (
        <div>
            <div className='products-header'>
                {this.state.title}
            </div>
            

        </div>
    );
}