import React from 'react';
import './style.css';

import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const MyLayout = ({ children }) => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={[
          UserOutlined,
          VideoCameraOutlined,
          UploadOutlined,
          UserOutlined
        ].map((icon, index) => ({
          key: String(index + 1),
          icon: React.createElement(icon),
          label: `nav ${index + 1}`
        }))}
      />
    </Sider>
    <Layout>
      {/* <Header
        className="site-layout-sub-header-background"
        style={{
          padding: 0
        }}
      /> */}
      <Content
        style={{
          margin: '24px 16px 0'
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: '100%'
          }}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center'
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  </Layout>
);
export default MyLayout;
