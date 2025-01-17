import { createSlice } from "@reduxjs/toolkit";
import { ItemState } from "../../interface/output/Items/ItemState";
import { deleteItem, getItemGroup, getItemInfo, getItemList, getUOM, updateItem } from "../services/ItemService";


const initialState: ItemState = {
    itemList: [],
    isLoading: true,
    error: null,
    itemGroup: [],
    uom: [],
    itemInfo: null
};

const ItemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getItemList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getItemList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.itemList = action.payload;
            })
            .addCase(getItemList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'error fetching item';
            })
        builder
            .addCase(getItemGroup.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getItemGroup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.itemGroup = action.payload;
            })
            .addCase(getItemGroup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'error fetching item group';
            })
        builder
            .addCase(getUOM.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUOM.fulfilled, (state, action) => {
                state.isLoading = false;
                state.uom = action.payload;
            })
            .addCase(getUOM.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'error fetching uom';
            })
        builder
            .addCase(getItemInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getItemInfo.fulfilled, (state, action) => {
                state.itemInfo = action.payload;
                state.isLoading = false;
            })
            .addCase(getItemInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'error updating item';
            })
        builder
            .addCase(updateItem.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updateItem.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'error updating item';
            })
        builder
            .addCase(deleteItem.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'error deleting item';
            })

    }
})

export default ItemSlice.reducer;