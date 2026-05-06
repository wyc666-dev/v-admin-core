import { useQuery } from "@tanstack/react-query";

import { http } from "@/api/http";

interface OrderDataItem {
  苹果: number;
  vivo: number;
  oppo: number;
  魅族: number;
  三星: number;
  小米: number;
}

interface HomeTableItem {
  name: string;
  todayBuy: number;
  monthBuy: number;
  totalBuy: number;
}

export interface HomeData {
  videoData: Array<{ name: string; value: number }>;
  userData: Array<{ date: string; new: number; active: number }>;
  orderData: { date: string[]; data: OrderDataItem[] };
  tableData: HomeTableItem[];
}

export const homeQueryKeys = {
  all: ["home"] as const,
  dashboard: () => [...homeQueryKeys.all, "dashboard"] as const,
};

export const getHomeData = () => {
  return http.get<HomeData>("/home/getData");
};

export const useHomeQuery = () => {
  return useQuery({
    queryKey: homeQueryKeys.dashboard(),
    queryFn: getHomeData,
  });
};
