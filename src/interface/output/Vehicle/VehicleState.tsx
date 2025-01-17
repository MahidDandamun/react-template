import { VehicleList } from "./VehicleList";

export interface VehicleState {
    vehicleList: VehicleList[];
    isLoading: boolean;
    error: any;
}