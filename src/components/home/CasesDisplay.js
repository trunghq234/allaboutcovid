import React from "react";
import { Card, Col, Row } from "antd";

const items = [
	{
		key: "1",
		icon: <i className="fas fa-chart-pie"></i>,
		title: "High Performance",
		content: "123,456",
	},
	{
		key: "2",
		icon: <i className="fas fa-desktop"></i>,
		title: "Flat Design",
		content: "123,456",
	},
	{
		key: "3",
		icon: <i className="fas fa-database"></i>,
		title: "Simplified Workflow",
		content: "123,456",
	},
	{
		key: "4",
		icon: <i className="fas fa-database"></i>,
		title: "Simplified Workflow",
		content: "123,456",
	},
];

export default function CasesDisplay() {
	return (
		<div className="block">
			<div className="titleHolder">
				<h1>Global statistics</h1>
			</div>
			<Row gutter={[16, 16]}>
				{items.map((item) => {
					return (
						<Col span={6} key={item.key}>
							<Card className="casesDisplay">
								<h3>{item.title}</h3>
								<h2>{item.content}</h2>
								<p>{item.content}</p>
							</Card>
						</Col>
					);
				})}
			</Row>
		</div>
	);
}
