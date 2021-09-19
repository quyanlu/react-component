import React, {Component} from 'react';
import NewFather from './father';

class GrandFather extends Component {
	constructor(props: {} | Readonly<{}>) {super(props);}

	node = null as any;

	componentDidMount(): void {
		console.log(this.node);
	}

	render() {
		// @ts-ignore
		return <div>
			<NewFather ref={(node) => this.node = node}  test='ssssssss'/>
		</div>;
	}
}
export default GrandFather;
