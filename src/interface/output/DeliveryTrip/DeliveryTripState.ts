import { DeliveryTripList } from "./DeliveryTripList";

export interface DeliveryTripState {
    deliveryTripList: DeliveryTripList[],
    deliveryTripInfo: any;
    deliveryTripCount: number;
    addressList: [],
    isLoading: boolean;
    error: any;
}
