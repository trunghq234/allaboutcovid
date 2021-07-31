import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { getNews } from "../apis";
import NewsCard from "../components/news/newsCard";

export default function AppNews() {
	const [data, setData] = useState([]);

	const fetchNews = () => {
		getNews()
			.then((res) => {
				setData(
					res.data.data["1004765"].data.sort(
						(first, second) => first.publish_time > second.publish_time
					)
				);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchNews();
	}, []);

	return (
		<div className="container-fluid">
			<div className="block">
				<h1>News</h1>
				{data.map((item) => {
					return <NewsCard key={item.article_id} data={item} />;
				})}
			</div>
		</div>
	);
}
