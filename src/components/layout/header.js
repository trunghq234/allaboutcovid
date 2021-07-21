import React from "react";
import logo from "../../assets/images/logo.png";

export default function AppHeader() {
	return (
		<div className="container-fluid">
			<div className="header">
				<div className="logo">
					<a href="/">
						<img src={logo} alt="" style={{ width: "32px"}} />
						Covid tracker
					</a>
				</div>
			</div>
		</div>
	);
}
