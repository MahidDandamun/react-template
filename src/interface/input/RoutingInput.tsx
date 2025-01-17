export interface RoutingInput{
    // name: string;
    routing_name:string;
    operations?: BomOperation[];
}

export interface BomOperation {
    operation: string; 
    workstation_type?: string; 
    time_in_mins?: number;
    operating_cost?: number;
}