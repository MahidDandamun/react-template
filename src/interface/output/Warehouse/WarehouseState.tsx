import { WarehouseList } from './WarehouseList';

export interface WarehouseState {
    data: WarehouseList[],
    warehouse_info: any,
    isLoading: boolean,
    error: any,
};
