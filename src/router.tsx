import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import React from 'react';
import Login from './component/login/Login';
import Admin from './Admin';
import Home from './component/Home';

const Router = () => {
	return (
		<HashRouter>
			<App>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/" render={() =>
						<Admin>
							<Switch>
								<Route path="/home" component={Home}/>
							</Switch>
						</Admin>
					} />

				</Switch>
			</App>
		</HashRouter>
	);
};

export default Router;
