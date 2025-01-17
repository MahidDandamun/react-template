export interface RoutingList extends RoutingInfo {
  name: string;
  owner: string;
  disabled?: number;
}
export interface RoutingInfo {
  name: string;
  creation: string;
  owner: string;
  disabled?: number;
  docstatus?: number;
  operations?: BomOperations[];

}
export interface BomOperations {
  sequence_id?: number;
  operation: string;
  workstation_type?: string;
  // operating_cost?: number;
  time_in_mins?: number;
}