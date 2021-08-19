import React from "react";
import { Radio } from "antd";

export default function ViewSelector({ handleChangeOption }) {
	return (
		<div className="viewSelector">
			<Radio.Group
				style={{ marginLeft: "auto", flexDirection: "row" }}
				onChange={handleChangeOption}
				defaultValue="all"
				buttonStyle="solid"
			>
				<div className="radioGroup">
					<Radio.Button value="all">All time</Radio.Button>
					<Radio.Button value="30">Last 30 days</Radio.Button>
					<Radio.Button value="7">Last 7 days</Radio.Button>
				</div>
			</Radio.Group>
		</div>
	);
}
