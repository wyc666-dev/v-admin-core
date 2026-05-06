import { useMutation } from "@tanstack/react-query";

import { http } from "@/api/http";
import { MenuItem } from "@/types";

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginData {
  token: string;
  menu: MenuItem[];
  message: string;
}

export const login = (data: LoginParams) => {
  return http.post<LoginData, LoginParams>("/permission/getMenu", data);
};

export const getMenu = login;

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
  });
};
