import { WorkReceiptInfo, WorkReceiptList, UnreceivedWorkOrders } from "./WorkReceiptList";

export interface WorkReceiptState {
    workReceiptList: WorkReceiptList[];
    isLoading: boolean;
    error: string | null;
    unreceivedWorkOrders: UnreceivedWorkOrders[];
    workReceiptInfo: WorkReceiptInfo | null
}