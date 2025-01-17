export interface PurchaseOrderList {
  name: string;
  workflow_state?: string;
  status: string;
  transaction_date: string;
  supplier_name: string;
  per_billed: number;
  per_received: number;
  grand_total: number;
  owner: string;
  creation: string;
  doctype: string;
}

export interface PurchaseOrderInfo extends PurchaseOrderList {
  schedule_date: string;
  supplier?: string;
  docstatus: number;
  items: PurchaseOrderItems[];
}

export interface PurchaseOrderItems {
  item_code: string;
  item_name: string;
  qty: number;
  rate: number;
  amount: number;
  parent?: string;
  name?: string;
}
