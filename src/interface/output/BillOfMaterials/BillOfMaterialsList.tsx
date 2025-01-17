export interface BillOfMaterialsList extends BillOfMaterialsInfo {
  
  //transaction_date: string;
  //supplier_name: string;
  owner: string;
  raw_material_cost: number;
  name: string;
  quantity: number;
  company:string
}

export interface BillOfMaterialsInfo {
  name: string;
  creation: string;
  item: string;
  company: string;
  docstatus: number;
 
  raw_material_cost?: number;
  operating_cost?: number;
  // scrap_material_cost?: number;
  total_cost: number;
  quantity: number;
  doctype: string;
  items: {
    item_code: string;
    name: string;
    qty: number;
    valuation_rate?: number;
    amount: number;
    parent: string;
  }[];
}

 
