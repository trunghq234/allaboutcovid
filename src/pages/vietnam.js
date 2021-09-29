import React, { useEffect, useState } from 'react';
import {
  getHCMCases,
  getProvincesData,
  getVietNamCases,
  getWorldVaccine,
} from '../apis';
import DataTable from '../components/vietnam/DataTable';
import { Row, Col, Card, Divider } from 'antd';
import Chart from '../components/vietnam/Chart';
import { hourConverter } from '../utils/dataFortmatter';
import moment from 'moment';
import VaccineDisplay from '../components/vaccine/VaccineDisplay';
import VaccineChart from '../components/vaccine/VaccineChart';

export default function VietNam() {
  const [casesByDay, setCasesByDay] = useState([]);
  const [provincesData, setProvincesData] = useState([]);
  const [hcmCases, setHcmCases] = useState([]);
  const [hcmCasesByDay, setHCMCasesByDay] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');
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
          `Last updated ${diff < 0 ? diff + 24 : diff} ${
            diff < 2 ? 'hour' : 'hours'
          } ago`
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
    getWorldVaccine()
      .then((res) => {
        return res.data.find((item) => item.country === 'Vietnam').data;
      })
      .then((res) => {
        setVaccine([
          {
            title: 'At least one dose',
            total: res[res.length - 1].total_vaccinations,
            ratio: res[res.length - 1].total_vaccinations_per_hundred,
            color: 'green',
          },
          {
            title: 'Fully vaccinated',
            total: res[res.length - 1].people_fully_vaccinated,
            ratio: res[res.length - 1].people_fully_vaccinated_per_hundred,
            color: 'teal',
          },
        ]);
        setVaccineHistory(res);
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
      <Divider
        style={{ fontSize: '2rem', fontWeight: '600', marginTop: '40px' }}>
        A fourth wave of COVID-19
      </Divider>
      <p style={{ textAlign: 'center' }}>{lastUpdated}</p>
      <div className="block">
        <div className="titleHolder">
          <h1>Detail statistics</h1>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={{ span: 24 }} md={{ span: 10 }}>
            <Card>
              <DataTable data={provincesData} />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 14 }}>
            <Card>
              <Chart key={1} title="Confirmed cases by day" data={casesByDay} />
            </Card>
          </Col>
        </Row>
      </div>
      <div className="block">
        <div className="titleHolder">
          <h1>HCM statistics</h1>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Card>
              <Chart key={2} title="Confirmed cases" data={hcmCases} />
            </Card>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Card>
              <Chart
                key={3}
                title="Confirmed cases by day"
                data={hcmCasesByDay}
              />
            </Card>
          </Col>
        </Row>
      </div>
      <div className="block">
        <div className="titleHolder">
          <h1>Vaccine statistics</h1>
        </div>
        <Row gutter={[16, 16]}>
          {vaccine.map((item, index) => (
            <VaccineDisplay key={index} data={item} />
          ))}
        </Row>
        {/* <VaccineDisplay data={vaccine} /> */}
        <div style={{ marginTop: '40px' }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card>
                <VaccineChart title="Total" data={vaccineHistory} />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
