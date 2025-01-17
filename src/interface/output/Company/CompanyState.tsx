import {
  CompanyList,
  CompanyInfo,
} from './CompanyList';
export interface CompanyState {
    companyList: CompanyList[],
    isLoading: boolean,
    error: any,
    companyInfo:CompanyInfo | null

}