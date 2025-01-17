import { SalesInvoiceInfo, SalesInvoiceList } from "./SalesInvoiceList";

export interface SalesInvoiceState {
    salesInvoiceList: SalesInvoiceList[];
    isLoading: boolean;
    error: string | null;
    salesInvoiceInfo: SalesInvoiceInfo | null
}