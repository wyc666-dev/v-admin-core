/**
 * 登录页组件。
 *
 * 当前流程比较简单：
 * 1. 先判断本地是否已有 token，有就直接跳首页。
 * 2. 用户提交账号密码后，调用 Mock 登录接口。
 * 3. 登录成功就把 token 写入 localStorage，并跳转到首页。
 */
import { LoginParams, useLoginMutation } from "@/services";
import { Button, Form, Input } from "antd";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import "./login.css";

const Login: React.FC = () => {
  // 登录成功后通过 navigate 进入后台首页。
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  if (localStorage.getItem("token")) {
    // 已登录用户直接回首页，避免重复访问登录页。
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = (val: LoginParams) => {
    // 前置校验：虽然 Form 本身也能做校验，但这里额外兜底更直接。
    if (!val.username || !val.password) {
      return toast.warning("请输入账号和密码");
    }

    loginMutation.mutate(val, {
      onSuccess: (data) => {
        // Mock 返回 token 后写入本地，后续路由守卫会依赖这个值判断登录态。
        localStorage.setItem("token", data.token);
        navigate("/home");
      },
    });
  };

  return (
    <Form className="login-container" onFinish={handleSubmit} labelCol={{ style: { width: 56 } }}>
      {/* 页面标题。 */}
      <div className="login_title">系统登录</div>
      {/* 用户名输入框。 */}
      <Form.Item name="username" label="用户名">
        <Input placeholder="请输入账号" />
      </Form.Item>
      {/* 密码输入框，使用 Input.Password 自动提供遮罩能力。 */}
      <Form.Item name="password" label="密码">
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      {/* 表单提交按钮。 */}
      <Form.Item className="login-button">
        <Button type="primary" htmlType="submit" loading={loginMutation.isPending}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
