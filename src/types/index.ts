/**
 * 通用响应类型。
 *
 * services 和 mock 目前共用这一种结构：
 * - code: 业务状态码，成功通常是 20000。
 * - data: 真实业务数据载体。
 * - message: 可选提示信息，失败时常用。
 */
export interface ServiceResponse<T> {
  code: number;
  data: T;
  message?: string;
}

export interface MenuItem {
  path: string;
  name: string;
  label: string;
  icon: string;
  url?: string;
}

export interface UserItem {
  id: string;
  name: string;
  age: number;
  birth: string;
  sex: 0 | 1;
  addr: string;
}
