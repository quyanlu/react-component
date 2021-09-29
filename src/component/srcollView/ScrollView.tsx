import React, {useEffect, useRef, useState} from 'react';
import './ScrollView.scss';

function ScrollView() {
	const [dataList, setDataList] = useState([]); //保存数据
	const [position, setPosition] = useState([0, 0]);//截取缓冲区 + 视图区索引
	const scroll = useRef(null as any); //获取scroll元素
	const box = useRef(null as any); //获取元素用于容器高度
	const context = useRef(null as any); //用于移动视图区域，形成滑动效果
	const scrollInfo = useRef({
		height: 500, //容器高度
		bufferCount: 8, //缓冲区个数
		itemHeight: 60, //每个item高度
		renderCount: 0, //渲染区个数
	});

	useEffect(() => {
		const height = box.current.offsetHeight;
		const {itemHeight, bufferCount} = scrollInfo.current;
		const renderCount = Math.ceil(height / itemHeight) + bufferCount;
		scrollInfo.current = {height, bufferCount, itemHeight, renderCount};
		const dataList = new Array(10000).fill(1).map((item, index) => index + 1);
		// @ts-ignore
		setDataList(dataList);
		setPosition([0, renderCount]);
		scroll.current.addEventListener('scroll', handleScroll);
	}, []);
	const handleScroll = () => {
		const {scrollTop} = scroll.current;
		const {itemHeight, renderCount} = scrollInfo.current;
		const currentOffset = scrollTop - (scrollTop % itemHeight);
		const start = Math.floor(scrollTop / itemHeight);
		context.current.style.transform = `translate3d(0, ${currentOffset}px, 0)`; //偏移造成下滑效果
		const end = Math.floor(scrollTop / itemHeight + renderCount + 1);
		if (end !== position[1] || start !== position[0]) {
			setPosition([start, end]);
		}
	};
	const {itemHeight, height} = scrollInfo.current;
	const [start, end] = position;
	const renderList = dataList.slice(start, end);
	return <div className="list_box" ref={box}>
		<div className="scroll_box" ref={scroll} onScroll={() => handleScroll()}>
			{/*<div className="scroll_hold" style={{height: `${dataList.length * itemHeight}px`}}></div>*/}
			<div className="context" ref={context}>
				{
					renderList.map((item, i) => {
						return <div className="list" key={i}>
							{item + ''} Item
						</div>;
					})
				}
			</div>
		</div>
	</div>;
}
export default ScrollView;
