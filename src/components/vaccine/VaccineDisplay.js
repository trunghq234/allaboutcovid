import { Card, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

export default function VaccineDisplay({ data }) {
  const [item, setItem] = useState({});

  useEffect(() => {
    if (data) {
      setItem({
        title: data.title,
        total: data.total.toLocaleString(),
        ratio: data.ratio.toFixed(2) + ' %',
        color: data.color,
      });
    }
  }, [data]);
  return (
    <Col xs={{ span: 24 }} sm={{ span: 12 }}>
      <Card className="vaccineDisplay">
        <h1>{item.title || <Skeleton />}</h1>
        <h2 className={item.color}>{item.total || <Skeleton />}</h2>
        <p className={item.color}>{item.ratio || <Skeleton />}</p>
      </Card>
    </Col>
  );
}
