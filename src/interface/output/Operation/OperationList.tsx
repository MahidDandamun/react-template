export interface OperationList extends OperationInfo {
  name: string;
  owner: string;
  workstation?: string;
  description?: string;
  total_operation_time?: string;
}

export interface OperationInfo {
  name: string;
  owner: string;
  creation: string;
  workstation?: string;
  description?: string;
  sub_operations?: {
    operation?: string;
    time_in_mins?: number
  }[];
}

 