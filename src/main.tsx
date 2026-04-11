import React from 'react'
import ReactDOM from 'react-dom/client'

// 1. 样式初始化
// import "reset-css" 

// 2. 全局样式
import './index.css'

// 3. 引入路由（重点：这里不再直接用 App）
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)