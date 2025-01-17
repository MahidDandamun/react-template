export interface PurchaseReceiptInput {
    supplier: string;
    posting_date: string;
    posting_time: string;
    items: PurchaseReceiptItemsInput[]
}

export interface PurchaseReceiptItemsInput {
    item_code: string; 
    qty: number; 
    rate: number;
    rejected_qty?: number;
    amount: number;
}