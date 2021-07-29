import React, { useEffect, useState } from "react";
import { getHCMCases, getProvincesData, getVietNamCases } from "../apis";
import DataTable from "../components/vietnam/DataTable";
import { Row, Col, Card, Divider } from "antd";
import ChartByDay from "../components/vietnam/ChartByDay";
import ViewSelector from "../components/home/ViewSelector";
import HCMChart from "../components/vietnam/HCMChart";
import HCMChartByDay from "../components/vietnam/HCMChartByDay";
import { hourConverter } from "../utils/dataFortmatter";
import moment from "moment";

export default function VietNam() {
	// const [cases, setCases] = useState([]);
	const [casesByDay, setCasesByDay] = useState([]);
	const [provincesData, setProvincesData] = useState([]);
	const [optionView, setOptionView] = useState("");
	const [hcmCases, setHcmCases] = useState([]);
	const [hcmCasesByDay, setHCMCasesByDay] = useState([]);
	const [lastUpdated, setLastUpdated] = useState("");

	const fetchProvincesData = () => {
		getProvincesData()
			.then((res) => {
				setProvincesData(
					res.data.data.cases.sort((first, second) => first.z > second.z)
				);
			})
			.catch((err) => console.log(err));
	};

	const fetchCasesByDay = () => {
		getVietNamCases()
			.then((res) => {
				setCasesByDay(res.data.data.vnSeason4Daily.cases);
				const lastTime = res.data.data.vnSeason4CommunityDaily.lastUpdated;
				const time = hourConverter(lastTime);
				const now = moment().utc(7).hour();
				const diff = now - time;
				setLastUpdated(
					`Last updated ${diff} ${diff < 2 ? "hour" : "hours"} ago`
				);
			})
			.catch((err) => console.log(err));
	};

	const fetchHCMCases = () => {
		getHCMCases()
			.then((res) => {
				setHcmCases(res.data.data.all.cases);
				setHCMCasesByDay(res.data.data.daily.cases);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchProvincesData();
		fetchCasesByDay();
		fetchHCMCases();
	}, []);

	const handleChangeOption = (e) => {
		setOptionView(e.target.value);
	};
	return (
		<div className="container-fluid">
			{/* <CasesDisplay cases={cases} /> */}
			{/* <p className="lastUpdated">{lastUpdated}</p> */}
			<Divider style={{ fontSize: "20px", marginTop: "40px" }}>
				A fourth wave of COVID-19
			</Divider>
			<div className="block">
				<div className="titleHolder">
					<h1>Detail statistics</h1>
				</div>
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
			<div className="block">
				<div className="titleHolder">
					<h1>HCM statistics</h1>
				</div>
				<Row gutter={[16, 16]}>
					<Col span={12}>
						<Card>
							<h1>Total cases</h1>
							<HCMChart data={hcmCases} />
						</Card>
					</Col>
					<Col span={12}>
						<Card>
							<h1>Confirmed cases by day</h1>
							<HCMChartByDay data={hcmCasesByDay} />
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
}
