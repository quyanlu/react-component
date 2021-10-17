import React, {useEffect, useMemo, useState} from 'react';
import ReactDOM from 'react-dom';
import './dislog.scss';
/* 控制弹窗隐藏以及动画效果 */
const controlShow = (f1: {(value: any): void; (value: any): void; (arg0: any): void;}, f2: {(value: any): void; (value: any): void; (arg0: any): void;}, value: any, timer: number) => {
	f1(value);
	return setTimeout(() => {
		f2(value);
	}, timer);
};

function Dialog(props: any) {
	const {width, visible, closeCb, onClose} = props;
	/* 控制 modelShow 动画效果 */
	const [modelShow, setModelShow] = useState(visible);
	const [modelShowAsync, setModelShowAsync] = useState(visible);
	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (visible) {
			timer = controlShow(setModelShow, setModelShowAsync, visible, 30);
		} else {
			timer = controlShow(setModelShowAsync, setModelShow, visible, 1000);
		}
		return function() {
			timer && clearTimeout(timer);
		};
	}, [visible]);
	useEffect(() => {
		!modelShow && typeof closeCb === 'function' && closeCb();
	}, [modelShow]);
	const renderChildren = useMemo(() => {
		/* 把元素渲染到组件之外的 document.body 上  */
		return ReactDOM.createPortal(
			<div style={{display: modelShow ? 'block' : 'none'}}>
				<div className="model_container" style={{opacity: modelShowAsync ? 1 : 0}}>
					<div className="model_wrap">
						<div style={{width: width + 'px'}}> {props.children} </div>
					</div>
				</div>
				<div className="model_container mast" onClick={() => onClose && onClose()} style={{opacity: modelShowAsync ? 0.6 : 0}} />
			</div>,
			document.body
		);
	}, [modelShowAsync, modelShow]);

	return renderChildren;
}

export default Dialog;
