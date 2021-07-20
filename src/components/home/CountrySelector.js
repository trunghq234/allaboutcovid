import React from "react";
import { Select } from "antd";
import ReactCountryFlag from "react-country-flag";
import { countries } from "../../constaints/countries";

const Countries = countries;
const { Option } = Select;
export default function CountrySelector({ selectedCountry, handleChange }) {
	return (
		<Select
			className="selectCountry"
			style={{ width: "100%" }}
			size="large"
			value={selectedCountry}
			onChange={handleChange}
			showSearch
			placeholder="Select country"
		>
			{Countries.map((country) => {
				return (
					<Option key={country.code} value={country.name} label={country.name}>
						<div className="option">
							<ReactCountryFlag
								countryCode={country.code}
								svg
								style={{
									width: "1.2em",
									height: "1.2em",
									verticalAlign: "sub",
									marginRight: "8px",
								}}
							/>
							<span>{country.name}</span>
						</div>
					</Option>
				);
			})}
		</Select>
	);
}
