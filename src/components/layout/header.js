import React from "react";
import logo from "../../assets/images/logo.png";
import { Menu } from "antd";
import { Link } from "react-router-dom";

export default function AppHeader() {
	return (
		<div className="container-fluid">
			<div className="header">
				<div className="logo">
					<a href="/">
						<img src={logo} alt="" style={{ width: "32px" }} />
						All about Covid
					</a>
				</div>
				<Menu style={{ minWidth: "340px" }} theme="light" mode="horizontal">
					<Menu.Item key="1">
						<Link to="/">World</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="/vietnam">Viet Nam</Link>
					</Menu.Item>
					<Menu.Item key="3">
						<Link to="/vaccine">Vaccine</Link>
					</Menu.Item>
					<Menu.Item key="4">
						<Link to="/news">News</Link>
					</Menu.Item>
				</Menu>
			</div>
		</div>
	);
}
