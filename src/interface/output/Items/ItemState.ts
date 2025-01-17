import { ItemList } from "./ItemList";

export interface ItemState {
    itemList: ItemList[];
    isLoading: boolean;
    error: string | null;
    itemGroup: [];
    uom: [];
    itemInfo: ItemList | null;
}