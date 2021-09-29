import { Card, Col, Row } from 'antd';
import React from 'react';
import { timeConverter } from '../../utils/dataFortmatter';

export default function NewsCard({ data }) {
  return (
    <Card style={{ marginBottom: '20px' }}>
      <a target="_blank" rel="noreferrer" href={data.share_url}>
        <Row gutter={[16, 16]}>
          <Col xs={{ span: 0 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <img
              style={{ borderRadius: '8px', height: '100%', width: '100%' }}
              alt={data.title}
              src={data.thumbnail_url}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 16 }} lg={{ span: 18 }}>
            <div className="contentCard">
              <h1>{data.title}</h1>
              <h3>{data.lead}</h3>
              <p className="lastUpdated">{timeConverter(data.publish_time)}</p>
            </div>
          </Col>
        </Row>
      </a>
    </Card>
  );
}
