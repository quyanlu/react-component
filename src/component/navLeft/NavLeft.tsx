import React from 'react';
import {Menu} from 'antd';
import {NavLink} from 'react-router-dom';
import './NavLeft.scss';
import {DropboxOutlined} from '@ant-design/icons';
import MenuConfig from './../../config/menuConfig';
import SubMenu from 'antd/es/menu/SubMenu';

const NavLeft = (props: any) => {
	const renderMenu = (data: any[]) => {
		return data.map((item) => {
			if (item.children) {
				return (
					<SubMenu title={item.title} key={item.key}>
						{renderMenu(item.children)}
					</SubMenu>
				);
			}
			return <Menu.Item title={item.title} key={item.key}>
				<NavLink to={item.key}>{item.title}</NavLink>
			</Menu.Item>;
		});
	};

	return (
		<div className="nav-left">
			<NavLink to="/home">
				<div className="logo">
					<DropboxOutlined className="icon-style" />
					<h1>Imooc MS</h1>
				</div>
			</NavLink>
			<Menu theme="dark">
				{renderMenu(MenuConfig)}
			</Menu>
		</div>
	);
};

export default NavLeft;
