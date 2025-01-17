export interface SalesOrderList extends SalesOrderInfo {
  customer_name: string;
  grand_total: number;
  per_billed: number;
  per_delivered: number;
}

export interface SalesOrderInfo {
  name: string;
  customer: string;
  order_type: string;
  transaction_date: string;
  delivery_date: string;
  docstatus: number;
  status: string;
  company: string;
  owner: string;
  creation: string;
  items: {
    item_code: string;
    qty: number;
    rate: number;
  }[];
}