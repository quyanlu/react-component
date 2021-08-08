import React from 'react';
import {Col, Row} from 'antd';
import NavLeft from './component/navLeft/NavLeft';
import './style/common.scss';

const Admin = (props: {children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;}) => {
	return (
		<Row className="container">
			<Col span="4" className="nav-left">
				<NavLeft />
			</Col>
			<Col span="20" className="main">
				{/*<Header />*/}
				<Row className="content">
					{/* <Home/> */}
					{props.children}
				</Row>
				{/*<Footer />*/}
			</Col>
		</Row>
	);
};
export default Admin;
