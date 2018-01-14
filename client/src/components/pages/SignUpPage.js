import React, { Component } from 'react';

export default class SignUpPage extends Component {

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
            //make call to auth0 somehow

            //this.props.setUserName(this.state.usernameText)
        }
    }

    render = () => (<div></div>);
}