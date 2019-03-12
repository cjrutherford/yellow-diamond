import React, { Component, Fragment } from "react";

class ResetUser extends Component {
	render() {
		return (
			<Fragment>
				<h2 className="hotpink centerIt">Password Retrieval</h2>
				<p className="hotpink centerBlock" id="paragraphPass">
					{" "}
					Forgot your password? Enter your email below and we will send you
					instructions for resetting your password.
				</p>

				<div className="centerBlock " id="passRStyle">
					<form>
						<input
							type="textbox"
							className="formRegStyle "
							id="resetPassEmail"
							size="75"
							placeholder="E-mail"
							required
						/>
						<br />
						<button className="formRegButton" id="resetButtonPass">
							Reset Password
						</button>
					</form>
				</div>
			</Fragment>
		);
	}
}

export default ResetUser;
