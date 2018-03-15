import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const $sneakerstopBlue = '#';

export default class ActionButton extends Component {
    
    static propTypes = {
        orientation: PropTypes.string.isRequired, //left or right
        text: PropTypes.string.isRequired,
        inverse: PropTypes.bool.isRequired,
        url: PropTypes.string.isRequired,
    }

    render = () => {
        return (
            <Link
                to={this.props.url} 
                className={`sneakerstop-action-button ${this.props.inverse ? 'inverse' : ''}`}>
                    {this.props.orientation === 'left' ? (
                        <div className='left-button'>&#8249;</div>
                    ) : null}
                    <span>{this.props.text}</span>
                    {this.props.orientation === 'right' ? (
                        <div className='right-button'>&#8250;</div>
                     ) : null}
            </Link>
        )
    }
}