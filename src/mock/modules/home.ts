/**
 * 首页模块 Mock 数据。
 *
 * 这里模拟首页仪表盘依赖的全部后端响应，包括：
 * 1. 饼图数据 `videoData`
 * 2. 柱状图数据 `userData`
 * 3. 折线图数据 `orderData`
 * 4. 左侧表格数据 `tableData`
 */
import { ServiceResponse } from "@/types";
import Mock from "mockjs";

// 单日订单数据结构：每个品牌对应一个销量值。
interface ChartData {
  苹果: number;
  vivo: number;
  oppo: number;
  魅族: number;
  三星: number;
  小米: number;
}

interface HomeData {
  // 饼图数据：name 为品牌名，value 为数值。
  videoData: Array<{ name: string; value: number }>;
  // 柱状图数据：按日期统计新增用户和活跃用户。
  userData: Array<{ date: string; new: number; active: number }>;
  // 折线图数据：一周日期 + 多品牌销量。
  orderData: { date: string[]; data: ChartData[] };
  // 表格数据：课程或品牌购买情况。
  tableData: Array<{
    name: string;
    todayBuy: number;
    monthBuy: number;
    totalBuy: number;
  }>;
}

export default {
  getStatisticalData: (): ServiceResponse<HomeData> => {
    // 每次请求都重新生成一份 list，避免多次调用时数据累积污染。
    const list: ChartData[] = [];
    for (let i = 0; i < 7; i++) {
      // 生成 7 天的品牌销量数据，字段名就是图表系列名称。
      list.push(
        Mock.mock({
          "苹果|100-8000": 1,
          "vivo|100-8000": 1,
          "oppo|100-8000": 1,
          "魅族|100-8000": 1,
          "三星|100-8000": 1,
          "小米|100-8000": 1,
        }),
      );
    }

    return {
      code: 20000,
      data: {
        // 饼图：展示各品牌的销售占比。
        videoData: [
          { name: "小米", value: 2999 },
          { name: "苹果", value: 5999 },
          { name: "vivo", value: 1500 },
          { name: "oppo", value: 1999 },
          { name: "魅族", value: 2200 },
          { name: "三星", value: 4500 },
        ],
        // 柱状图：展示一周内每日新增用户和活跃用户变化。
        userData: [
          { date: "周一", new: 5, active: 200 },
          { date: "周二", new: 10, active: 500 },
          { date: "周三", new: 12, active: 550 },
          { date: "周四", new: 60, active: 800 },
          { date: "周五", new: 65, active: 550 },
          { date: "周六", new: 53, active: 770 },
          { date: "周日", new: 33, active: 170 },
        ],
        orderData: {
          // 折线图横轴日期。
          date: [
            "20260401",
            "20260402",
            "20260403",
            "20260404",
            "20260405",
            "20260406",
            "20260407",
          ],
          // 折线图纵向多系列数据。
          data: list,
        },
        // 左侧表格：展示不同品牌的今日 / 本月 / 总购买量。
        tableData: [
          { name: "oppo", todayBuy: 500, monthBuy: 3500, totalBuy: 22000 },
          { name: "vivo", todayBuy: 300, monthBuy: 2200, totalBuy: 24000 },
          { name: "苹果", todayBuy: 800, monthBuy: 6000, totalBuy: 50000 },
          { name: "魅族", todayBuy: 200, monthBuy: 1500, totalBuy: 12000 },
          { name: "三星", todayBuy: 600, monthBuy: 4500, totalBuy: 35000 },
          { name: "小米", todayBuy: 700, monthBuy: 5000, totalBuy: 40000 },
        ],
      },
    };
  },
};
