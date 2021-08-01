import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import { COLORS } from "../../constaints/colors";
import moment from "moment";
import ViewSelector from "../home/ViewSelector";

export default function VNVaccineChart({ title, data }) {
	const [dataSource, setDataSource] = useState([]);
	const [optionView, setOptionView] = useState("");

	const handleChangeOption = (e) => {
		setOptionView(e.target.value);
	};

	useEffect(() => {
		if (Array.isArray(data)) {
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
		data.forEach((element) => {
			tmp.push(
				{
					category: "First",
					date: moment.utc(element.date).format("DD/MM/YY"),
					value: element.total_vaccinations,
				},
				{
					category: "Fully",
					date: moment.utc(element.date).format("DD/MM/YY"),
					value: element.people_fully_vaccinated,
				}
			);
		});
		setDataSource(tmp);
	};

	var config = {
		data: dataSource,
		isGroup: true,
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
		legend: { position: "top-left" },
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
				<h1>{title}</h1>
				<ViewSelector handleChangeOption={handleChangeOption} />
			</div>
			<Line style={{ paddingTop: "20px" }} {...config} />
		</div>
	);
}
