import React from 'react';
import { Link  } from 'react-router-dom';

const Footer = () => (
    <div className='footer'>
        <div className='row'>
            <div className='col-md-12 social-media-nav'>
                <a href='http://www.facebook.com'>
                    <img src='../../assets/icons/facebook.png'/>
                </a>
                <a href='http://www.twitter.com'>
                    <img src='../../assets/icons/twitter.png'/>
                </a>
                <a href='http://www.instagram.com'>
                    <img src='../../assets/icons/instagram.png'/>
                </a>
            </div>
        </div>
        <div className='col-md-6'>
            <ul>
                <li><Link to='/customerservice'><h3>Customer Service</h3></Link></li>
                <li><Link to='/tracking'>Track a Shipment</Link></li>
                <li><Link to='/faq'>FAQ</Link></li>
                <li><Link to='/contact'>Contact Us</Link></li>
                <li><Link to='/giftcards'>Gift Cards</Link></li>
                <li><Link to='/coupons'>Coupons</Link></li>
                <li><Link to='/returns'>Returns</Link></li>
            </ul>
        </div>
        <div className='col-md-6'>
            <ul>
                <li><Link to='/about'><h3>About</h3></Link></li>
                <li><Link to='/blog'>Blog</Link></li>
                <li><Link to='/investors'>Investors</Link></li>
                <li><Link to='/careers'>Careers</Link></li>
            </ul>
        </div>
        <div className='col-md-12 copyright'>
            <span>Web design &copy; 2018 Julian Hinsch. All rights reserved.</span>
        </div>
    </div>
)

export default Footer;