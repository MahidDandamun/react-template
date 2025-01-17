// import { TotalSales } from "./DashboardContent";
export interface DashboardState {
  curr_month_total_sales: number | null;
  prev_month_total_sales: number | null;
  total_stocks: number | null;
  isLoading: boolean;
  error: string | null;
}
