export interface SalesOrderInput {
    customer: string;
    order_type: string;
    transaction_date: string;
    delivery_date: string;
    items: { item_code: string; qty: number; rate: number }[];
}