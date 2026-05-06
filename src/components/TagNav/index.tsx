/**
 * 标签栏组件。
 *
 * 这个组件只记录“访问过哪些页面”，真正的标题和是否允许展示
 * 都从路由配置派生出来，避免再维护一份平行菜单数据。
 */
import "@/index.css";
import { getRouteByPath, isTabRoute } from "@/routes/routeTree";
import type { TabItem } from "@/routes/types";
import { useLayoutStore } from "@/store/layoutStore";
import { Space, Tag } from "antd";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";

const TagNav: React.FC = () => {
  const visitedTabs = useLayoutStore((state) => state.visitedTabs);
  const addVisitedTab = useLayoutStore((state) => state.addVisitedTab);
  const removeVisitedTab = useLayoutStore((state) => state.removeVisitedTab);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentRoute = getRouteByPath(location.pathname);
    if (!currentRoute || !isTabRoute(location.pathname) || !currentRoute.meta) {
      return;
    }

    addVisitedTab({
      path: currentRoute.fullPath,
      title: currentRoute.meta.title,
      affix: currentRoute.meta.affix,
    });
  }, [addVisitedTab, location.pathname]);

  const handleClose = (path: string, index: number) => {
    const length = visitedTabs.length - 1;
    removeVisitedTab(path);

    if (path !== location.pathname) {
      return;
    }

    if (index === length) {
      const fallback = visitedTabs[length - 1];
      if (fallback) {
        navigate(fallback.path);
      }
      return;
    }

    const fallback = visitedTabs[index + 1];
    if (fallback) {
      navigate(fallback.path);
    }
  };

  const setTag = (active: boolean, item: TabItem, index: number) => {
    const closeIcon = item.affix ? false : true;

    return active ? (
      <Tag
        color="#FFB6C1"
        closeIcon={closeIcon}
        onClose={() => handleClose(item.path, index)}
        key={item.path}
      >
        {item.title}
      </Tag>
    ) : (
      <Tag
        onClick={() => navigate(item.path)}
        key={item.path}
        closeIcon={closeIcon}
        onClose={() => handleClose(item.path, index)}
      >
        {item.title}
      </Tag>
    );
  };

  return (
    <Space className="common-tag" size={[0, 8]} wrap>
      {/* 把 Redux 中记录的所有标签逐个渲染出来。 */}
      {visitedTabs.map((item: TabItem, index: number) =>
        setTag(item.path === location.pathname, item, index),
      )}
    </Space>
  );
};

export default TagNav;
