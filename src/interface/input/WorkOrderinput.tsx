export interface WorkOrderInput {
    supplier: string;
    transaction_date: string;
    schedule_date: string;
    items: WorkOrderItemsInput[];
}

export interface WorkOrderItemsInput {
    item_code: string; 
    qty: number; 
    rate: number
}