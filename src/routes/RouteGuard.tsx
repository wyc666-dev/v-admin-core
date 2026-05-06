/**
 * 路由守卫组件。
 *
 * 它的职责很单纯：检查本地是否存在登录 token。
 * - 有 token: 正常渲染受保护页面。
 * - 没 token: 立即跳回登录页。
 *
 * 当前 token 来自 localStorage，适合演示项目或轻量后台。
 * 如果后续要做更严格的权限体系，可以在这里继续扩展角色校验。
 */
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const RouteGuard = ({ children }: PropsWithChildren) => {
  // 从本地持久化存储读取 token，判断用户是否已经登录。
  const token = localStorage.getItem("token");
  if (!token) {
    // replace 表示替换当前历史记录，避免用户点浏览器返回又回到受限页。
    return <Navigate to="/login" replace />;
  }
  // 通过校验时，直接渲染被保护的子节点。
  return children;
};
