import React, { Component, Fragment } from "react";

class Register extends Component {
	render() {
		return (
			<Fragment>
				<h1 class="hotpink centerIt"> Registration</h1>
				<div id="regForm">
					<form className="hotpink centerBlock formRegWidth">
						First Name:&nbsp;
						<input
							className="formRegStyle"
							ß
							type="textbox"
							name="firstName"
							required
						/>{" "}
						&nbsp;&nbsp;&nbsp; Last Name:{" "}
						<input
							type="textbox"
							className="formRegStyle"
							name="lastName"
							required
						/>
						&nbsp;&nbsp;&nbsp; Middle Initial:{" "}
						<input
							type="textbox"
							className="formRegStyle"
							maxlength="1"
							size="1"
						/>
						<br />
						<br />
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gender:&nbsp;{" "}
						<input className="formRegStyle" type="textbox" name="gender" />
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Birthdate:{" "}
						<input type="date" className="formRegStyle" required />
						<br />
						<br />
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email:&nbsp;{" "}
						<input
							className="formRegStyle"
							type="textbox"
							name="email"
							required
							pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
						/>
						<br />
						<br />
						&nbsp;Password:&nbsp;{" "}
						<input
							className="formRegStyle"
							type="password"
							name="password"
							pattern="?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
							required
						/>{" "}
						&nbsp;&nbsp;&nbsp;&nbsp; Confirm Password:{" "}
						<input
							className="formRegStyle"
							type="password"
							name="passwordConfirm"
							required
						/>
						<br />
						<br />
						<div className="txtCenter">
							<button className="formRegButton">Submit</button>
							<button className="formRegButton">Reset</button>
						</div>
					</form>
				</div>
			</Fragment>
		);
	}
}
export default Register;
