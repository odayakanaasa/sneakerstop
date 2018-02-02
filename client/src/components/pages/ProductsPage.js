import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_ROOT } from './../../utils/api_config';

export default class ProductsPage extends Component {

    static propTypes = {

	}

	static contextTypes = {
    	router: PropTypes.object,
    	location: PropTypes.object
	}


    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            title: '',
            products: [],
        }
    }

    async componentDidMount() {
        let group = this.context.router.route.match.params.group;
        if (group) {
            this.setState({filter: group});
        }
        try {
            let res = axios.get(`${API_ROOT}/products`);
            this.setState({products: res.data})
        } catch (err) {
            console.log('GET Request Error:',err);
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