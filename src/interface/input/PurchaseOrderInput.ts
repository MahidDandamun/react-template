export interface PurchaseOrderInput {
    supplier: string;
    transaction_date: string;
    schedule_date: string;
    items: PurchaseOrderItemsInput[];
}

export interface PurchaseOrderItemsInput {
    item_code: string; 
    qty: number; 
    rate: number
}