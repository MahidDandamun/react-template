import { CustomersList } from "./CustomersList";
export interface CustomersState {
  customersList: CustomersList[];
  isLoading: boolean;
  error: string | null;
  territory: [];
  customer_group: [];
  customer_info: CustomersList | null;
}
