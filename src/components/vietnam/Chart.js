import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import { COLORS } from '../../constaints/colors';
import moment from 'moment';
import ViewSelector from '../home/ViewSelector';

export default function Chart({ title, data }) {
  const [dataSource, setDataSource] = useState([]);
  const [optionView, setOptionView] = useState('');

  const handleChangeOption = (e) => {
    setOptionView(e.target.value);
  };

  useEffect(() => {
    if (Array.isArray(data)) {
      switch (optionView) {
        case '30':
          generateData(data.slice(Math.max(data.length - 30)));
          break;
        case '7':
          generateData(data.slice(Math.max(data.length - 7)));
          break;
        default:
          generateData(data);
          break;
      }
    }
  }, [optionView, data]);

  const generateData = (input) => {
    const tmp = [];
    input.forEach((element) => {
      tmp.push({
        date: moment.utc(element.x).format('DD/MM/YY'),
        value: element.y,
      });
    });
    setDataSource(tmp);
  };

  var config = {
    data: dataSource,
    xField: 'date',
    yField: 'value',
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return ''.concat(s, ',');
          });
        },
      },
    },
    tooltip: {
      formatter: function formatter(v) {
        return {
          name: v.date,
          value: ''
            .concat(v.value)
            .replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
              return ''.concat(s, ',');
            }),
        };
      },
    },
    autoFit: true,
    color: COLORS.orange,
    legend: { position: 'top-left' },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 2000,
      },
    },
  };
  return (
    <div>
      <div className="flex">
        <h1 className="titleChart">{title}</h1>
        <ViewSelector handleChangeOption={handleChangeOption} />
      </div>
      <Line style={{ paddingTop: '20px' }} {...config} />
    </div>
  );
}
