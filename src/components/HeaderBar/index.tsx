/**
 * 顶部栏组件。
 *
 * 当前头部主要承担两个交互入口：
 * 1. 左侧按钮切换侧边栏展开 / 折叠状态。
 * 2. 右侧头像下拉菜单提供退出登录等用户操作。
 * 3. 面包屑直接根据当前路由链派生，不再手写配置。
 */
import ImgSanYue from "@/assets/images/sanyue.jpg";
import { useLayoutStore } from "@/store/layoutStore";
import { MenuFoldOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Dropdown, Layout, MenuProps } from "antd";
import { useMatches, useNavigate } from "react-router-dom";
import "./index.css";

const { Header } = Layout;

const HeaderBar = () => {
  const navigate = useNavigate();
  const matches = useMatches();
  const collapsed = useLayoutStore((state) => state.isCollapse);
  const collapseMenu = useLayoutStore((state) => state.collapseMenu);

  const logout = () => {
    // 当前登录态只依赖 token，所以退出时删掉 token 即可。
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Dropdown 所需菜单项，当前只有“个人中心”和“退出”两个入口。
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          个人中心
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a onClick={() => logout()} target="_blank" rel="noopener noreferrer">
          退出
        </a>
      ),
    },
  ];

  // 折叠动作交给 Zustand store 统一管理，其他组件也能感知状态变化。
  const setCollapsed = () => {
    collapseMenu();
  };

  const breadcrumbItems = matches
    .map((match) => match.handle as { meta?: { title?: string; hidden?: boolean } } | undefined)
    .filter((handle) => handle?.meta?.title && !handle.meta.hidden)
    .map((handle) => ({
      title: handle!.meta!.title,
    }));

  return (
    <Header className="header-container">
      <div className="header-left">
        <Button
          // 文本按钮更轻量，适合作为纯图标开关。
          type="text"
          icon={<MenuFoldOutlined rotate={collapsed ? 180 : 0} />}
          style={{
            fontSize: "16px",
            width: 64,
            height: 32,
            backgroundColor: "#fff",
          }}
          onClick={setCollapsed}
        />
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <Dropdown menu={{ items }}>
        {/* 头像本身就是 Dropdown 的触发器。 */}
        <Avatar size={36} src={<img src={ImgSanYue} alt="用户头像" />} />
      </Dropdown>
    </Header>
  );
};

export default HeaderBar;
