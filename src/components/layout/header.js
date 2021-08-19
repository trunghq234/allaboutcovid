import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { Menu, Drawer, Button } from "antd";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

export default function AppHeader() {
	const [current, setCurrent] = useState("world");
	const [visible, setVisible] = useState(false);

	const showDrawer = () => {
		setVisible(true);
	};
	const onClose = () => {
		setVisible(false);
	};

	return (
		<div className="container-fluid">
			<div className="header">
				<div className="logo">
					<a href="/">
						<img src={logo} alt="" style={{ width: "32px" }} />
						All about COVID
					</a>
				</div>
				<div className="mobileVisible">
					<Button type="primary" onClick={showDrawer}>
						<MenuOutlined />
					</Button>
					<Drawer placement="right" onClose={onClose} visible={visible}>
						<Menu
							onClick={(e) => {
								setCurrent(e.key);
								setVisible(false);
							}}
							selectedKeys={current}
							theme="light"
							mode="vertical"
							inlineCollapsed={false}
						>
							<Menu.Item key="world">
								<Link to="/">World</Link>
							</Menu.Item>
							<Menu.Item key="vietnam">
								<Link to="/vietnam">VietNam</Link>
							</Menu.Item>
							<Menu.Item key="vaccine">
								<Link to="/vaccine">Vaccine</Link>
							</Menu.Item>
							<Menu.Item key="news">
								<Link to="/news">News</Link>
							</Menu.Item>
						</Menu>
					</Drawer>
				</div>
				<div className="mobileHidden">
					<Menu
						onClick={(e) => setCurrent(e.key)}
						selectedKeys={current}
						theme="light"
						mode="horizontal"
						disabledOverflow="true"
					>
						<Menu.Item key="world">
							<Link to="/">World</Link>
						</Menu.Item>
						<Menu.Item key="vietnam">
							<Link to="/vietnam">VietNam</Link>
						</Menu.Item>
						<Menu.Item key="vaccine">
							<Link to="/vaccine">Vaccine</Link>
						</Menu.Item>
						<Menu.Item key="news">
							<Link to="/news">News</Link>
						</Menu.Item>
					</Menu>
				</div>
			</div>
		</div>
	);
}
