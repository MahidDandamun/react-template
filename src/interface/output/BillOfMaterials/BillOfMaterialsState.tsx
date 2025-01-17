import {
  BillOfMaterialsInfo,
  BillOfMaterialsList,
} from './BillOfMaterialsList';

export interface BillOfMaterialsState {
  billOfMaterialsList: BillOfMaterialsList[];
  isLoading: boolean;
  error: string | null;
  billOfMaterialsInfo: BillOfMaterialsInfo | null;
}
