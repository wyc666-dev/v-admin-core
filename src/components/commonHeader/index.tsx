import ImgSanYue from '@/assets/images/sanyue.jpg';
import { MenuFoldOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, MenuProps } from 'antd';
import './index.css';
const { Header } = Layout;
const CommonHeader = () => {
  const logout = () => {};
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer">
        个人中心
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a onClick={() => logout} target="_blank" rel="noopener noreferrer">
        退出
      </a>
    ),
  },
];
  return (  
<Header className='header-container'>
          <Button
            type="text"
            icon={<MenuFoldOutlined />}
            style={{
              fontSize: '16px',
              width: 64,
              height: 32,
              backgroundColor: '#fff'
            }}
          />
          <Dropdown menu={{items}}>
          <Avatar size={36} src={<img src={ImgSanYue} alt="用户头像" />} />
          </Dropdown>
        </Header>
        )
}

export default CommonHeader;