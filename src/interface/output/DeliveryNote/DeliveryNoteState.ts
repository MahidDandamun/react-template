import { DeliveryNoteInfo, DeliveryNoteList,UndeliveredSalesOrder } from "./DeliveryNoteList";

export interface DeliveryNoteState {
    deliveryNoteList: DeliveryNoteList[];
    isLoading: boolean;
    error: string | null;
    undeliveredSalesOrder: UndeliveredSalesOrder[];
    deliveryNoteInfo: DeliveryNoteInfo | null
}