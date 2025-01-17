export interface WarehouseList {
    warehouse_name: string;
    name?:string;
    is_group?: boolean;
    company: string;
    disabled?: number;
    owner?:string;
};