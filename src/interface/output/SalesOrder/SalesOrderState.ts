import { SalesOrderInfo, SalesOrderList } from "./SalesOrderList";

export interface SalesOrderState {
    salesOrderList: SalesOrderList[];
    isLoading: boolean;
    error: string | null;
    salesOrderInfo: SalesOrderInfo | null
}