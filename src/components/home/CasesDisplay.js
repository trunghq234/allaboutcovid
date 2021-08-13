import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import { getGlobalReport } from "../../apis";
import CountUp from "react-countup";

export default function CasesDisplay() {
	const [data, setData] = useState([]);
	useEffect(() => {
		getGlobalReport()
			.then((res) => {
				setData([
					{
						key: "1",
						title: "Confirmed cases",
						num: res.data.cases,
						diff: res.data.todayCases,
						color: "primary",
						sign: "+",
					},
					{
						key: "2",
						title: "Active cases",
						num: res.data.cases - res.data.deaths - res.data.recovered,
						diff:
							res.data.todayCases -
							res.data.todayDeaths -
							res.data.todayRecovered,
						color: "orange",
						sign: res.data.todayCases > res.data.todayRecovered ? "+" : "-",
					},
					{
						key: "3",
						title: "Recovered",
						num: res.data.recovered,
						diff: res.data.todayRecovered,
						color: "green",
						sign: "+",
					},
					{
						key: "4",
						title: "Deaths",
						num: res.data.deaths,
						diff: res.data.todayDeaths,
						color: "dark2",
						sign: "+",
					},
				]);
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<div className="block">
			<div className="titleHolder">
				<h1>Global statistics</h1>
			</div>
			<Row gutter={[16, 16]}>
				{data.map((item) => {
					return (
						<Col
							xs={{ span: 24 }}
							sm={{ span: 12 }}
							lg={{ span: 6 }}
							key={item.key}
						>
							<Card className="casesDisplay">
								<h3>{item.title}</h3>
								<h2 className={item.color}>
									<CountUp
										end={item.num}
										duration={0.5}
										formattingFn={(n) => n.toLocaleString()}
									/>
								</h2>
								<p className={item.color}>
									<CountUp
										end={item.diff}
										duration={0.5}
										formattingFn={(n) =>
											item.sign.toString().concat(n.toLocaleString())
										}
									/>
								</p>
							</Card>
						</Col>
					);
				})}
			</Row>
		</div>
	);
}
