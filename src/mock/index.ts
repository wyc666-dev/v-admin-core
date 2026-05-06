import Mock from "mockjs";
import homeApi from "./modules/home";
import permissionApi from "./modules/permission";
import userApi from "./modules/user";

// 首页统计接口
Mock.mock(/home\/getData/, homeApi.getStatisticalData);

// 用户模块接口
Mock.mock(/user\/getUser/, userApi.getUserList);
Mock.mock(/user\/addUser/, "post", userApi.createUser);
Mock.mock(/user\/editUser/, "post", userApi.updateUser);
Mock.mock(/user\/deleteUser/, "post", userApi.deleteUser);

// 权限模块接口
Mock.mock(/permission\/getMenu/, "post", permissionApi.getMenu);
