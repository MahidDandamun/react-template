import { PurchaseReceiptInfo, PurchaseReceiptList, UnreceivedPurchaseOrders } from "./PurchaseReceiptList";

export interface PurchaseReceiptState {
    purchaseReceiptList: PurchaseReceiptList[];
    isLoading: boolean;
    error: string | null;
    unreceivedPurchaseOrders: UnreceivedPurchaseOrders[];
    purchaseReceiptInfo: PurchaseReceiptInfo | null
}