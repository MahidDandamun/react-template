export interface DeliveryTripInput {
    company_name: string;
    driver_name?: string;
    vehicle: string;
    departure_time: string;
    delivery_stops: DeliveryStop[],
    driver?: string;
}

export interface DeliveryStop {
    customer: string,
    address: string,
    locked: boolean,
    delivery_notes: string,
    estimated_arrival: string,
}