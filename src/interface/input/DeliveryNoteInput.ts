export interface DeliveryNoteInput{
    customer: string;
    posting_date: string;
    posting_time: string;
    items: DeliveryNoteItems[]
}

export interface DeliveryNoteItems {
    item_code: string;
    item_name: string;
    qty: number;
    rate: number;
    amount: number;
    so_detail: string;
    against_sales_order: string;
}

// export interface Inputs{
//     item_name: string;
//     qty: number;
//     rate:number; 
//     amount: number; 
//     so_details: string; 
//     against_sales_order: string 
// }