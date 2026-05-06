/**
 * 其他模块页面二。
 *
 * 作用和 pageOne 类似，主要用于演示二级导航下的另一个页面入口。
 */
import React from 'react';
import { Outlet } from 'react-router-dom';

const PageTwo: React.FC = () => {
  return (
    <div>
      {/* 占位文本。 */}
      pageTwo页面
      {/* 继续预留更深层的子路由出口。 */}
      <Outlet />
    </div>
  );
}

export default PageTwo;
