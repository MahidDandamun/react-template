export interface SalesOrderList {
    name: string;
    modified_by: string;
    status: string;
    delivery_date: string;
  }

export interface SalesOrderDetails {
    name: string;
    customer: string;
    order_type: string;
    transaction_date: string;
    delivery_date: string;
    docstatus: number;
    status: string;
    company: string;
    items: {
      item_code: string;
      qty: number;
      rate: number;
    }[];
  }