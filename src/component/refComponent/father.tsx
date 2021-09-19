import React, {Component, forwardRef} from 'react';

function Son(props: {grandRef: any;}) {
	const {grandRef} = props;
	console.log(grandRef);
	return <div>
		<div> i am alien</div>
		<span ref={grandRef}>这个是想要获取元素</span>
	</div>;
}
class Father extends Component<any, any> {
	constructor(props: any) {super(props);}

	render() {
		console.log(this.props);
		return <div>
			<Son grandRef={this.props.grandRef} />
		</div>;
	}
}
const NewFather = forwardRef((props:any, ref) => {
		console.log(props, ref);
		return <Father grandRef={ref} {...props} />;
	}
);
export default NewFather;
