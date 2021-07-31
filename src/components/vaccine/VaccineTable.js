import { Col, Row } from "antd";
import React from "react";
import VaccineDetails from "./VaccineDetails";

export default function VaccineTable({ data }) {
	return (
		<Row gutter={[16, 16]}>
			{Array.isArray(data) &&
				data.map((item, index) => {
					return (
						<Col key={index} span={8}>
							<VaccineDetails data={item} />
						</Col>
					);
				})}
		</Row>
	);
}
