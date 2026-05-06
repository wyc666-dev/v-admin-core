import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { http } from "@/api/http";
import { UserItem } from "@/types";

export interface UserListParams {
  name?: string;
  page?: number;
  limit?: number;
}

export interface UserFormData {
  id?: string;
  name: string;
  age: number;
  birth: string;
  sex: 0 | 1;
  addr: string;
}

interface UserListData {
  list: UserItem[];
  count: number;
}

export const userQueryKeys = {
  all: ["users"] as const,
  list: (params?: UserListParams) => [...userQueryKeys.all, params ?? {}] as const,
};

export const getUser = (params?: UserListParams) => {
  return http.get<UserListData, UserListParams>("/user/getUser", params);
};

export const addUser = (data: UserFormData) => {
  return http.post<string, UserFormData>("/user/addUser", data);
};

export const editUser = (data: UserFormData) => {
  return http.post<string, UserFormData>("/user/editUser", data);
};

export const deleteUser = (data: Pick<UserFormData, "id">) => {
  return http.post<string, Pick<UserFormData, "id">>("/user/deleteUser", data);
};

export const useUserListQuery = (params?: UserListParams) => {
  return useQuery({
    queryKey: userQueryKeys.list(params),
    queryFn: () => getUser(params),
  });
};

export const useAddUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all,
      });
    },
  });
};

export const useEditUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all,
      });
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.all,
      });
    },
  });
};
