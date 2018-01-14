import React, { Component } from 'react';

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
        //username < 13 characters
        && this.state.passwordText!=='') {
            return true;            
        }
        return false;
    }

    //make api call to auth0 either in canSubmit or in handleSubmit

    handleSubmit = () => {
        if (this.canSubmit()) {

        }
    }
    
    render = () => (<div></div>);
}