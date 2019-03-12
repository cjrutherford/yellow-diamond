import React, { Component, Fragment } from "react";

import { Input, Form, FormGroup, Label, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { registerUser } from '../actions/auth';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			middleInitial: '',
			userName: '',
			gender: '',
			email: '',
			birthDate: new Date('01/01/1990'),
			password: '',
			password2: '',
		};
		this.onChange = this.onChange.bind(this);
		this.onReset = this.onReset.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	onReset(e) {
		e.preventDefault();
		this.setState({
			firstName: '',
			lastName: '',
			middleInitial: '',
			userName: '',
			gender: '',
			emailAddress: '',
			birthDate: new Date('01/01/1990'),
			password: '',
			password2: '',
		});
	}

	onSubmit(e) {
		e.preventDefault();
		const user = { ...this.state };
		console.log(user);
		this.props.registerUser(user, this.props.history);
	}

	render() {
		return (
			<div>
				<h1 className="hotpink centerIt"> Registration</h1>
				<div id="regForm" className="d-block d-lg-none">
					<Form className="hotpink centerBlock  ">
						<FormGroup>
							<Label for='firstName'>First Name:</Label>
							<Input
								className="formRegStyle"
								type="textbox"
								name="firstName"
								required
								onChange={this.onChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label for='lastName'> Last Name:</Label>
							<Input
								type="textbox"
								className="formRegStyle"
								name="lastName"
								required
								onChange={this.onChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label for='middleInitial'>Middle Initial:</Label>
							<Input
								type="textbox"
								className="formRegStyle"
								maxLength="1"
								size="1"
								name='middleInitial'
								onChange={this.onChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label for='gender'>Gender:</Label>
							<Input className="formRegStyle" type="textbox" name="gender" onChange={this.onChange} />
						</FormGroup>
						<FormGroup>
							<Label for='birthDate'>Birthdate:</Label>
							<Input type="date" name='birthDate' className="formRegStyle" required onChange={this.onChange} />
						</FormGroup>
						<FormGroup>
							<Label for='userName'>User Name:</Label>
							<Input
								className='formRegStyle'
								type='textbox'
								name='userName'
								required
								onChange={this.onChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label for='emailAddress'>Email:</Label>
							<Input
								className="formRegStyle"
								type="textbox"
								name="emailAddress"
								required
								pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
								onChange={this.onChange}
							/>
						</FormGroup>

						<FormGroup>
							<Label for='password'>Password:</Label>
							<Input
								className="formRegStyle"
								type="password"
								name="password"
								pattern="?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
								required
								onChange={this.onChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label for='password2'> Confirm Password:</Label>
							<Input
								className="formRegStyle"
								type="password"
								name="password2"
								required
								onChange={this.onChange}
							/>
						</FormGroup><FormGroup></FormGroup>
						<div className="txtCenter RegistrationButtonPlace" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-around' }}>
							<Button className="formRegButton" onClick={this.onSubmit}>Submit</Button>
							<Button className="formRegButton" onClick={this.onReset}>Reset</Button>
						</div>
					</Form>
				</div>

				<div id="regForm" className="d-none d-lg-block">
					<Form className="hotpink centerBlock  formRegWidth">
						<FormGroup>
							<Label for='firstName'>First Name:</Label>
							<Input
								className="formRegStyle"
								type="textbox"
								name="firstName"
								required
								onChange={this.onChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label for='lastName'> Last Name:</Label>
							<Input
								type="textbox"
								className="formRegStyle"
								name="lastName"
								required
								onChange={this.onChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label for='middleInitial'>Middle Initial:</Label>
							<Input
								type="textbox"
								className="formRegStyle"
								maxLength="1"
								size="1"
								name='middleInitial'
								onChange={this.onChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label for='gender'>Gender:</Label>
							<Input className="formRegStyle" type="textbox" name="gender" onChange={this.onChange} />
						</FormGroup>
						<FormGroup>
							<Label for='birthDate'>Birthdate:</Label>
							<Input type="date" name='birthDate' className="formRegStyle" required onChange={this.onChange} />
						</FormGroup>
						<FormGroup>
							<Label for='userName'>User Name:</Label>
							<Input
								className='formRegStyle'
								type='textbox'
								name='userName'
								required
								onChange={this.onChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label for='emailAddress'>Email:</Label>
							<Input
								className="formRegStyle"
								type="textbox"
								name="emailAddress"
								required
								pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
								onChange={this.onChange}
							/>
						</FormGroup>

						<FormGroup>
							<Label for='password'>Password:</Label>
							<Input
								className="formRegStyle"
								type="password"
								name="password"
								pattern="?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
								required
								onChange={this.onChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label for='password2'> Confirm Password:</Label>
							<Input
								className="formRegStyle"
								type="password"
								name="password2"
								required
								onChange={this.onChange}
							/>
						</FormGroup><FormGroup></FormGroup>
						<div className="txtCenter RegistrationButtonPlace" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-around' }}>
							<Button className="formRegButton" onClick={this.onSubmit}>Submit</Button>
							<Button className="formRegButton" onClick={this.onReset}>Reset</Button>
						</div>
					</Form>
				</div>
			</div>
		);
	}
}

const mapState = state => ({});
export default connect(mapState, { registerUser })(Register);
