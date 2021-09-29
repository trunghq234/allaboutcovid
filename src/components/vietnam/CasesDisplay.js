import React from 'react';
import { Card, Col, Row } from 'antd';

export default function CasesDisplay({ cases }) {
  return (
    <div className="block">
      <div className="titleHolder">
        <h1>All statistics</h1>
      </div>
      <Row gutter={[16, 16]}>
        {cases.map((item) => {
          return (
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              lg={{ span: 6 }}
              key={item.key}>
              <Card className="casesDisplay">
                <h3>{item.title}</h3>
                <h2 className={item.color}>{item.num}</h2>
                <p className={item.color}>
                  {item.sign.toString().concat(item.diff)}
                </p>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
