import { WorkstationTypeList, WorkstationTypeInfo } from './WorkstationTypeList';

export interface WorkstationTypeState {
  workstationTypeList: WorkstationTypeList[];
  isLoading: boolean;
  error: string | null;
  workstationTypeInfo: WorkstationTypeInfo | null;
}
