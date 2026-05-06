/**
 * 左侧导航组件。
 *
 * 它直接读取路由配置派生菜单，不再单独维护一份菜单数组。
 * 这样路由、菜单和权限都来自同一份配置。
 */
import { getSidebarMenuItems } from "@/routes/routeTree";
import type { RouteMenuItem } from "@/routes/routeTree";
import * as Icons from "@ant-design/icons";
import { Layout, Menu } from "antd";
import type { ItemType } from "antd/es/menu/interface";
import React from "react";
import { useLayoutStore } from "@/store/layoutStore";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

// 把字符串图标名转换成真正的 React 图标元素。
const iconToElement = (name: string) => {
  const IconComponent = (Icons as any)[name];
  return IconComponent ? React.createElement(IconComponent) : null;
};

const transformMenuItems = (items: RouteMenuItem[]): ItemType[] => {
  return items.map((item) => ({
    key: item.key,
    icon: item.icon ? iconToElement(item.icon) : null,
    label: item.label,
    children: item.children ? transformMenuItems(item.children) : undefined,
  }));
};

const Sidebar = () => {
  const items = transformMenuItems(getSidebarMenuItems());
  // navigate 用于点击菜单后切换页面。
  const navigate = useNavigate();
  // location 用于让菜单高亮始终跟随当前路由，而不是只在首次渲染时生效。
  const location = useLocation();
  const collapsed = useLayoutStore((state) => state.isCollapse);

  return (
    <Sider trigger={null} collapsed={collapsed}>
      {/* 折叠时只显示短标题，展开时显示完整系统名。 */}
      <h3
        className="app-name"
        style={{ color: "#fff", textAlign: "center", margin: "16px 0" }}
      >
        {collapsed ? "后台" : "通用后台管理系统"}
      </h3>
      <Menu
        // 深色主题更适合后台系统侧边栏场景。
        theme="dark"
        // inline 表示纵向展开式菜单。
        mode="inline"
        // 菜单选中态由当前地址驱动，这样点页签、刷新和前进后退都会同步高亮。
        selectedKeys={[location.pathname]}
        // 二级菜单场景下，根据当前路径自动展开所属父菜单。
        defaultOpenKeys={[`/${location.pathname.split("/")[1]}`]}
        items={items}
        style={{ height: "calc(100% - 56px)" }}
        onClick={(e) => navigate(e.key)}
      />
    </Sider>
  );
};

export default Sidebar;
