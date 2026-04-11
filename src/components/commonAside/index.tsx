import MenuConfig from "@/config";
import * as Icons from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from "react";

const { Sider, Content, Header } = Layout;

// 1. 声明一个接口，解决 MenuConfig 数据结构在 TS 里的报错
interface MenuItemConfig {
  path: string;
  label: string;
  icon: string;
  children?: MenuItemConfig[];
}

// 2. 这里请回了你最爱的 createElement
// 加上类型转换 (Icons as any)，解决字符串索引报错
const iconToElement = (name: string) => {
  const IconComponent = (Icons as any)[name];
  return IconComponent ? React.createElement(IconComponent) : null;
};

// 3. 这里的逻辑修复了你原代码中的变量名错误（icon -> item）和语法破碎问题
const items = (MenuConfig as MenuItemConfig[]).map((item) => {
  const child: any = {
    key: item.path,
    icon: iconToElement(item.icon),
    label: item.label
  };

  // 修复三元运算符，改为稳健的 if 判断
  if (item.children && item.children.length > 0) {
    child.children = item.children.map((subItem) => {
      return {
        key: subItem.path,
        label: subItem.label,
        // 如果子菜单也需要图标，可以取消注释
        // icon: iconToElement(subItem.icon)
      };
    });
  }

  return child;
});

const CommonAside = () => {
  return (
    <Sider trigger={null} collapsible>
      <h3 className='app-name' style={{ color: '#fff', textAlign: 'center', margin: '16px 0' }}>
        通用后台管理系统
      </h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/home']}
        items={items}
        style={{ height: 'calc(100% - 56px)' }}
      />
    </Sider>
  );
};

export default CommonAside;