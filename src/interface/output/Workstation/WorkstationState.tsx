import { WorkstationList, WorkstationInfo } from './WorkstationList';

export interface WorkstationState {
  workstationList: WorkstationList[];
  isLoading: boolean;
  error: string | null;
  workstationInfo: WorkstationInfo | null;
}
