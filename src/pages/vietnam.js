import React, { useEffect, useState } from "react";
import { getProvincesData, getVietNamCases } from "../apis";
import CasesDisplay from "../components/vietnam/CasesDisplay";
import DataTable from "../components/vietnam/DataTable";
import { Row, Col, Card } from "antd";
import ChartByDay from "../components/vietnam/ChartByDay";
import ViewSelector from "../components/home/ViewSelector";

export default function VietNam() {
	// const [cases, setCases] = useState([]);
	const [casesByDay, setCasesByDay] = useState([]);
	const [provincesData, setProvincesData] = useState([]);
	const [optionView, setOptionView] = useState("");

	useEffect(() => {
		getVietNamCases().then((res) => {
			console.log(res.data.data.vnSeason4Daily.cases);
			setCasesByDay(res.data.data.vnSeason4Daily.cases);
		});
	}, []);

	useEffect(() => {
		getProvincesData()
			.then((res) => {
				setProvincesData(
					res.data.data.cases.sort((first, second) => first.z > second.z)
				);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleChangeOption = (e) => {
		setOptionView(e.target.value);
	};
	return (
		<div className="container-fluid">
			{/* <CasesDisplay cases={cases} /> */}
			<div className="block">
				<Row gutter={[16, 16]}>
					<Col span={10}>
						<Card>
							<DataTable data={provincesData} />
						</Card>
					</Col>
					<Col span={14}>
						<Card>
							<div className="flex">
								<h1>Confirmed cases by day</h1>
								<ViewSelector handleChangeOption={handleChangeOption} />
							</div>
							<ChartByDay option={optionView} data={casesByDay} />
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
}
