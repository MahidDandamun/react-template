export interface WorkstationList extends WorkstationInfo {
  name: string;
  creation: string;
  owner?: string;
  description?: string;
  production_capacity: number;
  workstation_type?: string;
}

export interface WorkstationInfo {
  
  description?: string;
  workstation_name: string;
  production_capacity: number;
  workstation_type?: string;
  hour_rate_electricity?: number;
  hour_rate_consumable?: number;
  hour_rate_rent?: number;
  hour_rate_labour?: number;
  hour_rate?: number;
  //working_hours [start_time, end_time]
}
