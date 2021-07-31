import React, { useState, useEffect } from "react";
import { Area } from "@ant-design/charts";
import { COLORS } from "../../constaints/colors";
import moment from "moment";
import ViewSelector from "../home/ViewSelector";

export default function VaccineChart({ title, data }) {
	const [dataSource, setDataSource] = useState([]);
	const [optionView, setOptionView] = useState("");

	const handleChangeOption = (e) => {
		setOptionView(e.target.value);
	};

	useEffect(() => {
		if (data != null) {
			switch (optionView) {
				case "30":
					generateData(data.slice(Math.max(data.length - 30)));
					break;
				case "7":
					generateData(data.slice(Math.max(data.length - 7)));
					break;
				default:
					generateData(data);
					break;
			}
		}
	}, [optionView, data]);

	const generateData = (data) => {
		const tmp = [];
		data.forEach((item) => {
			if (item.people_vaccinated && item.people_fully_vaccinated) {
				tmp.push(
					{
						category: "At least one dose",
						date: moment.utc(item.date).format("DD/MM/YY"),
						value: item.people_vaccinated - item.people_fully_vaccinated,
					},
					{
						category: "Fully vaccinated",
						date: moment.utc(item.date).format("DD/MM/YY"),
						value: item.people_fully_vaccinated,
					}
				);
			}
		});
		setDataSource(tmp);
	};

	var config = {
		data: dataSource,
		isGroup: false,
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
		tooltip: {
			formatter: function formatter(v) {
				return {
					name: v.category,
					value: ""
						.concat(v.value)
						.replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
							return "".concat(s, ",");
						}),
				};
			},
		},
		height: 478,
		color: [COLORS.green, COLORS.teal],
		legend: { position: "top" },
		smooth: true,
		animation: {
			appear: {
				animation: "path-in",
				duration: 2000,
			},
		},
	};
	return (
		<div>
			<div className="flex">
				<p />
				<ViewSelector handleChangeOption={handleChangeOption} />
			</div>
			<Area style={{ paddingTop: "20px" }} {...config} />
		</div>
	);
}
