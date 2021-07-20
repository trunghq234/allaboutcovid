import React from "react";
import { Table } from "antd";
import ReactCountryFlag from "react-country-flag";

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
	},
	{
		title: "Active cases",
		dataIndex: "activeCases",
		sorter: {
			compare: (a, b) => a.activeCases - b.activeCases,
		},
		width: "10%",
	},
	{
		title: "Total cases",
		dataIndex: "totalCases",
		sorter: {
			compare: (a, b) => a.totalCases - b.totalCases,
		},
		width: "10%",
	},
	{
		title: "New Cases",
		dataIndex: "newCases",
		sorter: {
			compare: (a, b) => a.newCases - b.newCases,
		},
		width: "10%",
		render: (text) => <div style={{ color: "orange" }}>{text}</div>,
	},
	{
		title: "Total recovered",
		dataIndex: "recovered",
		sorter: {
			compare: (a, b) => a.recovered - b.recovered,
		},
		width: "10%",
	},
	{
		title: "New Recovered",
		dataIndex: "newRecovered",
		sorter: {
			compare: (a, b) => a.newRecovered - b.newRecovered,
		},
		width: "10%",
		render: (text) => <div style={{ color: "#12CA5B" }}>{text}</div>,
	},
	{
		title: "Total deaths",
		dataIndex: "deaths",
		sorter: {
			compare: (a, b) => a.deaths - b.deaths,
		},
		width: "10%",
	},
	{
		title: "New deaths",
		dataIndex: "newDeaths",
		sorter: {
			compare: (a, b) => a.newDeaths - b.newDeaths,
		},
		width: "10%",
	},
];

const data = [
	{
		key: "1",
		country: {
			name: "China",
			code: "US",
		},
		activeCases: "123,128,123",
		totalCases: 98,
		newCases: 60,
		recovered: 70,
		newRecovered: 10,
		deaths: 10,
		newDeaths: 1,
	},
	{
		key: "2",
		country: {
			name: "China",
			code: "US",
		},
		activeCases: "123,128,123",
		totalCases: 98,
		newCases: 60,
		recovered: 70,
		newRecovered: 10,
		deaths: 10,
		newDeaths: 1,
	},
	{
		key: "3",
		country: {
			name: "China",
			code: "US",
		},
		activeCases: "123,128,123",
		totalCases: 98,
		newCases: 60,
		recovered: 70,
		newRecovered: 10,
		deaths: 10,
		newDeaths: 1,
	},
];

export default function CountriesTable() {
	return (
		<div>
			<Table columns={columns} dataSource={data} />
		</div>
	);
}
