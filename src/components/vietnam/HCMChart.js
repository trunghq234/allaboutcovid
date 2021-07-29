import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import { COLORS } from "../../constaints/colors";
import moment from "moment";

export default function HCMChart({ data }) {
	const [dataSource, setDataSource] = useState([]);

	useEffect(() => {
		generateData(data);
	}, [data]);

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
		yAxis: {
			label: {
				formatter: function formatter(v) {
					return "".concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
						return "".concat(s, ",");
					});
				},
			},
		},
		height: 478,
		color: COLORS.primary,
		legend: { position: "top-left" },
		smooth: true,
		animation: {
			appear: {
				animation: "path-in",
				duration: 2000,
			},
		},
	};
	return <Line style={{ paddingTop: "20px" }} {...config} />;
}
