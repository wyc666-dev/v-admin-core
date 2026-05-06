/**
 * 应用入口文件。
 *
 * 企业级重构后的职责：
 * 1. 启动全局副作用（如 Mock 拦截）。
 * 2. 引入基础样式。
 * 3. 将根组件 App 挂载到真实的 DOM 节点上。
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./mock";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
