export interface ItemInput {
    item_code: string; 
    qty: number; 
    rate: number
}

export interface CreateItemInput {
    item_code?: string;
    item_name: string;
    item_group: string;
    stock_uom?: string;
    opening_stock?: number;
    standard_rate?: number;
}