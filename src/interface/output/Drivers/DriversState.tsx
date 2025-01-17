import { DriversList } from "./DriversList";

export interface DriversState {
    driverList: DriversList[],
    supplier_list: [];
    driver_info: any,
    isLoading: boolean,
    error: any,
}