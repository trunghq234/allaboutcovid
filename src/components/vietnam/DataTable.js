import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { COLORS } from "../../constaints/colors";

const columns = [
	{
		title: "Provinces",
		dataIndex: "province",
		width: "40%",
	},
	{
		title: "Total",
		dataIndex: "total",
		sorter: {
			compare: (a, b) => a.total - b.total,
		},
		width: "15%",
		align: "right",
		defaultSortOrder: "descend",
		render: (text) => <div>{text.toLocaleString()}</div>,
	},
	{
		title: "Today",
		dataIndex: "today",
		sorter: {
			compare: (a, b) => a.today - b.today,
		},
		width: "15%",
		align: "right",
		render: (text) => (
			<div style={{ color: COLORS.primary }}>{text.toLocaleString()}</div>
		),
	},
];

export default function DataTable({ data }) {
	const [dataSource, setDataSource] = useState([]);
	useEffect(() => {
		const tmp = [];
		data.forEach((element) => {
			tmp.push({
				province: element.x,
				total: element.z,
				today: element.y,
			});
		});
		setDataSource(tmp);
	}, [data]);
	return (
		<>
			<div className="titleHolder">
				<h1>Situation in provinces</h1>
			</div>
			<Table size="small" bordered columns={columns} dataSource={dataSource} />
		</>
	);
}
