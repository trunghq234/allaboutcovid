import React, { useEffect, useState } from "react";
import { Radio } from "antd";
import Chart from "./Chart";

export default function CountryChart({ historicData }) {
	const [data, setData] = useState([]);
	useEffect(() => {
		if (historicData) {
			setData(historicData);
		}
	}, [historicData]);
	return (
		<div>
			<Radio.Group defaultValue="a" buttonStyle="solid">
				<Radio.Button value="a">Last 100 days</Radio.Button>
				<Radio.Button value="b">Last 30 days</Radio.Button>
				<Radio.Button value="c">Last 7 days</Radio.Button>
			</Radio.Group>
			<Chart historicData={data} />
		</div>
	);
}
