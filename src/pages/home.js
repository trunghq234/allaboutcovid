import { Row, Col, Card } from "antd";
import React, { useEffect, useState } from "react";
import CasesDisplay from "../components/home/CasesDisplay";
import CountryData from "../components/home/CountryData";
import CountrySelector from "../components/home/CountrySelector";
import CountriesTable from "../components/home/CountriesTable";
import {
	getAllCountriesData,
	getCountryData,
	getCountryHistoricalData,
} from "../apis";
import { COUNTRIES } from "../constaints/countries";
import CountryChart from "../components/home/CountryChart";

export default function AppHome() {
	const [selectedCountry, setSelectedCountry] = useState("");
	const [data, setData] = useState([]);
	const [globalData, setGlobalData] = useState([]);
	const [historicData, setHistoricData] = useState({});
	const fetchCountryData = (selectedCountry) => {
		const country = COUNTRIES.find(
			(country) => country.name === selectedCountry
		);
		const countryCode = country ? country.code : "VN";
		getCountryData(countryCode)
			.then((res) => setData(res.data))
			.catch((err) => console.log(err));
	};
	const fetchCountryHistoricalData = (selectedCountry) => {
		const country = COUNTRIES.find(
			(country) => country.name === selectedCountry
		);
		const countryCode = country ? country.code : "VN";
		getCountryHistoricalData(countryCode)
			.then((res) => setHistoricData(res.data))
			.catch((err) => console.log(err));
	};

	const handleChange = (key) => {
		setSelectedCountry(key);
	};

	useEffect(() => {
		fetchCountryData(selectedCountry);
		fetchCountryHistoricalData(selectedCountry);
	}, [selectedCountry]);

	useEffect(() => {
		getAllCountriesData()
			.then((res) => setGlobalData(res.data))
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="container-fluid">
			<CasesDisplay />
			<div className="block">
				<Row gutter={[16, 16]}>
					<Col span={6}>
						<Card>
							<CountrySelector
								selectedCountry={selectedCountry}
								handleChange={handleChange}
							/>
							<CountryData data={data} />
						</Card>
					</Col>
					<Col span={18}>
						<Card>
							<CountryChart historicData={historicData} />
						</Card>
					</Col>
				</Row>
			</div>
			<CountriesTable data={globalData} />
		</div>
	);
}
