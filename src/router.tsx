import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import React from 'react';
import Login from './component/login/Login';
import Admin from './Admin';
import Home from './component/Home';
import FormPage from './component/formComponent/formPage';
import DetailReport from './component/tableComponent/DetailReport';

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
								<Route path="/form/component" component={FormPage}/>
								<Route path="/table/high" component={DetailReport}/>
							</Switch>
						</Admin>
					} />

				</Switch>
			</App>
		</HashRouter>
	);
};

export default Router;
