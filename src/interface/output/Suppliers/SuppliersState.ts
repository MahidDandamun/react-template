import { SuppliersList } from "./SuppliersList";

export interface SuppliersState {
    suppliersList: SuppliersList[];
    isLoading: boolean;
    error: string | null;
    supplierGroup: [];
    supplierInfo: SuppliersList | null;
}