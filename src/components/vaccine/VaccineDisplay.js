import { Card, Col, Row } from "antd";
import React from "react";

export default function VaccineDisplay({ data }) {
	return (
		<div>
			<Row gutter={[16, 16]}>
				{data.map((item, index) => {
					return (
						<Col key={index} span={12}>
							<Card className="vaccineDisplay">
								<h1>{item.title}</h1>
								<h2 className={item.color}>{item.total.toLocaleString()}</h2>
								<p className={item.color}>{item.ratio.toFixed(2) + " %"}</p>
							</Card>
						</Col>
					);
				})}
			</Row>
		</div>
	);
}
