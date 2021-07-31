import React, { useState, useEffect } from "react";
import { getWorldVaccine } from "../apis";
import VaccineDisplay from "../components/vaccine/VaccineDisplay";
import VaccineTable from "../components/vaccine/VaccineTable";

export default function Vaccine() {
	const [worldData, setWorldData] = useState([]);
	const [data, setData] = useState({});

	const fetchData = () => {
		getWorldVaccine()
			.then((res) => {
				const tmp = res.data.filter(
					(item) => item.iso_code.substring(0, 4) !== "OWID"
				);

				const arrayCountry = [];
				tmp.forEach((item) => {
					const lastElement = item.data[item.data.length - 1];
					arrayCountry.push({
						country: item.country,
						oneDose: lastElement.people_vaccinated
							? lastElement.people_vaccinated
							: 0,
						oneDoseRatio: lastElement.people_vaccinated_per_hundred,
						fully: lastElement.people_fully_vaccinated
							? lastElement.people_fully_vaccinated
							: lastElement.total_vaccinations,
						fullyRatio: lastElement.people_fully_vaccinated_per_hundred
							? lastElement.people_fully_vaccinated_per_hundred
							: lastElement.total_vaccinations_per_hundred,
						today: lastElement.daily_vaccinations_raw
							? lastElement.daily_vaccinations_raw
							: lastElement.daily_vaccinations,
					});
				});
				arrayCountry.sort((first, second) => -first.oneDose + second.oneDose);
				setData(arrayCountry);
				const worldData = res.data.find((item) => item.country === "World");
				return worldData.data.pop();
			})
			.then((res) => {
				setWorldData([
					{
						title: "At least one dose",
						total: res.people_vaccinated,
						ratio: res.people_vaccinated_per_hundred,
						color: "green",
					},
					{
						title: "Fully vaccinated",
						total: res.people_fully_vaccinated,
						ratio: res.people_fully_vaccinated_per_hundred,
						color: "teal",
					},
				]);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="container-fluid">
			<div className="block">
				<div className="titleHolder">
					<h1>World statistics</h1>
				</div>
				<VaccineDisplay data={worldData} />
			</div>
			<div className="block">
				<div className="titleHolder">
					<h1>World statistics</h1>
				</div>
				<VaccineTable data={data} />
			</div>
		</div>
	);
}
