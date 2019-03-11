import React, { Component } from 'react';
import {Router} from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';
import Routing from './components/routing';
import { Provider } from 'react-redux';
import store from './store';

import setAuthToken from './utils/setAuthToken';

import jwt_decode from 'jwt-decode';
import {setCurrentUser} from './actions/auth';

import './App.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//eslint-disable-next-line
import * as Bootstrap from 'bootstrap';
//eslint-disable-next-line
import * as $ from 'jquery';
//eslint-disable-next-line
import * as Popper from 'popper.js';
import { logoutUser } from './actions/auth';


if(localStorage.yellowDiamondToken) {
	setAuthToken(localStorage.yellowDiamondToken);
	const decoded = jwt_decode(localStorage.yellowDiamondToken);
	store.dispatch(setCurrentUser(decoded));
	const currentTime = Date.now() / 1000;
	if(decoded.exp < currentTime){
		store.dispatch(logoutUser());
		window.location.href = '/login';

	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>				
				<Header />
					<Router>
						<div className="app">
							<Routing />
						</div>
					</Router>
				<Footer />
			</Provider>
		);
	}
}

export default App;
