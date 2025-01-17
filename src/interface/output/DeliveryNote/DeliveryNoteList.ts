export interface DeliveryNoteList {
    name: string;
    title: string;
    status: string;
    grand_total: number;
    owner: string;
    posting_date: string;
}

export interface UndeliveredSalesOrder {
    name: string;
    customer: string;
    company: string;
    transaction_date: string; 
    delivery_date: string;    
    status: string;
    delivery_status: string;
    billing_status: string;
    items: UndeliveredSalesOrderItem[]
}

export interface UndeliveredSalesOrderItem {
    name: string;
    item_code: string;
    item_name: string;
    item_group: string;
    qty: number;
    uom: string;
    description: string;
    parent: string;
    rate: number;
    amount: number;
}

export interface DeliveryNoteInfo {
    name: string;
    owner: string;
    docstatus: number;
    status: string;
    customer: string;
    posting_date: string;
    posting_time: string;
    company: string;
    items: DeliveryNoteInfoItems[];
}

export interface DeliveryNoteInfoItems {
    name: string;
    item_code: string;
    item_name: string;
    item_group: string;
    qty: number;
    uom: string;
    rate: number;
    amount: number;
}
  