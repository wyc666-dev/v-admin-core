/**
 * 权限模块 Mock 数据。
 *
 * 这里模拟最基础的登录鉴权逻辑：
 * - 当用户名是 `admin` 时，返回成功状态、token 和允许访问的菜单。
 * - 其他用户名统一返回权限不足。
 *
 * 这个实现比较简化，但足以支撑当前演示项目的登录流程。
 */
import { MenuItem, ServiceResponse } from "@/types";
import Mock from "mockjs";

interface LoginData {
  // 登录后签发给前端的 token。
  token: string;
  // 当前用户允许访问的菜单列表。
  menu: MenuItem[];
  // 用于提示的描述文案。
  message: string;
}

export default {
  getMenu: (config: {
    body: string;
  }): ServiceResponse<LoginData | { message: string }> => {
    // 这里只读取用户名，密码并没有真正参与验证。
    const { username } = JSON.parse(config.body);

    if (username === "admin") {
      return {
        code: 20000,
        data: {
          // 每次登录都生成一个新的随机 token。
          token: Mock.Random.guid(),
          message: "获取成功",
          menu: [
            { path: "/home", name: "home", label: "首页", icon: "house" },
            { path: "/user", name: "user", label: "用户管理", icon: "user" },
          ],
        },
      };
    }

    // 非 admin 统一视为无权限用户。
    return {
      code: -999,
      data: { message: "权限不足" },
    };
  },
};
