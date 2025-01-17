export interface WorkstationInput {
  workstation_name: string;
  production_capacity: number;
  workstation_type: string;
  electricity_cost?: number;
  consumable_cost?: number;
  rent_cost?: number;
  wages?: number;
  description?: string;
}