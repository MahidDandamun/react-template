import { OperationList, OperationInfo } from './OperationList';

export interface OperationState {
  operationList: OperationList[];
  isLoading: boolean;
  error: string | null;
  operationInfo: OperationInfo | null;
}
