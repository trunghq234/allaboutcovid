import React, { useState } from 'react';
import { Card, Tag, Modal } from 'antd';
import syringe from '../../assets/images/syringe.png';
import people from '../../assets/images/people.png';
import { getWorldVaccine } from '../../apis/index';
import VaccineChart from './VaccineChart';
import { COLORS } from '../../constaints/colors';

export default function VaccineDetails({ data }) {
  const [visible, setVisible] = useState(false);
  const [countryData, setCountryData] = useState({});

  const fetchCountryData = (country) => {
    getWorldVaccine()
      .then((res) => {
        const tmp = res.data.find((item) => item.country === country);
        setCountryData(tmp);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Card>
        <div className="flex">
          <button
            className="transperantButton"
            onClick={() => {
              fetchCountryData(data.country);
              setVisible(true);
            }}>
            <h3 style={{ margin: 'auto 0px', textAlign: 'left' }}>
              {data.country}
            </h3>
          </button>
          <Tag className="flex" color="#ECF9F4">
            <img height="18px" width="18px" alt="syringe" src={syringe} />
            <p className="vaccineDetail" style={{ color: '#159655' }}>
              {data.oneDose ? data.oneDose.toLocaleString() : 'NaN'}
            </p>
          </Tag>
        </div>
        <div style={{ marginTop: '14px' }} className="flex">
          <Tag className="flex" color="#F1FBFD">
            <img height="14px" width="14px" alt="people" src={people} />
            <p
              className="vaccineDetail"
              style={{
                color: COLORS.teal,
                fontWeight: 'bold',
                fontSize: '0.6rem',
              }}>
              {data.fullyRatio
                ? data.fullyRatio + ' fully vaccinated'
                : data.oneDoseRatio + ' received at least 1 dose'}
            </p>
          </Tag>
          <p
            className="vaccineDetail"
            style={{ color: '#479067', fontWeight: '600' }}>
            {'+ '}
            {data.today ? data.today.toLocaleString() : 0}
          </p>
        </div>
      </Card>
      <Modal
        title={countryData.country + "'s statistics"}
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}>
        <VaccineChart data={countryData.data} />
      </Modal>
    </>
  );
}
