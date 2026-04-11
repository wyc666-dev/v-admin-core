import React from 'react';
import { Outlet } from 'react-router-dom';

const Mall: React.FC = () => {
  return (
    <div>
      mall页面
      <Outlet />
    </div>
  );
}

export default Mall;
