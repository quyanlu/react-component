import React, {useEffect} from 'react';

const toLearn = [{type: 1, mes: 'let us learn React'}, {type: 2, mes: 'let us learn Vue3.0'}];
function Index({id}: any) {
	const typeInfo = React.useRef(toLearn[0]);
	const changeType = (info: any) => {
		typeInfo.current = info; /* typeInfo 的改变，不需要视图变化 */
	};
	console.log(typeInfo)
	useEffect(() => {

		if (typeInfo.current.type === 1) {
			/* ... */
			console.log(typeInfo)
		}
	}, [id]); /* 无须将 typeInfo 添加依赖项  */
	return <div>
		{
			toLearn.map(item => <button key={item.type} onClick={changeType.bind(null, item)}>{item.mes}</button>)
		}
	</div>;
}
export default Index;
