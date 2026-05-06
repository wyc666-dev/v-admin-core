import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";

import type { ServiceResponse } from "@/types";

const baseURL = "";
const SUCCESS_CODE = 20000;
const TOKEN_STORAGE_KEY = "token";

type RequestConfig<TData = unknown, TParams = unknown> = Omit<
  AxiosRequestConfig<TData>,
  "params"
> & {
  params?: TParams;
};

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

const getBusinessMessage = <T>(response: ServiceResponse<T>) => {
  if (response.message) {
    return response.message;
  }

  if (typeof response.data === "string") {
    return response.data;
  }

  if (
    response.data &&
    typeof response.data === "object" &&
    "message" in response.data &&
    typeof response.data.message === "string"
  ) {
    return response.data.message;
  }

  return "请求失败";
};

const getHttpErrorMessage = (error: AxiosError<ServiceResponse<unknown>>) => {
  if (error.response?.data) {
    return getBusinessMessage(error.response.data);
  }

  if (error.code === "ECONNABORTED") {
    return "请求超时，请稍后重试";
  }

  if (!error.response) {
    return "网络异常，请检查连接";
  }

  switch (error.response.status) {
    case 401:
      return "登录已失效，请重新登录";
    case 403:
      return "暂无权限访问";
    case 404:
      return "请求的资源不存在";
    case 500:
      return "服务器异常，请稍后重试";
    default:
      return error.message || "请求失败";
  }
};

const attachToken = (config: InternalAxiosRequestConfig) => {
  const token = getToken();

  if (!token) {
    return config;
  }

  if (config.headers instanceof AxiosHeaders) {
    config.headers.set("Authorization", `Bearer ${token}`);
  } else {
    const headers = AxiosHeaders.from(config.headers);
    headers.set("Authorization", `Bearer ${token}`);
    config.headers = headers;
  }

  return config;
};

api.interceptors.request.use((config) => {
  return attachToken(config);
});

api.interceptors.response.use(
  <T>(response: AxiosResponse<ServiceResponse<T>>) => {
    const payload = response.data;

    if (payload.code !== SUCCESS_CODE) {
      const message = getBusinessMessage(payload);
      toast.error(message);
      return Promise.reject(new Error(message));
    }

    return payload.data;
  },
  (error: AxiosError<ServiceResponse<unknown>>) => {
    const message = getHttpErrorMessage(error);

    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }

    toast.error(message);
    return Promise.reject(error);
  },
);

export const request = <TResponse, TData = unknown, TParams = unknown>(
  config: RequestConfig<TData, TParams>,
) => {
  return api.request<ServiceResponse<TResponse>, TResponse, TData>(
    config as AxiosRequestConfig<TData>,
  );
};

export const get = <TResponse, TParams = unknown>(
  url: string,
  params?: TParams,
  config?: Omit<RequestConfig<never, TParams>, "url" | "method" | "params">,
) => {
  return request<TResponse, never, TParams>({
    ...config,
    url,
    method: "get",
    params,
  });
};

export const post = <TResponse, TData = unknown>(
  url: string,
  data?: TData,
  config?: Omit<RequestConfig<TData>, "url" | "method" | "data">,
) => {
  return request<TResponse, TData>({
    ...config,
    url,
    method: "post",
    data,
  });
};

export const put = <TResponse, TData = unknown>(
  url: string,
  data?: TData,
  config?: Omit<RequestConfig<TData>, "url" | "method" | "data">,
) => {
  return request<TResponse, TData>({
    ...config,
    url,
    method: "put",
    data,
  });
};

export const remove = <TResponse, TParams = unknown>(
  url: string,
  params?: TParams,
  config?: Omit<RequestConfig<never, TParams>, "url" | "method" | "params">,
) => {
  return request<TResponse, never, TParams>({
    ...config,
    url,
    method: "delete",
    params,
  });
};

export const http = {
  request,
  get,
  post,
  put,
  delete: remove,
};
