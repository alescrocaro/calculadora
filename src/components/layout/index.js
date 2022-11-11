import React from 'react';
import './style.css';

import {
  GithubOutlined,
  InstagramOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Content, Footer, Sider } = Layout;

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
        cREATED BY alescrocaro
        <a
          href={'https://www.instagram.com/leju0/'}
          target="_blank"
          rel="noreferrer"
          style={{
            textDecoration: 'none',
            color: 'black',
            width: 'fit-content',
            marginInline: '0.5rem'
          }}
        >
          <InstagramOutlined />
        </a>
        <a
          href={'https://www.github.com/alescrocaro/'}
          target="_blank"
          rel="noreferrer"
          style={{
            textDecoration: 'none',
            color: 'black',
            width: 'fit-content'
          }}
        >
          <GithubOutlined />
        </a>
      </Footer>
    </Layout>
  </Layout>
);
export default MyLayout;
