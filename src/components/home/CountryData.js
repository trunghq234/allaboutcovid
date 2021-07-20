import React from "react";

export default function CountryData() {
	const data = [
		{
			key: "1",
			title: "Confirmed cases",
			number: "1,213,134",
			icon: "fas fa-biohazard",
		},
		{
			key: "2",
			title: "Active cases",
			number: "1,213,134",
			icon: "fas fa-virus",
		},
		{
			key: "1",
			title: "Recovered",
			number: "1,213,134",
			icon: "fas fa-skull-crossbones",
		},
		{
			key: "3",
			title: "Deaths",
			number: "1,213,134",
			icon: "fas fa-capsules",
		},
	];
	return (
		<div className="countryData">
			<p>Updated 15 mins ago</p>
			{data.map((item) => {
				return (
					<div className="content">
						<div className="icon">
							<i class={item.icon} />
						</div>
						<div className="number">
							<p>{item.title}</p>
							<h3>{item.number}</h3>
						</div>
					</div>
				);
			})}
		</div>
	);
}
