import React, {PureComponent, useEffect, useState} from 'react';
import Dialog from './dialog';
import {render, unmountComponentAtNode} from 'react-dom';
import './dislog.scss';

class Modal extends PureComponent<any> {
	static show: (config: any) => void;
	static hidden: () => void;

	/* 渲染底部按钮 */
	renderFooter = () => {
		const {onOk, onCancel, cancelText, okTest, footer} = this.props;
		/* 触发 onOk / onCancel 回调  */
		if (footer && React.isValidElement(footer)) return footer;
		return <div className="model_bottom">
			<div className="model_btn_box">
				<button className="searchbtn" onClick={(e) => { onOk && onOk(e); }}>{okTest || '确定'}</button>
				<button className="concellbtn" onClick={(e) => { onCancel && onCancel(e); }}>{cancelText || '取消'}</button>
			</div>
		</div>;
	};
	/* 渲染顶部 */
	renderTop = () => {
		const {title, onClose} = this.props;
		return <div className="model_top">
			<p>{title}</p>
			<span className="model_top_close" onClick={() => onClose && onClose()}>x</span>
		</div>;
	};
	/* 渲染弹窗内容 */
	renderContent = () => {
		const {content, children} = this.props;
		return React.isValidElement(content) ? content
			: children ? children : null;
	};

	render() {
		const {visible, width = 50, closeCb, onClose} = this.props;
		return <Dialog
			closeCb={closeCb}
			onClose={onClose}
			width={width}
			visible={visible}
		>
			{this.renderTop()}
			{this.renderContent()}
			{this.renderFooter()}
		</Dialog>;
	}
}
let ModalContainer: any = null;
const modelSysbol = Symbol('$$__model__Container_hidden');
Modal.show = function(config) {
	console.log(config,"configconfigconfigconfig");
	/* 如果modal已经存在了，那么就不需要第二次show */
	if (ModalContainer) return;
	const props = {...config, visible: true};
	const container = ModalContainer = document.createElement('div');
	/*创建一个管理者，管理model状态*/
	// @ts-ignore
	const manager = container[modelSysbol] = {
		setShow: null,
		mounted: false,
		hidden() {
			const {setShow} = manager;
			// @ts-ignore
			setShow && setShow(false);
		},
		destory() {
			//卸载组件
			unmountComponentAtNode(container);
			//移除节点
			document.body.removeChild(container);
			ModalContainer = null;
		}
	};
	const ModelApp = (props: [any, ...any[]]) => {
		console.log(props,"propspropsprops");
		const [show, setShow] = useState(false);
		// @ts-ignore
		manager.setShow = setShow;
		// @ts-ignore
		const {visible, ...trueProps} = props;
		useEffect(() => {
			//加载完成，设置状态
			manager.mounted = true;
			setShow(visible);
		}, []);
		return <Modal {...trueProps} closeCb={() => manager.mounted && manager.destory()} visible={show} />;
	};
	document.body.appendChild(container);
	//渲染元素
	render(<ModelApp {...props} />, container);
	return manager;
};

//静态属性
Modal.hidden = function() {
	if (!ModalContainer) return;
	//如果存在ModalContainer 那么隐藏ModalContainer
	ModalContainer[modelSysbol] && ModalContainer[modelSysbol].hidden();
};
export default Modal;

