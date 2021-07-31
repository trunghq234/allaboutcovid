import React, { useEffect, useState } from "react";
import {
	getHCMCases,
	getProvincesData,
	getVietNamCases,
	getVietNamVaccine,
} from "../apis";
import DataTable from "../components/vietnam/DataTable";
import { Row, Col, Card, Divider } from "antd";
import Chart from "../components/vietnam/Chart";
import { hourConverter } from "../utils/dataFortmatter";
import moment from "moment";
import VaccineDisplay from "../components/vaccine/VaccineDisplay";
import VNVaccineChart from "../components/vietnam/VNVaccineChart";

export default function VietNam() {
	// const [cases, setCases] = useState([]);
	const [casesByDay, setCasesByDay] = useState([]);
	const [provincesData, setProvincesData] = useState([]);
	const [hcmCases, setHcmCases] = useState([]);
	const [hcmCasesByDay, setHCMCasesByDay] = useState([]);
	const [lastUpdated, setLastUpdated] = useState("");
	const [vaccine, setVaccine] = useState([]);
	const [vaccineHistory, setVaccineHistory] = useState({});

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

	const fetchVaccine = () => {
		getVietNamVaccine()
			.then((res) => {
				return res.data.data;
			})
			.then((res) => {
				setVaccine([
					{
						title: "At least one dose",
						total: res.first.total,
						ratio: res.firstRatio,
						color: "green",
					},
					{
						title: "Fully vaccinated",
						total: res.second.total,
						ratio: res.secondRatio,
						color: "teal",
					},
				]);
				setVaccineHistory({
					first: res.first.datas,
					second: res.second.datas,
				});
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchProvincesData();
		fetchCasesByDay();
		fetchHCMCases();
		fetchVaccine();
	}, []);

	return (
		<div className="container-fluid">
			{/* <CasesDisplay cases={cases} /> */}
			{/* <p className="lastUpdated">{lastUpdated}</p> */}
			<Divider style={{ fontSize: "20px", marginTop: "40px" }}>
				A fourth wave of COVID-19
			</Divider>
			<p>{lastUpdated}</p>
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
							<Chart title="Confirmed cases by day" data={casesByDay} />
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
							<Chart title="Confirmed cases" data={hcmCases} />
						</Card>
					</Col>
					<Col span={12}>
						<Card>
							<Chart title="Confirmed cases by day" data={hcmCasesByDay} />
						</Card>
					</Col>
				</Row>
			</div>
			<div className="block">
				<div className="titleHolder">
					<h1>Vaccine statistics</h1>
				</div>
				<VaccineDisplay data={vaccine} />
				<div style={{ marginTop: "40px" }}>
					<Row gutter={[16, 16]}>
						<Col span={12}>
							<Card>
								<VNVaccineChart type="all" title="Total" data={vaccineHistory} />
							</Card>
						</Col>
						<Col span={12}>
							<Card>
								<VNVaccineChart
									type="byday"
									title="By day"
									data={vaccineHistory}
								/>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	);
}