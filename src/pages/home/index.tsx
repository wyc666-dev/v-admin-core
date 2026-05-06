/**
 * 首页仪表盘页面。
 *
 * 这个页面是后台系统的总览页，负责把多类静态和动态数据拼成一个 dashboard：
 * 1. 左侧展示用户信息卡片和课程购买表格。
 * 2. 右侧展示订单统计卡片。
 * 3. 下方展示折线图、柱状图和饼图。
 */
import { HomeData, useHomeQuery } from "@/services";
import sanyue from "@/assets/images/sanyue.jpg";
import MyEcharts from "@/components/Echarts";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Skeleton, Table } from "antd";
import React from "react";
import "./home.css";

// 图标映射表：接口数据和卡片配置只保存字符串，真正渲染时再映射成组件。
const iconMap: Record<string, React.ElementType> = {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
};

// 表格列定义：控制课程购买表格里每一列的标题和取值字段。
const columns = [
  { title: "课程", dataIndex: "name" },
  { title: "今日购买", dataIndex: "todayBuy" },
  { title: "本月购买", dataIndex: "monthBuy" },
  { title: "总购买", dataIndex: "totalBuy" },
];

// 顶部统计卡片的静态展示数据。
const countData = [
  {
    name: "今日支付订单",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "今日收藏订单",
    value: 3421,
    icon: "ClockCircleOutlined",
    color: "#ffb980",
  },
  {
    name: "今日未支付订单",
    value: 1234,
    icon: "CloseCircleOutlined",
    color: "#5ab1ef",
  },
  {
    name: "本月支付订单",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "本月收藏订单",
    value: 3421,
    icon: "ClockCircleOutlined",
    color: "#ffb980",
  },
  {
    name: "本月未支付订单",
    value: 1234,
    icon: "CloseCircleOutlined",
    color: "#5ab1ef",
  },
];

const Home: React.FC = () => {
  const { data } = useHomeQuery();
  const tableData = data?.tableData ?? [];
  const orderData = data?.orderData;
  const userData = data?.userData;
  const videoData = data?.videoData;

  const orderChartData = orderData
    ? {
        xAxisData: orderData.date,
        seriesData: Object.keys(orderData.data[0] ?? {}).map((key) => ({
          name: key,
          type: "line",
          data: orderData.data.map((item) => item[key as keyof HomeData["orderData"]["data"][number]]),
        })),
      }
    : null;

  const userChartData = userData
    ? {
        xAxisData: userData.map((item) => item.date),
        seriesData: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      }
    : null;

  const videoChartData = videoData
    ? {
        seriesData: [
          {
            type: "pie",
            data: videoData,
            radius: "70%",
          },
        ],
      }
    : null;

  return (
    <Row className="home" gutter={16}>
      {/* 左侧栏：用户信息和表格区域。 */}
      <Col span={8}>
        <Card hoverable style={{ marginBottom: "20px" }}>
          <Skeleton avatar paragraph={{ rows: 2 }} active loading={!data}>
            <div className="user">
              <img src={sanyue} alt="图片" />
              <div className="userinfo">
                <p className="name">admin</p>
                <p className="access">超级管理员</p>
              </div>
            </div>
            <div className="login-info">
              <p>
                上次登录时间: <span>2026/4/11</span>
              </p>
              <p>
                上次登录地点: <span>中国 北京</span>
              </p>
            </div>
          </Skeleton>
        </Card>
        <Card>
          <Table
            // 以课程名称作为表格唯一键。
            rowKey="name"
            dataSource={tableData}
            columns={columns}
            loading={!data}
            pagination={false}
          />
        </Card>
      </Col>
      {/* 右侧栏：统计卡片与图表区域。 */}
      <Col span={16}>
        <div className="num">
          {countData.map((item, index) => {
            const IconComponent = iconMap[item.icon];
            return (
              // 每一张卡片都由颜色、图标、金额和标题组成。
              <Card key={index}>
                <div
                  className="icon-box"
                  style={{ backgroundColor: item.color }}
                >
                  {IconComponent && <IconComponent />}
                </div>
                <div className="detail">
                  <p className="num">￥{item.value}</p>
                  <p className="txt">{item.name}</p>
                </div>
              </Card>
            );
          })}
        </div>

        <Card style={{ marginTop: "20px" }}>
          {orderChartData ? (
            <MyEcharts
              chartData={orderChartData}
              style={{ width: "100%", height: "280px" }}
            />
          ) : (
            <Skeleton.Node active style={{ width: "100%", height: "280px" }}>
              {null}
            </Skeleton.Node>
          )}
        </Card>

        {/* 下方并排两张图：左边柱状图，右边饼图。 */}
        <div className="gragh">
          <Card style={{ width: "50%" }}>
            {userChartData ? (
              <MyEcharts chartData={userChartData} style={{ height: "300px" }} />
            ) : (
              <Skeleton.Node active style={{ width: "100%", height: "300px" }}>
                {null}
              </Skeleton.Node>
            )}
          </Card>
          <Card style={{ width: "50%" }}>
            {videoChartData ? (
              <MyEcharts
                chartData={videoChartData}
                isAxisChart={false}
                style={{ height: "300px" }}
              />
            ) : (
              <Skeleton.Node active style={{ width: "100%", height: "300px" }}>
                {null}
              </Skeleton.Node>
            )}
          </Card>
        </div>
      </Col>
    </Row>
  );
};

export default Home;
