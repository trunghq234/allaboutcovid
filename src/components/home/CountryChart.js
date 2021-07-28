import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import { COLORS } from "../../constaints/colors";
import moment from "moment";

export default function CountryChart({ historicData, optionView }) {
	const [data, setData] = useState([]);
	useEffect(() => {
		if (Array.isArray(historicData)) {
			switch (optionView) {
				case "30":
					generateData(
						historicData.slice(Math.max(historicData.length - 31, 1))
					);
					break;
				case "7":
					generateData(
						historicData.slice(Math.max(historicData.length - 8, 1))
					);
					break;
				default:
					generateData(historicData);
					break;
			}
		}
	}, [optionView, historicData]);

	const generateData = (dataInput) => {
		const tmp = [];
		if (Array.isArray(dataInput)) {
			dataInput.pop();
			dataInput.forEach((element) => {
				tmp.push(
					{
						date: moment.utc(element.Date).format("DD/MM/YY"),
						value: element.Confirmed,
						category: "Confirmed",
					},
					{
						date: moment.utc(element.Date).format("DD/MM/YY"),
						value: element.Recovered,
						category: "Recovered",
					},
					{
						date: moment.utc(element.Date).format("DD/MM/YY"),
						value: element.Deaths,
						category: "Deaths",
					}
				);
			});
		}
		setData(tmp);
	};

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
		height: 340,
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
	return <Line {...config} />;
}
