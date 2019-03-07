import React, { Component } from "react";

class Login extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="wide">
					<h1 className="hotpink centerIt">Garnet Labs </h1>
				</div>
				<h2 className="hotpink centerIt ">Login</h2>
				<div className="loginForm">
					<form id="loginPage">
						<div className="loginBox ">
							Username: <input type="text" name="login" />
							<br />
							Password: <input type="password" name="password" />
							<br />
						</div>
						<button className="loginButtons">Submit</button>
						<button className="loginButtons">Forgot Password</button>
					</form>
				</div>
			</React.Fragment>
		);
	}
}
export default Login;
