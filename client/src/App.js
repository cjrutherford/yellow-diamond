import React, { Component } from 'react';
import Login from './components/login';
import Register from './components/register';
import ResetUser from './components/reset';
import Header from './components/header';
import Routing from './components/routing';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//eslint-disable-next-line
import * as Bootstrap from 'bootstrap';
//eslint-disable-next-line
import * as $ from 'jquery';
//eslint-disable-next-line
import * as Popper from 'popper.js';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Header />
			</Provider>
		);
	}
}

export default App;
