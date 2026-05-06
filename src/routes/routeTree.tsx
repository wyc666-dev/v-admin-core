import { lazy, type ComponentType, type ReactNode } from "react";
import type {
  IndexRouteObject,
  NonIndexRouteObject,
  RouteObject,
} from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
const Home = lazy(() => import("@/pages/home"));
const Login = lazy(() => import("@/pages/login"));
const Mall = lazy(() => import("@/pages/mall"));
const PageOne = lazy(() => import("@/pages/other/pageOne"));
const PageTwo = lazy(() => import("@/pages/other/pageTwo"));
const User = lazy(() => import("@/pages/user"));

import { RouteGuard } from "./RouteGuard";

export interface RouteMeta {
  title: string;
  icon?: string;
  auth?: boolean;
  hidden?: boolean;
  affix?: boolean;
}

export interface AppRouteConfig {
  path?: string;
  index?: boolean;
  redirect?: string;
  Component?: ComponentType;
  children?: AppRouteConfig[];
  meta?: RouteMeta;
}

export interface AppRouteRecord extends AppRouteConfig {
  fullPath: string;
  children?: AppRouteRecord[];
}

export interface RouteMenuItem {
  key: string;
  label: string;
  icon?: string;
  children?: RouteMenuItem[];
}

const rawRoutes: AppRouteConfig[] = [
  {
    path: "/",
    Component: MainLayout,
    meta: {
      title: "工作台",
      auth: true,
      hidden: true,
    },
    children: [
      {
        index: true,
        redirect: "/home",
      },
      {
        path: "home",
        Component: Home,
        meta: {
          title: "首页",
          icon: "HomeOutlined",
          auth: true,
          affix: true,
        },
      },
      {
        path: "mall",
        Component: Mall,
        meta: {
          title: "商品管理",
          icon: "ShopOutlined",
          auth: true,
        },
      },
      {
        path: "user",
        Component: User,
        meta: {
          title: "用户管理",
          icon: "UserOutlined",
          auth: true,
        },
      },
      {
        path: "other",
        meta: {
          title: "其他",
          icon: "SettingOutlined",
          auth: true,
        },
        children: [
          {
            path: "pageOne",
            Component: PageOne,
            meta: {
              title: "页面1",
              auth: true,
            },
          },
          {
            path: "pageTwo",
            Component: PageTwo,
            meta: {
              title: "页面2",
              auth: true,
            },
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
    meta: {
      title: "登录",
      hidden: true,
    },
  },
];

const normalizePath = (parentPath: string, currentPath?: string) => {
  if (!currentPath) {
    return parentPath || "/"; //处理index路由/
  }

  if (currentPath.startsWith("/")) {
    //处理index外的所有路由/
    return currentPath;
  }

  const basePath = parentPath === "/" ? "" : parentPath;
  return `${basePath}/${currentPath}`;
};

const attachFullPath = (
  routes: AppRouteConfig[],
  parentPath = "",
): AppRouteRecord[] => {
  return routes.map((route) => {
    const fullPath = route.index
      ? parentPath || "/"
      : normalizePath(parentPath, route.path);

    return {
      ...route,
      fullPath,
      children: route.children
        ? attachFullPath(route.children, fullPath)
        : undefined,
    };
  });
};

const renderRouteElement = (route: AppRouteRecord): ReactNode => {
  if (route.redirect) {
    return <Navigate to={route.redirect} replace />;
  }

  if (!route.Component) {
    // Layout route without a component — let React Router render children via Outlet automatically.
    return <Outlet />;
  }

  const node = <route.Component />;
  // Only wrap leaf page components with RouteGuard, not layout components that contain <Outlet />.
  // Layout components (those with children) handle auth at the page level.
  const isLayout = Boolean(route.children?.length);
  return route.meta?.auth && !isLayout ? <RouteGuard>{node}</RouteGuard> : node;
};

const toRouteObjects = (routes: AppRouteRecord[]): RouteObject[] => {
  return routes.map((route) => {
    const shared = {
      element: renderRouteElement(route),
      handle: {
        meta: route.meta,
        fullPath: route.fullPath,
      },
    };

    if (route.index) {
      const indexRoute: IndexRouteObject = {
        index: true,
        ...shared,
      };
      return indexRoute;
    }

    const nonIndexRoute: NonIndexRouteObject = {
      path: route.path,
      children: route.children ? toRouteObjects(route.children) : undefined,
      ...shared,
    };
    return nonIndexRoute;
  });
};

const flattenRoutes = (routes: AppRouteRecord[]): AppRouteRecord[] => {
  return routes.flatMap((route) => [
    route,
    ...(route.children ? flattenRoutes(route.children) : []),
  ]);
};

export const appRouteTree = attachFullPath(rawRoutes);
export const appRoutes = toRouteObjects(appRouteTree);
export const flatAppRoutes = flattenRoutes(appRouteTree);

export const getSidebarMenuItems = () => {
  const rootRoute = appRouteTree.find((route) => route.path === "/");
  const children = rootRoute?.children ?? [];

  const transform = (routes: AppRouteRecord[]): RouteMenuItem[] => {
    return routes
      .filter((route) => route.meta?.title && !route.meta?.hidden)
      .map((route) => ({
        key: route.fullPath,
        label: route.meta!.title,
        icon: route.meta?.icon,
        children: route.children ? transform(route.children) : undefined,
      }));
  };

  return transform(children);
};

export const getRouteByPath = (pathname: string) => {
  return flatAppRoutes.find((route) => route.fullPath === pathname);
};

export const isTabRoute = (pathname: string) => {
  const route = getRouteByPath(pathname);
  return Boolean(route?.meta?.title && !route.meta.hidden && route.Component);
};
