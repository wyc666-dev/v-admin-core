import CommonAside from '@/components/commonAside';
import CommonHeader from '@/components/commonHeader';
import { Layout, theme } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';


const { Header, Sider, Content } = Layout;

const Main: React.FC = () => {
  // const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className='main-container'>
      {/* <Sider trigger={null} collapsible collapsed={collapsed}>
        <h3 className={`app-name ${collapsed ? 'collapsed' : ''}`}>通用后台管理系统</h3>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
          style={{
            height: 'calc(100% - 56px)'
          }}
        />
      </Sider> */}
      <CommonAside />
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header> */}
        <CommonHeader />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main;
