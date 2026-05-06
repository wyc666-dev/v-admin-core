/**
 * ECharts 通用封装组件。
 *
 * 封装目的：
 * 1. 页面层只管传数据，不用重复写 ECharts 初始化代码。
 * 2. 把“坐标轴图”和“非坐标轴图”两种常见配置模板集中管理。
 * 3. 让首页图表渲染逻辑保持简洁。
 */
import * as echarts from "echarts";
import { useEffect, useRef } from "react";

// 直角坐标系图表的基础配置，适用于折线图、柱状图等。
const axisOption: any = {
  textStyle: { color: "#333" },
  tooltip: { trigger: "axis" },
  xAxis: {
    type: "category",
    data: [],
    axisLine: { lineStyle: { color: "#17b3a3" } },
    axisLabel: { interval: 0, color: "#333" },
  },
  yAxis: [{ type: "value", axisLine: { lineStyle: { color: "#17b3a3" } } }],
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
};

// 非直角坐标系图表的基础配置，当前主要用于饼图。
const normalOption: any = {
  tooltip: { trigger: "item" },
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: [],
};

const Echarts = ({ style, chartData, isAxisChart = true }: any) => {
  // DOM 引用：ECharts 初始化时需要拿到真实容器节点。
  const chartRef = useRef<HTMLDivElement>(null);
  // 图表实例引用：避免每次渲染都重复 init。
  const chartObj = useRef<any>(null);

  useEffect(() => {
    // 首次挂载时初始化图表实例，后续只更新 option。
    if (chartRef.current && !chartObj.current) {
      chartObj.current = echarts.init(chartRef.current);
    }

    let options;
    if (isAxisChart) {
      // 坐标轴图重点补 x 轴数据和多条 series。
      options = {
        ...axisOption,
        xAxis: { ...axisOption.xAxis, data: chartData.xAxisData },
        series: chartData.seriesData,
      };
    } else {
      // 饼图等非坐标轴图主要依赖 seriesData。
      options = {
        ...normalOption,
        series: chartData.seriesData,
      };
    }

    if (chartObj.current) {
      // setOption 会自动把最新配置同步到图表实例。
      chartObj.current.setOption(options);
    }
  }, [chartData, isAxisChart]);

  // 最终只输出一个空 div，ECharts 会接管这个容器进行绘制。
  return <div style={style} ref={chartRef}></div>;
};

export default Echarts;
