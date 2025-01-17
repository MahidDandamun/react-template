import { WorkOrderInfo } from "../WorkOrder/WorkOrderList";

export interface WorkReceiptList {
    name: string;
    title: string;
    status: string;
    posting_date: string;
    grand_total: number;
    docstatus: number;
    items: WorkReceiptItems[];
    owner:string;
    creation: string;
}

export interface WorkReceiptItems {
    item_code: string;
    item_name: string;
    qty: number;
    rate: number;
    amount: number
}
export interface WorkReceiptInfo extends WorkReceiptList {
    supplier: string;
    posting_time: string;

}

export interface UnreceivedWorkOrders extends WorkOrderInfo {

}
