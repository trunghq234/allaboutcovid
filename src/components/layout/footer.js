import React from 'react';
import { BackTop } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';

export default function AppFooter() {
  return (
    <div className="container-fluid">
      <div className="footer">
        <div className="copyright">
          Made by
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/trunghuynh2304">
            {' '}
            Trung Huỳnh
          </a>
        </div>
        <BackTop>
          <div className="goTop">
            <UpCircleOutlined />
          </div>
        </BackTop>
      </div>
    </div>
  );
}
