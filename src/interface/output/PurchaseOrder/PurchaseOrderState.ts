import { PurchaseOrderInfo, PurchaseOrderList } from "./PurchaseOrderList";

export interface PurchaseOrderState {
    purchaseOrderList: PurchaseOrderList[],
    isLoading: boolean;
    error: string | null;
    purchaseOrderInfo: PurchaseOrderInfo | null;
}