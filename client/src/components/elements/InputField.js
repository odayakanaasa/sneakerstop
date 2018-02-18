import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputField extends Component {

	static propTypes = {
		handleInputChange: PropTypes.func.isRequired,
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		errMsg: PropTypes.string.isRequired,
  		placeholder: PropTypes.string,
  		onBlur: PropTypes.func,
  		autofocus: PropTypes.bool,
  		onFocus: PropTypes.func,
  		value: PropTypes.string,
	}

	render = () => (
        <div className='input-container'>
            <input className={`inputfield ${!this.props.errMsg ==='' ? 'invalid' : ''}`}
                name={this.props.name}
                type={this.props.type}
                placeholder={this.props.placeholder}
                onChange={event => this.props.handleInputChange(event.target.value)} 
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                autoFocus={this.props.autofocus}
                value={this.props.value} />
            <div className="error-message">{this.props.errMsg}</div>
        </div>
    )
}
