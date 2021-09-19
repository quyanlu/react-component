import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import React from 'react';
import Login from './component/login/Login';
import Admin from './Admin';
import Home from './component/Home';
import FormPage from './component/formComponent/formPage';
import DetailReport from './component/tableComponent/DetailReport';
import PropsFormPage from './component/porpsForm/formPage';
import GrandFather from './component/refComponent/跨层级获取';
import HOCRef from './component/refComponent/高阶组件转发REF';

const Router = () => {
	return (
		<HashRouter>
			<App>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/" render={() =>
						<Admin>
							<Switch>
								<Route path="/home" component={Home} />
								<Route path="/form/component" component={FormPage} />
								<Route path="/form/reg" component={PropsFormPage} />
								<Route path="/table/high" component={DetailReport} />
								<Route path="/ui/gallery" component={GrandFather} />
								<Route path="/ui/tabs" component={HOCRef} />
							</Switch>
						</Admin>
					} />

				</Switch>
			</App>
		</HashRouter>
	);
};

export default Router;
