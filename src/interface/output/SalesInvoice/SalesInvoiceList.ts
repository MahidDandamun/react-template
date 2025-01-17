export interface SalesInvoiceList extends SalesInvoiceInfo {
  customer_name: string;
  grand_total: number;
  per_billed: number;
  per_delivered: number;
}

export interface SalesInvoiceInfo {
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