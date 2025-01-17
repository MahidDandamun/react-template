export interface WorkReceiptInput {
    supplier: string;
    posting_date: string;
    posting_time: string;
    items: WorkReceiptItemsInput[]
}

export interface WorkReceiptItemsInput {
    item_code: string; 
    qty: number; 
    rate: number;
    rejected_qty?: number;
    amount: number;
}