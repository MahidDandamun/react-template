export interface CompanyList extends CompanyInfo{
  name: string;
  creation: string;
  owner: string;
}

export interface CompanyInfo{

  name: string;
  creation: string;
  modified: string;
  modified_by: string;  
  owner: string;
  default_currency: string;
}