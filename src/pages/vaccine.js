import React, { useState, useEffect } from 'react';
import { getWorldVaccine } from '../apis';
import { Row } from 'antd';
import SortSelector from '../components/vaccine/SortSelector';
import VaccineDisplay from '../components/vaccine/VaccineDisplay';
import VaccineTable from '../components/vaccine/VaccineTable';
import CardSkeleton from '../components/vaccine/CardSkeleton';

export default function Vaccine() {
  const [worldData, setWorldData] = useState([]);
  const [data, setData] = useState([]);
  const [sortOption, setSortOption] = useState('2');
  const [loading, setLoading] = useState(true);
  const [loadingTable, setLoadingTable] = useState(true);
  const array = [];
  array.length = 9;

  const handleChange = (key) => {
    setSortOption(key);
    sort(key);
  };
  const sort = (sortOption) => {
    switch (sortOption) {
      case '1':
        const tmp = data.sort((first, second) =>
          first.country.localeCompare(second.country)
        );
        setData(tmp);
        break;
      case '3':
        {
          const tmp = data.sort(
            (first, second) => -first.fullyRatio + second.fullyRatio
          );
          setData(tmp);
        }
        break;
      default:
        {
          const tmp = data.sort(
            (first, second) => -first.oneDose + second.oneDose
          );
          setData(tmp);
        }
        break;
    }
  };

  const fetchData = () => {
    getWorldVaccine()
      .then((res) => {
        const tmp = res.data.filter(
          (item) =>
            item.iso_code.substring(0, 4) !== 'OWID' &&
            item.data[item.data.length - 1]
              .people_fully_vaccinated_per_hundred < 100
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
        setLoadingTable(false);
        const worldData = res.data.find((item) => item.country === 'World');
        return worldData.data.pop();
      })
      .then((res) => {
        setLoading(false);
        setWorldData([
          {
            title: 'At least one dose',
            total: res.people_vaccinated,
            ratio: res.people_vaccinated_per_hundred,
            color: 'green',
          },
          {
            title: 'Fully vaccinated',
            total: res.people_fully_vaccinated,
            ratio: res.people_fully_vaccinated_per_hundred,
            color: 'teal',
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
        <Row gutter={[16, 16]}>
          {loading ? (
            <>
              <CardSkeleton xs={24} sm={12} md={12} lg={12} count={3} />
              <CardSkeleton xs={24} sm={12} md={12} lg={12} count={3} />
            </>
          ) : (
            <div></div>
          )}
          {worldData.map((item, index) => (
            <VaccineDisplay key={index} data={item} />
          ))}
        </Row>
      </div>
      <div className="block">
        <div className="titleHolder">
          <div className="flex">
            <h1>World statistics</h1>
            <SortSelector sortOption={sortOption} handleChange={handleChange} />
          </div>
        </div>
        <Row gutter={[16, 16]}>
          {loadingTable ? (
            <>
              <CardSkeleton xs={24} sm={24} md={12} lg={8} count={2} />
              <CardSkeleton xs={24} sm={24} md={12} lg={8} count={2} />
              <CardSkeleton xs={24} sm={24} md={12} lg={8} count={2} />
              <CardSkeleton xs={24} sm={24} md={12} lg={8} count={2} />
              <CardSkeleton xs={24} sm={24} md={12} lg={8} count={2} />
              <CardSkeleton xs={24} sm={24} md={12} lg={8} count={2} />
              <CardSkeleton xs={24} sm={24} md={12} lg={8} count={2} />
              <CardSkeleton xs={24} sm={24} md={12} lg={8} count={2} />
              <CardSkeleton xs={24} sm={24} md={12} lg={8} count={2} />
            </>
          ) : (
            <></>
          )}{' '}
        </Row>
        <VaccineTable data={data} />
      </div>
    </div>
  );
}
