import React, { useState, useEffect } from "react";
import { Area, Column } from "@ant-design/charts";
import { COLORS } from "../../constaints/colors";
import moment from "moment";
import ViewSelector from "../home/ViewSelector";

export default function VNVaccineChart({ title, data, type }) {
	const [dataSource, setDataSource] = useState([]);
	const [optionView, setOptionView] = useState("");

	const handleChangeOption = (e) => {
		setOptionView(e.target.value);
	};

	useEffect(() => {
		if (data.first != null && data.second != null) {
			const first = data.first;
			const second = data.second;
			switch (optionView) {
				case "30":
					generateData(
						first.slice(Math.max(first.length - 30)),
						second.slice(Math.max(second.length - 30)),
						type
					);
					break;
				case "7":
					generateData(
						first.slice(Math.max(first.length - 7)),
						second.slice(Math.max(second.length - 7)),
						type
					);
					break;
				default:
					generateData(first, second, type);
					break;
			}
		}
	}, [optionView, data, type]);

	const generateData = (first, second, type) => {
		const tmp = [];
		first.forEach((element) => {
			tmp.push({
				category: "First",
				date: moment.utc(element.x).format("DD/MM/YY"),
				value: type === "all" ? element.z : element.y,
			});
		});
		second.forEach((element) => {
			tmp.push({
				category: "Fully",
				date: moment.utc(element.x).format("DD/MM/YY"),
				value: type === "all" ? element.z : element.y,
			});
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
			{type === "all" ? (
				<Area style={{ paddingTop: "20px" }} {...config} />
			) : (
				<Column style={{ paddingTop: "20px" }} {...config} />
			)}
		</div>
	);
}
