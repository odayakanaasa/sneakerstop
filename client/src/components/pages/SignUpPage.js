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
        } else if (text.length>12) {
            this.setState({usernameErrMsg: 'Username cannot be more than 12 characters.'});
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
            && this.state.usernameText.length < 13
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

    handleSubmit = () => {
        if (this.canSubmit()) {
            //make call to auth0
            this.props.signup();
        }
    }

    render = () => (
        <div>
            <div className="header-container">
                <Link to="/" className="header-link">SneakerStop</Link>
            </div>
            <div className="signup-form-container">
                <form className="signup-form">
                    <h2 className="signup-form-header"> Sign Up </h2>
                    <span className="input-label"> Username </span>
                    <InputField 
                        name="username"
                        type="text"
                        placeholder="No more than 12 characters"
                        handleInputChange={this.handleInputChange} 
                        validation={this.validateField}
                        errorMessage={this.state.usernameErrMsg}
                        autofocus={"autofocus"} />
                    <span className="input-label"> Password </span>
                    <InputField 
                        name="password" 
                        type="password"
                        placeholder="At least 8 characters and 1 number" 
                        handleInputChange={this.handleInputChange} 
                        validation={this.validateField}
                        errorMessage={this.state.passwordErrMsg} />
                    <span className="input-label"> Re-enter Password </span>
                    <InputField 
                        name="password2"
                        type="password"
                        handleInputChange={this.handleInputChange} 
                        validation={this.validateField}
                        errorMessage={this.state.password2ErrMsg} />
                    <div className="signup-button-container">
                        <button className={"signup-button "+(this.canSubmit() ? "active" : "")} type="submit" onClick={this.handleSubmit}>Create an Account</button>
                    </div>
                </form>
                <hr className="form-hr" />
                <div className="login-link-container">
                    {"Already have a Voting Booth account? "} 
                    <Link className="login-link" to="/login">Log in &#9656; </Link>
                </div> 
            </div>
        </div>
    );
}

/*

static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props)
		this.state = {
			formData: {
				username: "",
	        	password: "",
	        	password2: "",
			},
			usernameErrMsg: "",
			passwordErrMsg: "",
			password2ErrMsg: "",
	    }
	}

	componentDidMount() {
		document.title="Voting Booth | Sign Up";
		window.scrollTo(0,0);
	}

	handleInputChange = (event) => {
		event.preventDefault();
		let formDataCopy = this.state.formData;
		formDataCopy[event.target.name] = event.target.value;
    	this.setState({formData: formDataCopy});
    	this.validateField(event.target.name);
    }

	validateField = (fieldname) => {
	  switch(fieldname){
	    case 'username':
	      if (this.state.formData.username==="") {
	      	this.setState({usernameErrMsg:"This field is required."});
	      } else {
	      	this.setState({usernameErrMsg:""});
	      }
	      break;
	    case 'password':
	      if (this.state.formData.password==="") {
	      	this.setState({passwordErrMsg:"This field is required."});
	      } else if (this.state.formData.password.length<8) {
	      	this.setState({passwordErrMsg:"Password must be at least 8 characters."});
	      } else if (!/\d/.test(this.state.formData.password)) {
	      	this.setState({passwordErrMsg:"Password must contain a number."});
	      } else {
	      	this.setState({passwordErrMsg:""});
	      	if(this.state.formData.password2!=="") {
	      		this.validateField('password2');
	      	}
	      }
	      break;
	    case 'password2':
	      if (this.state.formData.password2==="") {
	      	this.setState({password2ErrMsg:"This field is required."});
	      } else if (this.state.formData.password2!==this.state.formData.password) {
	      	this.setState({password2ErrMsg:"Passwords do not match."});
	      } else {
	      	this.setState({password2ErrMsg:""});
	      }
	      break;
	    default:
	      break;
		}
	}

	canSubmit = () => {
		let username = this.state.formData.username;
		let password = this.state.formData.password;
		let password2 = this.state.formData.password2;
		if (username!=="" && password.length>7 && /\d/.test(password) && password2===password) {
			return true;
		}
		return false;
	}

   	handleSubmit = (event) => {
      event.preventDefault();
      if (this.canSubmit()) {
      	this.props.handleSubmit(this.state.formData.username,this.state.formData.password);
      }
    }


}

*/