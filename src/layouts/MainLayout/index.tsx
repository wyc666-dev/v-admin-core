import React, { Suspense } from 'react';
import { Layout, Spin, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import HeaderBar from '../../components/HeaderBar';
import Sidebar from '../../components/Sidebar';
import TagNav from '../../components/TagNav';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <HeaderBar />
        <TagNav />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Suspense fallback={<Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: 80 }} />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
