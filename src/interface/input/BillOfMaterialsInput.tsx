export interface BillOfMaterialsInput {
  item: string;
  company: string;
  quantity: number;
  //project?: string;
  items: { item_code: string; qty: number }[];
}

