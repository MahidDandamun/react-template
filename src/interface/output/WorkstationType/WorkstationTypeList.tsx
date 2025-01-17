export interface WorkstationTypeList extends WorkstationTypeInfo {
  name: string;
  creation?: string;
  owner?: string;
  description?: string;
  workstation_type?: string;
}

export interface WorkstationTypeInfo {
  workstation_type?: string;
  name: string;
  description?: string;
  hour_rate_electricity?: number;
  hour_rate_consumable?: number;
  hour_rate_rent?: number;
  hour_rate_labour?: number;
  hour_rate?: number;
}
