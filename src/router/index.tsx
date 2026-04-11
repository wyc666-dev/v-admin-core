import Home from '@/pages/home';
import Main from '@/pages/main';
import Mall from '@/pages/mall';
import PageOne from '@/pages/other/pageOne';
import PageTwo from '@/pages/other/pageTwo';
import User from '@/pages/user';

import { createBrowserRouter, Navigate } from 'react-router-dom';

const routes = [
  {
    path: '/',
    Component: Main,
    children: [
      {
        index: true, // 默认子路由
        element: <Navigate to="home" replace />
      },
      {
        path: 'home',
        Component: Home
      },
      {
        path: 'mall',
        Component: Mall
      },
      {
        path: 'user',
        Component: User
      },
      {
        path: 'other',
        children: [
          {
            path: 'pageOne',
            Component: PageOne
          },
          {
            path: 'pageTwo',
            Component: PageTwo
          }
        ]
      }
    ]
  }
];

export const router = createBrowserRouter(routes);