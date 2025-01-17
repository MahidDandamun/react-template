export interface WorkOrderList extends WorkOrderInfo{
  production_item: string;
  status: string;
  name: string;
  owner: string;

}
export interface WorkOrderInfo {
    schedule_date: string;
    supplier?: string;
    docstatus: number;
    items: WorkOrderItems[]
    name: string;
    production_item: string;
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

export interface WorkOrderItems {
  item_code: string;
  item_name: string;
  qty: number;
  rate: number;
  amount: number
  parent?: string;
  name?:string;
}