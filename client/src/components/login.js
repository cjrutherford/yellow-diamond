import React, { Component } from "react";
import { Input, Form, FormGroup, Label, Button } from 'reactstrap';
import {connect} from 'react-redux';

import {loginUser} from '../actions/auth';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			userName: '',
			password: '',
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	onSubmit(e) {
		e.preventDefault();
		const login = {
			...this.state,
		};
		this.props.loginUser(login);
	}

	render() {
		return (
			<React.Fragment>
				<div className="wide">
					<h1 className="hotpink centerIt">Garnet Labs </h1>
				</div>
				<h2 className="hotpink centerIt ">Login</h2>
				<div className="loginForm">
					<Form id="loginPage">
						<div className="loginBox ">
							<FormGroup style={{dislpay: 'flex', flexDirection: 'row'}}>
								<Label for="userName">Username:</Label>
								<Input type="text" name="userName" onChange={this.onChange} />
							</FormGroup>
							<FormGroup style={{dislpay: 'flex', flexDirection: 'row'}}>
								<Label>Password:</Label>
								<Input type="password" name="password" onChange={this.onChange} />
							</FormGroup>
						</div>
						<FormGroup style={{dislpay: 'flex', flexDirection: 'row'}}>
							<Button className="loginButtons" onClick={this.onSubmit}>Submit</Button>
							<Button className="loginButtons">Forgot Password</Button>
						</FormGroup>
					</Form>
				</div>
			</React.Fragment>
		);
	}
}

const mapState = state => ({});


export default connect(mapState, {loginUser})(Login);
