import { WorkOrderInfo, WorkOrderList } from "./WorkOrderList";

export interface WorkOrderState {
    workOrderList: WorkOrderList[],
    isLoading: boolean;
    error: string | null;
    workOrderInfo: WorkOrderInfo | null;
}