import React from "react";
import { Select, Form } from "antd";
import ReactCountryFlag from "react-country-flag";
import { COUNTRIES } from "../../constaints/countries";

const { Option } = Select;
export default function CountrySelector({ selectedCountry, handleChange }) {
	return (
		<Form
			initialValues={{
				countrySelector: "Viet Nam",
			}}
		>
			<Form.Item
				style={{ margin: "0px" }}
				name="countrySelector"
				rules={[{ required: true, message: "Please select a country!" }]}
			>
				<Select
					className="selectCountry"
					style={{ width: "100%" }}
					size="large"
					value={selectedCountry}
					onSelect={handleChange}
					showSearch
					placeholder="Select a country"
				>
					{COUNTRIES.map((country) => {
						return (
							<Option
								key={country.code}
								value={country.name}
								label={country.name}
							>
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
			</Form.Item>
		</Form>
	);
}
