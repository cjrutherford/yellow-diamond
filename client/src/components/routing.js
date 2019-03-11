import React, { Component, Fragment } from 'react';

import Login from './login';
import Register from './register';
import ResetUser from './reset';
import Landing from './landing';

import {Route, Switch} from 'react-router-dom';
import PrivateRoute from './common/privateRoute';

class Routing extends Component {
	render() {
		return(
			<Fragment>
				<Route exact path='/' component={Landing} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/reset' component={ResetUser} />
			</Fragment>
		);
	}
}

export default Routing;
