import React from 'react';
import {Menu} from 'antd';
import {NavLink} from 'react-router-dom';

const NavLeft = (props: any) => {
	return (
		<div>
			<NavLink to="/home">
				首页
			</NavLink>
			<Menu>
				{props.children}
			</Menu>
		</div>
	)
};

export default NavLeft;
