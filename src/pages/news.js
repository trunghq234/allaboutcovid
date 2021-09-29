import { Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { getNews } from '../apis';
import NewsCard from '../components/news/newsCard';
import CardSkeleton from '../components/vaccine/CardSkeleton';

export default function AppNews() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNews()
      .then((res) => {
        setData(
          res.data.data['1004765'].data.sort(
            (first, second) => first.publish_time > second.publish_time
          )
        );
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid">
      <div className="block">
        <h1>News</h1>
        {loading ? (
          <Space style={{ width: '100%' }} size={16} direction="vertical">
            <CardSkeleton xs={24} sm={24} md={24} lg={24} count={2} />
            <CardSkeleton xs={24} sm={24} md={24} lg={24} count={2} />
            <CardSkeleton xs={24} sm={24} md={24} lg={24} count={2} />
            <CardSkeleton xs={24} sm={24} md={24} lg={24} count={2} />
            <CardSkeleton xs={24} sm={24} md={24} lg={24} count={2} />
            <CardSkeleton xs={24} sm={24} md={24} lg={24} count={2} />
          </Space>
        ) : (
          <></>
        )}
        {data.map((item) => {
          return <NewsCard key={item.article_id} data={item} />;
        })}
      </div>
    </div>
  );
}
