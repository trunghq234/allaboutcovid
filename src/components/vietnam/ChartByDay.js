import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import { COLORS } from "../../constaints/colors";
import moment from "moment";

export default function ChartByDay({ option, data }) {
	const [dataSource, setDataSource] = useState([]);

	useEffect(() => {
		if (Array.isArray(data)) {
			switch (option) {
				case "30":
					generateData(data.slice(Math.max(data.length - 31, 1)));
					break;
				case "7":
					generateData(data.slice(Math.max(data.length - 8, 1)));
					break;
				default:
					generateData(data);
					break;
			}
		}
	}, [option, data]);

	const generateData = (input) => {
		const tmp = [];
		input.forEach((element) => {
			tmp.push({
				date: moment.utc(element.x).format("DD/MM/YY"),
				value: element.y,
			});
		});
		setDataSource(tmp);
	};

	var config = {
		data: dataSource,
		xField: "date",
		yField: "value",
		height: 498,
		color: [COLORS.orange, COLORS.green, COLORS.dark2],
		legend: { position: "top-left" },
		smooth: true,
		animation: {
			appear: {
				animation: "path-in",
				duration: 2000,
			},
		},
	};
	return <Line style={{paddingTop: "20"}} {...config} />;
}
