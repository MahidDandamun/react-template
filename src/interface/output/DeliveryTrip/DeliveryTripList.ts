import { DeliveryStop } from "../../input/DeliveryTripInput";

export interface DeliveryTripList { 
    driver_name: string;
    status: string;
    departure_time: string;
    name: string;
    delivery_stops: DeliveryStop[];
    owner: string;
    creation: string;
}
