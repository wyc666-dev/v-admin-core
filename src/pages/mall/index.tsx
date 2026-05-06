/**
 * 商品管理页占位组件。
 *
 * 当前文件还没有接入真实商品业务，只保留了一个基础出口。
 * 保留 `Outlet` 的原因是：如果未来商品管理还要拆成列表页、详情页、分类页，
 * 就可以直接在这个页面下继续挂子路由。
 */
import React from 'react';
import { Outlet } from 'react-router-dom';

const Mall: React.FC = () => {
  return (
    <div>
      {/* 当前只是占位文案，方便确认路由已正确命中。 */}
      mall页面
      {/* 预留子路由渲染出口。 */}
      <Outlet />
    </div>
  );
}

export default Mall;
