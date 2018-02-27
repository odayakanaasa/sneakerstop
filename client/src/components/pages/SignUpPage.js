import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import InputField from './../elements/InputField';

export default class SignUpPage extends Component {

    static propTypes = {
        signup: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            usernameText: '',
            passwordText: '',
            password2Text: '',
            usernameErrMsg: '',
			passwordErrMsg: '',
			password2ErrMsg: '',
        }
    }

    handleUsernameChange = (text) => {	
    	this.setState({usernameText: text});
        if (text==='') {
            this.setState({usernameErrMsg:'This field is required.'});
            return;
        } else if (text.length>20) {
            this.setState({usernameErrMsg: 'Username cannot be more than 20 characters.'});
            return;
        } 
        this.setState({usernameErrMsg:''});
    }

    handlePasswordChange = (text) => {
        this.setState({passwordText: text});
        if (text==='') {
            this.setState({passwordErrMsg:'This field is required.'});
            return;
        } else if (text.length<8) {
            this.setState({passwordErrMsg:'Password must be at least 8 characters.'});
            return;
        } else if (!/\d/.test(text)) {
            this.setState({passwordErrMsg:'Password must contain a number.'});
            return;
        } else if (this.state.password2Text!=='') {
            if(this.state.password2Text!==text) {
                this.setState({password2ErrMsg:'Passwords do not match.'})
            } else {
                this.setState({password2ErrMsg:''})
            }
        }        
        this.setState({passwordErrMsg:''});                       
    }

    handlePassword2Change = (text) => {
        this.setState({password2Text: text});
        if (text==='') {
            this.setState({password2ErrMsg:'This field is required.'});
            return;
        } else if (text!==this.state.passwordText) {
            this.setState({password2ErrMsg:'Passwords do not match.'});
            return;
        }
        this.setState({password2ErrMsg:''});
    }
    
    canSubmit = () => {
        //username is not empty
        if (this.state.usernameText!==''
            //username < 13 characters
            && this.state.usernameText.length <= 20
            //password > 7 characters
            && this.state.passwordText.length > 7
            //password has number
            && /\d/.test(this.state.passwordText)
            //passwords match
            && this.state.password2Text === this.state.passwordText) {
            return true;
        }
        return false;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.handleUsernameChange(this.state.usernameText);
        this.handlePasswordChange(this.state.passwordText);
        this.handlePassword2Change(this.state.password2Text);
        if (this.canSubmit()) {
            //make call to auth0
            try {
                let possibleErr = this.props.signup(this.state.usernameText, this.state.passwordText);
                console.log(possibleErr);
            } catch(err) {
                console.log('err',err);
            }
        }
    }

    render = () => (
        <div className='signup-page'>
            <div className="signup-form-container">
                <form className="signup-form">
                    <h2 className="signup-form-header"> Sign Up </h2>
                    <InputField 
                        name="username"
                        type="text"
                        placeholder="Email"
                        handleInputChange={this.handleUsernameChange} 
                        validation={this.validateField}
                        errMsg={this.state.usernameErrMsg}
                        autofocus={true} />
                    <InputField 
                        name="password" 
                        type="password"
                        placeholder="Password" 
                        handleInputChange={this.handlePasswordChange} 
                        validation={this.validateField}
                        errMsg={this.state.passwordErrMsg} />
                    <InputField 
                        name="password2"
                        type="password"
                        handleInputChange={this.handlePassword2Change} 
                        validation={this.validateField}
                        placeholder="Re-enter Password"
                        errMsg={this.state.password2ErrMsg} />
                    <div className="signup-button-container">
                        <button className={"signup-button "+(this.canSubmit() ? "active" : "")} type="submit" onClick={this.handleSubmit}>Create an Account</button>
                    </div>
                </form>
                <hr className="form-hr" />
                <div className="login-link-container">
                    Already have an account?
                    <Link className="login-link" to="/login">Log in &#9656; </Link>
                </div> 
            </div>
        </div>
    );
}