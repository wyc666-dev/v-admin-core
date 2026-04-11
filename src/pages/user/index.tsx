import React from 'react';
import { Outlet } from 'react-router-dom';


const User: React.FC = () => {
  return (
    <div>
      user页面
      <Outlet />
    </div>
  );
}

export default User;
