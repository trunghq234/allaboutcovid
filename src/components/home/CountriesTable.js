import React, { useEffect, useState } from "react";
import { Table } from "antd";
import ReactCountryFlag from "react-country-flag";
import { COLORS } from "../../constaints/colors";

const columns = [
	{
		title: "Country",
		dataIndex: "country",
		render: (country) => (
			<div>
				<ReactCountryFlag
					countryCode={country.code}
					svg
					style={{
						width: "1.2em",
						height: "1.2em",
						verticalAlign: "sub",
						marginRight: "8px",
					}}
				/>
				{country.name}
			</div>
		),
		width: "10%",
		fixed: "left",
	},
	{
		title: "Active cases",
		dataIndex: "activeCases",
		sorter: {
			compare: (a, b) => a.activeCases - b.activeCases,
		},
		width: "10%",
		align: "right",
		render: (text) => (
			<div style={{ color: COLORS.orange }}>{text.toLocaleString()}</div>
		),
	},
	{
		title: "Total cases",
		dataIndex: "totalCases",
		sorter: {
			compare: (a, b) => a.totalCases - b.totalCases,
		},
		width: "10%",
		align: "right",
		defaultSortOrder: "descend",
		render: (text) => <div>{text.toLocaleString()}</div>,
	},
	{
		title: "New Cases",
		dataIndex: "newCases",
		sorter: {
			compare: (a, b) => a.newCases - b.newCases,
		},
		width: "10%",
		align: "right",
		render: (text) => (
			<div style={{ color: COLORS.primary }}>{text.toLocaleString()}</div>
		),
	},
	{
		title: "Total recovered",
		dataIndex: "recovered",
		sorter: {
			compare: (a, b) => a.recovered - b.recovered,
		},
		width: "10%",
		align: "right",
		render: (text) => <div>{text.toLocaleString()}</div>,
	},
	{
		title: "New Recovered",
		dataIndex: "newRecovered",
		sorter: {
			compare: (a, b) => a.newRecovered - b.newRecovered,
		},
		width: "10%",
		align: "right",
		render: (text) => (
			<div style={{ color: COLORS.green }}>{text.toLocaleString()}</div>
		),
	},
	{
		title: "Total deaths",
		dataIndex: "deaths",
		sorter: {
			compare: (a, b) => a.deaths - b.deaths,
		},
		width: "10%",
		align: "right",
		render: (text) => <div>{text.toLocaleString()}</div>,
	},
	{
		title: "New deaths",
		dataIndex: "newDeaths",
		sorter: {
			compare: (a, b) => a.newDeaths - b.newDeaths,
		},
		width: "10%",
		align: "right",
		render: (text) => (
			<div style={{ color: COLORS.dark }}>{text.toLocaleString()}</div>
		),
	},
];

export default function CountriesTable({ data }) {
	const [dataSource, setDataSource] = useState([]);
	useEffect(() => {
		const tmp = [];
		data.forEach((element) => {
			if (element.countryInfo.iso2) {
				tmp.push({
					key: element.countryInfo._id,
					country: {
						name: element.country,
						code: element.countryInfo.iso2,
					},
					activeCases: element.cases - element.deaths - element.recovered,
					totalCases: element.cases,
					newCases: element.todayCases,
					recovered: element.recovered,
					newRecovered: element.todayRecovered,
					deaths: element.deaths,
					newDeaths: element.todayDeaths,
				});
			}
		});
		setDataSource(tmp);
	}, [data]);
	return (
		<div className="block">
			<div className="titleHolder">
				<h1>All countries statistics</h1>
			</div>
			<Table columns={columns} dataSource={dataSource} scroll={{ x: 900 }} />
		</div>
	);
}
