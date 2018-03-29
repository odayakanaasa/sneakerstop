import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Footer extends Component {
    
    static propTypes = {
        isAdmin: PropTypes.bool.isRequired,
    }

    render = () => (
        <div className='footer'>
            <div className='row'>
                <div className='col-md-4 footer-nav'>
                    <ul className='left'>
                        <li><Link to='#'><h3>Customer Service</h3></Link></li>
                        <li><Link to='#'>Track a Shipment</Link></li>
                        <li><Link to='#'>FAQ</Link></li>
                        <li><Link to='#'>Contact Us</Link></li>
                        <li><Link to='#'>Gift Cards</Link></li>
                        <li><Link to='#'>Coupons</Link></li>
                        <li><Link to='#'>Returns</Link></li>
                    </ul>
                </div>
                <div className='col-md-4 footer-nav'>
                    <ul className='middle'>
                        <li><Link to='#'><h3>About</h3></Link></li>
                        <li><Link to='#'>Blog</Link></li>
                        <li><Link to='#'>Investors</Link></li>
                        <li><Link to='#'>Careers</Link></li>
                        {this.props.isAdmin ? (
                            <li>
                                <Link to='/dashboard'>Dashboard</Link>
                            </li>
                        ) : null}
                    </ul>
                </div>
                <div className='col-md-4 social-media'>
                    <a href='http://www.facebook.com/sneakerstop'>
                        <img src={require('../../assets/images/icons/facebook_white.png')} alt='Facebook'/>
                    </a>
                    <a href='http://www.twitter.com/sneakerstop'>
                        <img src={require('../../assets/images/icons/twitter_white.png')} alt='Twitter'/>
                    </a>
                    <a href='http://www.instagram.com/sneakerstop'>
                        <img src={require('../../assets/images/icons/instagram_white.png')} alt='Instagram'/>
                    </a>
                </div>
            </div>
            <hr/>
            <div className='col-md-12 copyright'>
                <span>Design &copy; 2018 Julian Hinsch. All rights reserved.</span>
            </div>
        </div>
    )
}
