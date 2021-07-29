import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { getNews } from "../apis";
import NewsCard from "../components/news/newsCard";

export default function AppNews() {
	const [data, setData] = useState([]);

	const fetchNews = () => {
		getNews()
			.then((res) => {
				setData(res.data.data["1004765"].data);
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
					return <NewsCard data={item} />;
				})}
			</div>
		</div>
	);
}
