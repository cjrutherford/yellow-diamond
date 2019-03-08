import React, { Component, Fragment } from "react";
import YellowDiamond from "../assets/Yellow Diamond.gif";
class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			headerBG: {
				backgroundImage: 'url("blob.gif")',
				width: "100vw",
				height: "7vh",
				backgroundPosition: "center center",
				backgroundSize: "cover",
				margin: "0",
				padding: "0"
			},
			headerFilter: {
				background: "rgba(100, 100, 100, 0.8)",
				width: "100vw",
				height: "7vh",
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				margin: "0",
				padding: "0",
				paddingRight: "4em",
				paddingLeft: "2em"
			},
			logoStyle: {
				width: "2vw"
			}
		};
	}
	render() {
		return (
			<Fragment>
				<div style={this.state.headerBG}>
					<div style={this.state.headerFilter}>
						<img
							src={YellowDiamond}
							style={this.state.logoStyle}
							alt="Yellow Diamond"
						/>
						<h1>Hello Header</h1>
					</div>
				</div>
			</Fragment>
		);
	}
}
export default Header;
