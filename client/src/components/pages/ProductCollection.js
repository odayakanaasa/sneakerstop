import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { generateId } from '../../utils/uuid-generator';
import { API_ROOT } from './../../utils/api_config';
import queryString from 'query-string';
import ProductRow from '../elements/ProductRow';

export default class ProductsPage extends Component {

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

    getQueries = () => {
        return queryString.parse(this.context.router.history.location.search);
    }

    getTitle = () => {
        let queries = this.getQueries();
        if (queries.group || queries.category || queries.subcategory) {
            let title = '';            
            if (queries.group) {
                title+=`${queries.group.charAt(0).toUpperCase() + queries.group.slice(1)}`;
                if (queries.group==='men' || queries.group==='women') {
                    title+=`'s`;
                } else {
                    title+=`'`;
                }
            }
            if (queries.subcategory) {
                title+=` ${queries.subcategory.charAt(0).toUpperCase() + queries.subcategory.slice(1)}`
            }
            if (queries.category) {
                if (!queries.subcategory || queries.category === 'shoes') {
                    title+=` ${queries.category.charAt(0).toUpperCase() + queries.category.slice(1)}`                                    
                }
            }
            return title;
        } else {
            return 'All Products';
        }
    }

    getProducts = async () => {
        try {
            let queries = this.getQueries();
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
                <h1>{this.getTitle()}</h1>
            </div>
            <div className='sneakerstop-products-collection-container'>
                {this.state.products.length===0 ? (
                    <div>
                        Loading...
                    </div>
                ) : (
                    this.renderProducts(this.state.products)
                )}                
            </div>
        </div>
    );
}