import { Card, Skeleton } from "antd";
import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { timeConverter } from "../../utils/dataFortmatter";

export default function NewsCard({ data }) {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (data) {
			setTimeout(() => {
				setLoading(false);
			}, 200);
		}
	}, [data]);

	return (
		<Card style={{ marginBottom: "20px" }}>
			<Skeleton active avatar loading={loading}>
				<a
					target="_blank"
					rel="noreferrer"
					href={data.share_url}
					className="cardContent"
				>
					<img
						alt={data.title}
						width={160}
						height={160}
						src={data.thumbnail_url}
					/>
					<div className="contentCard">
						<h1>{data.title}</h1>
						<h3>{data.lead}</h3>
						<p className="lastUpdated">{timeConverter(data.publish_time)}</p>
					</div>
				</a>
			</Skeleton>
		</Card>
	);
}
