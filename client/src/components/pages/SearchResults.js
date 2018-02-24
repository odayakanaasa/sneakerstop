import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_ROOT } from '../../utils/api_config';
import queryString from 'query-string';

export default class SearchResults extends Component {

    static contextTypes = {
    	router: PropTypes.object,
    	location: PropTypes.object
    }

    static propTypes = {

    }

    constructor(props) {
        super(props);
        this.state = {
            results: [],
        }
    }

    async componentWillMount(){
        try {
            let queries = queryString.parse(this.context.router.history.location.search);
            let result = await axios.get(`${API_ROOT}/products/search/${queries.q}`);
            console.log(result)
            this.setState({results: result.data});
        } catch (err) {
            console.log(err);
        }
    }

    render = () => (
        <div className='sneakerstop-search-results'>

        </div>
    )
}