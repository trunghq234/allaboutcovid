import { Row, Col, Card } from "antd";
import React, { useState } from "react";
import CasesDisplay from "../components/home/CasesDisplay";
import CountryData from "../components/home/CountryData";
import CountrySelector from "../components/home/CountrySelector";
import CountriesTable from "../components/home/CountriesTable";

export default function AppHome() {
	const [selectedCountry, setSelectedCountry] = useState("");
	const handleChange = (key) => {
		setSelectedCountry(key);
	};

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
							<CountryData />
						</Card>
					</Col>
					<Col span={18}>
						<Card>
							<h1>abc</h1>
						</Card>
					</Col>
				</Row>
			</div>
			<CountriesTable />
		</div>
	);
}
