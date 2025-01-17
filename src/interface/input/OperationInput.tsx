export interface OperationInput {
  name: string;
  workstation?: string;
  description?: string;
  sub_operations?: { operation: string;  time_in_mins:number}[];
}