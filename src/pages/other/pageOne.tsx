/**
 * 其他模块页面一。
 *
 * 当前只是一个最小占位页，用于验证二级菜单和嵌套路由是否工作正常。
 */
import React from 'react';
import { Outlet } from 'react-router-dom';

const PageOne: React.FC = () => {
  return (
    <div>
      {/* 占位文本。 */}
      pageOne页面
      {/* 继续预留更深层的子路由出口。 */}
      <Outlet />
    </div>
  );
}

export default PageOne;
