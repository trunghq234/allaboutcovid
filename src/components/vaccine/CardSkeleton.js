import { Card, Col } from "antd";
import React from "react";
import Skeleton from "react-loading-skeleton";

export default function CardSkeleton({ xs, sm, md, lg, count }) {
	return (
		<Col
			xs={{ span: xs }}
			sm={{ span: sm }}
			md={{ span: md }}
			lg={{ span: lg }}
		>
			<Card>
				<Skeleton
					style={{
						display: "flex",
						margin: "10px auto",
					}}
					height={20}
					count={count}
				/>
			</Card>
		</Col>
	);
}
