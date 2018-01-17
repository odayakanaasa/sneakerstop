import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InputField from './../elements/InputField';

export default class LogInPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usernameText: '',
            passwordText: '',
            usernameErrMsg: '',
			passwordErrMsg: '',
        }
    }

    handleUsernameChange = (text) => {	
    	this.setState({usernameText: text});
        if (text==='') {
            this.setState({usernameErrMsg:'This field is required.'});
        } else {
            this.setState({usernameErrMsg:''});
        }
    }

    handlePasswordChange = (text) => {
        this.setState({passwordText: text});
        if (text==='') {
            this.setState({passwordErrMsg:'This field is required.'});
        } else {
            this.setState({passwordErrMsg:''});
        }
    }
    
    canSubmit = () => {
        //username is not empty
        if (this.state.usernameText!==''
        //password is not empty
        && this.state.passwordText!=='') {
            return true;            
        }
        return false;
    }

    handleSubmit = () => {
        if (this.canSubmit()) {
            //make api call to auth0
            this.props.login();
        }
    }
    
    render = () => (
        <div className='login-page'>
			<div className="header-container">
				<Link to="/home" className="header-link">SneakerStop</Link>
			</div>
			<div className="login-form-container">
				<form className="login-form" onSubmit={this.handleSubmit}>
					<h2 className="login-form-header"> Log In </h2>
					<span className="input-label"> Username </span>
					<InputField 
						name="username"
					 	type="text"
					 	handleInputChange={this.handleUsernameChange} 
					 	validation={this.validateField}
					 	errorMessage={this.state.usernameErrMsg}
					 	autofocus={"autofocus"} />
					<span className="input-label"> Password </span>
					<InputField 
						name="password"
						type="password"
						handleInputChange={this.handlePasswordChange} 
						validation={this.validateField}
						errorMessage={this.state.passwordErrMsg} />
					<div className="login-button-container">
						<button className="login-button" type="submit">Log In</button>
					</div>
				</form>
				<hr className="form-hr" />
				<div className="signup-link-container">
					New?
					<Link className="signup-link" to="/signup">Create an Account &#9656;</Link>
				</div> 
			</div>
		</div>
    );
}