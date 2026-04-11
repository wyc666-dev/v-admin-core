import React from 'react';
import { Outlet } from 'react-router-dom';

const PageOne: React.FC = () => {
  return (
    <div>
      pageOne页面
      <Outlet />
    </div>
  );
}

export default PageOne;
