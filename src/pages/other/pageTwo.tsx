import React from 'react';
import { Outlet } from 'react-router-dom';

const PageTwo: React.FC = () => {
  return (
    <div>
      pageTwo页面
      <Outlet />
    </div>
  );
}

export default PageTwo;
