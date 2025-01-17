import { PurchaseOrderInfo } from "../PurchaseOrder/PurchaseOrderList";

export interface PurchaseReceiptList {
    name: string;
    title: string;
    status: string;
    posting_date: string;
    grand_total: number;
    docstatus: number;
    items: PurchaseReceiptItems[];
    owner:string;
    creation: string;
}

export interface PurchaseReceiptItems {
    item_code: string;
    item_name: string;
    qty: number;
    rate: number;
    amount: number
}
export interface PurchaseReceiptInfo extends PurchaseReceiptList {
    supplier: string;
    posting_time: string;

}

export interface UnreceivedPurchaseOrders extends PurchaseOrderInfo {

}
