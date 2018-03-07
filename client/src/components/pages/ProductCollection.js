import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { generateId } from '../../utils/uuid-generator';
import { API_ROOT } from './../../utils/api_config';
import queryString from 'query-string';
import ProductRow from '../elements/ProductRow';

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

    componentWillReceiveProps() {
        this.getProducts();
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts = async () => {
        try {
            let queries = queryString.parse(this.context.router.history.location.search);
            let url = `${API_ROOT}/products`;
            if (queries.group || queries.category || queries.subcategory) {
                url += '?'
                let first = true;
                if (queries.group) {
                    if (!first) {
                        url+='&';
                    }
                    first = false;                                  
                    url+=`group=${queries.group}`
                }
                if (queries.category) {
                    if (!first) {
                        url+='&';
                    }
                    first = false; 
                    url+=`category=${queries.category}`
                }
                if (queries.subcategory) {
                    if (!first) {
                        url+='&';
                    }
                    first = false; 
                    url+=`subcategory=${queries.subcategory}`
                }
            }
            let result = await axios.get(url);
            this.setState({products: result.data});
        } catch (err) {
            console.log(err);
        }
    }

    renderProducts = (products) => products.map(product => (
        <Link key={generateId()} to={`/products/${product.id}`}>
            <div className='sneakerstop-product-thumbnail'>
                <img 
                    src={`http://res.cloudinary.com/djtc1xatx/image/upload/v1517870233/${product.id}-1.jpg`}
                    alt={product.name}/>
                <h3>{product.name}</h3>
                <h4>${product.price}</h4>
            </div>
        </Link>
    ))
    
    render = () => (
        <div>
            <div className='sneakerstop-products-collection-header'>
                {this.state.title}
            </div>
            <div className='sneakerstop-products-container'>
            <h2> Products </h2>
            {this.state.products.length===0 ? (
                <div>
                    Loading...
                </div>
            ) : this.renderProducts(this.state.products)}       
        </div>
        </div>
    );
}