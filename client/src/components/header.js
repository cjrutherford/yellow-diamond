import React, { Component /*Fragment*/ } from 'react';
import YellowDiamond from '../assets/Yellow Diamond.gif';

import {
	Collapse,
	Nav,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	NavItem,
	NavLink,
} from 'reactstrap';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			headerBG: {
				backgroundImage: 'url("blob.gif")',
				width: '100vw',
				height: '10vh',
				backgroundPosition: 'center center',
				backgroundSize: 'cover',
				margin: '0',
				padding: '0',
			},
			headerFilter: {
				background: 'rgba(100, 100, 100, 0.8)',
				width: '100vw',
				height: '10vh',
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				// justifyContent: "space-between",
				margin: '0',
				padding: '0',
				paddingRight: '2em',
				paddingLeft: '2em',
			},
			logoStyle: {
				width: '2vw',
			},
			menuStyles: {
				position: 'fixed',
				left: 0,
				top: '10vh',
				bottom: 0,
				display: 'flex',
				flexDirection: 'column',
				width: '15vw',
				height: '90vh',
				background: 'rgba(10,10,10,0.9)',
			},
			navOpen: false,
		};
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			navOpen: !this.state.navOpen,
		});
	}

	render() {
		return (
			<Navbar style={this.state.headerBG}>
				<div style={this.state.headerFilter}>
					<NavbarToggler onClick={this.toggle}>
						<i className="fa fa-bars" />
					</NavbarToggler>
					<NavbarBrand href="/">
						<img
							src={YellowDiamond}
							style={this.state.logoStyle}
							alt="Yellow Diamond Logo"
						/>
					</NavbarBrand>
					<Collapse isOpen={this.state.navOpen}>
						<Nav>
							<div style={this.state.menuStyles}>
								<NavItem>
									<NavLink href="/login">Login</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="/regiser">Register</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="/reset">Recover Account</NavLink>
								</NavItem>
							</div>
						</Nav>
					</Collapse>
				</div>
			</Navbar>
		);
	}
}
export default Header;
