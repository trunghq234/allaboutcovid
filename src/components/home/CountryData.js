import moment from "moment";
import React, { useEffect, useState } from "react";

export default function CountryData({ data }) {
	const [dataDisplay, setDataDisplay] = useState([]);

	useEffect(() => {
		if (data) {
			setDataDisplay([
				{
					key: "1",
					title: "Confirmed cases",
					number: data.cases,
					icon: "fas fa-biohazard",
					color: "primary",
				},
				{
					key: "2",
					title: "Active cases",
					number: data.active,
					icon: "fas fa-virus",
					color: "orange",
				},
				{
					key: "3",
					title: "Recovered",
					number: data.recovered,
					icon: "fas fa-capsules",
					color: "green",
				},
				{
					key: "4",
					title: "Deaths",
					number: data.deaths,
					icon: "fas fa-skull-crossbones",
					color: "dark2",
				},
			]);
		}
	}, [data]);

	return (
		<div className="countryData">
			<p>{"Updated on " + moment.utc().format("DD/MM/YYYY")}</p>
			{dataDisplay.map((item) => {
				return (
					<div key={item.key} className="content">
						<div className="icon">
							<i className={item.icon} />
						</div>
						<div className="number">
							<p>{item.title}</p>
							<h3 className={item.color}>
								{item.number ? item.number.toLocaleString() : "NaN"}
							</h3>
						</div>
					</div>
				);
			})}
		</div>
	);
}
