import React, { Component, Fragment } from 'react';
import YellowDiamond from '../assets/Yellow Diamond.gif';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';
import {PropTypes} from 'prop-types';

import { Link } from 'react-router-dom';
import {
	Collapse,
	Nav,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	NavItem,
	Button,
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
		this.onLogoutClick = this.onLogoutClick.bind(this);
	}

	toggle() {
		this.setState({
			navOpen: !this.state.navOpen,
		});
	}

	onLogoutClick(e) {
		e.preventDefault();
		this.props.logoutUser();
	}

	render() {
		const { user, isAuthenticated } = this.props.auth;
		const guestLinks = (
			<Fragment>
				<NavItem>
					<Link to="/apps">Manage Apps</Link>
				</NavItem>
				<NavItem>
					<Link to="/users">Manage Users</Link>
				</NavItem>
				<NavItem>
					<Button clasName='nav-link' onClick={this.onLogoutClick}>LogOut {user.userName}</Button>
				</NavItem>
			</Fragment>
		);
		const authLinks = (
			<Fragment>
				<NavItem>
					<Link to='/login'>Login</Link>
				</NavItem>
				<NavItem>
					<Link to="/register">Register</Link>
				</NavItem>
				<NavItem>
					<Link to="/reset">Recover Account</Link>
				</NavItem>
			</Fragment>
		)
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
								{isAuthenticated ? guestLinks : authLinks}
							</div>
						</Nav>
					</Collapse>
				</div>
			</Navbar>
		);
	}
};

Header.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapState = state => ({
	auth: state.auth,
});

export default connect(mapState, { logoutUser })(Header);
