/**
 * 用户模块 Mock 数据。
 *
 * 这个文件把“数据库”和“接口行为”都简化到前端本地内存里：
 * 1. 启动时先随机生成 200 条用户数据。
 * 2. 查询接口支持关键字搜索和分页。
 * 3. 新增、删除、编辑都会直接修改内存中的 List。
 */
import { ServiceResponse, UserItem } from "@/types";
import Mock from "mockjs";

// 把 URL 查询字符串解析成对象，便于在 Mock GET 接口中读取参数。
const param2Obj = (url: string) => {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}',
  );
};

// List 充当内存数据库，所有用户增删改查都围绕它进行。
const List: UserItem[] = [];
const count = 200;

for (let i = 0; i < count; i++) {
  // 这里利用 Mock.Random 批量生成更像真实数据的姓名、地址、年龄和生日。
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      addr: Mock.mock("@county(true)"),
      "age|18-60": 1,
      birth: Mock.Random.date(),
      sex: Mock.Random.integer(0, 1),
    }),
  );
}

export default {
  /**
   * 获取用户列表。
   *
   * 支持：
   * - 按 name 模糊搜索姓名或地址
   * - 按 page / limit 做简单分页
   */
  getUserList: (config: {
    url: string;
  }): ServiceResponse<{ list: UserItem[]; count: number }> => {
    const { name, page = 1, limit = 20 } = param2Obj(config.url);

    // 搜索逻辑：只要姓名或地址包含关键字，就认为命中。
    const mockList = List.filter((user) => {
      if (
        name &&
        user.name.indexOf(name) === -1 &&
        user.addr.indexOf(name) === -1
      ) {
        return false;
      }
      return true;
    });

    // 按页码和每页条数从过滤后的结果中截出当前页。
    const pageList = mockList.filter(
      (_item, index) => index < limit * page && index >= limit * (page - 1),
    );

    return {
      code: 20000,
      data: {
        list: pageList,
        count: mockList.length,
      },
    };
  },

  /**
   * 增加用户。
   *
   * 新用户会被插入到数组头部，这样列表刷新后通常第一眼就能看到新增项。
   */
  createUser: (config: { body: string }): ServiceResponse<string> => {
    const { name, addr, age, birth, sex } = JSON.parse(config.body);
    List.unshift({
      id: Mock.Random.guid(),
      name,
      addr,
      age,
      birth,
      sex,
    });
    return {
      code: 20000,
      data: "添加成功",
    };
  },

  /**
   * 删除用户。
   *
   * 根据 id 找到目标用户并从内存数组中移除。
   */
  deleteUser: (config: { body: string }): ServiceResponse<string> => {
    const { id } = JSON.parse(config.body);
    if (!id) {
      return { code: -999, data: "参数不正确" };
    }

    // 找到对应 ID 的索引并执行删除。
    const index = List.findIndex((u) => u.id === id);
    if (index !== -1) {
      List.splice(index, 1);
      return { code: 20000, data: "删除成功" };
    }

    return { code: -999, data: "用户不存在" };
  },

  /**
   * 编辑用户。
   *
   * 找到目标用户后，直接原地覆盖各字段。
   */
  updateUser: (config: { body: string }): ServiceResponse<string> => {
    const { id, name, addr, age, birth, sex } = JSON.parse(config.body);

    // 使用 some 是为了在命中目标后提前结束遍历。
    List.some((u) => {
      if (u.id === id) {
        u.name = name;
        u.addr = addr;
        u.age = age;
        u.birth = birth;
        u.sex = sex;
        return true;
      }
      return false;
    });

    return {
      code: 20000,
      data: "编辑成功",
    };
  },
};
