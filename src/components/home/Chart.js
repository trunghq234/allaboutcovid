import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import { COLORS } from "../../constaints/colors";

export default function Chart({ historicData }) {
	const [data, setData] = useState([]);
	useEffect(() => {
		const tmp = [];
		if (historicData) {
			historicData.forEach((element) => {
				tmp.push(
					{
						date: element.Date,
						value: element.Confirmed,
						category: "Confirmed",
					},
					{
						date: element.Date,
						value: element.Recovered,
						category: "Recovered",
					},
					{
						date: element.Date,
						value: element.Deaths,
						category: "Deaths",
					}
				);
			});
		}
		setData(tmp);
	}, [historicData]);

	var config = {
		data: data,
		xField: "date",
		yField: "value",
		seriesField: "category",
		yAxis: {
			label: {
				formatter: function formatter(v) {
					return "".concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
						return "".concat(s, ",");
					});
				},
			},
		},
		color: [COLORS.orange, COLORS.green, COLORS.gray],
	};
	return <Line {...config} />;
}
