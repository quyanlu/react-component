import {Route, Switch} from 'react-router-dom';
import Home from '../component/Home';
import About from '../component/About';

const Content = () => (
	<main>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/about" component={About} />
		</Switch>
	</main>
);
export default Content;
