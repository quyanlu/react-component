import React, {forwardRef, useEffect, useRef} from 'react';

function HOC(Component: any) {
	class Warp extends React.Component {
		render() {
			// @ts-ignore
			const {forwardedRef, ...otherprops} = this.props;
			console.log(this.props)
			return <Component ref={forwardedRef} {...otherprops} />
				;
		}
	}
	return forwardRef((props: any, ref) => <Warp forwardedRef={ref} {...props} />);
}
class Index extends React.Component {
	render() {
		return <div>hello,world</div>;
	}
}
const HocIndex = HOC(Index);

const HOCRef = () => {
	const node = useRef(null);
	useEffect(() => {
		console.log(node.current);  /* Index 组件实例  */
	}, []);
	return <div><HocIndex ref={node} /></div>;
};
export default HOCRef;
