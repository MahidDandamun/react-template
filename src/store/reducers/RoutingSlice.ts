import { createSlice } from "@reduxjs/toolkit";
import { RoutingState } from "../../interface/output/Routing/RoutingState";
import { createRouting, deleteRouting, getRoutingInfo, getRoutingList, updateRouting } from "../services/RoutingService";

const initialState: RoutingState = {
    routingList: [],
    isLoading: true,
    error: null,
    routingInfo: null
}

const RoutingSlice = createSlice({
    name: "routing",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRoutingList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getRoutingList.fulfilled, (state, action) => {
                state.routingList = action.payload;
                state.isLoading = false;
            })
            .addCase(getRoutingList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed fetching routing list';
            });
        builder
            .addCase(createRouting.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createRouting.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(createRouting.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed creating routing list';
            });
        builder
            .addCase(getRoutingInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getRoutingInfo.fulfilled, (state, action) => {
                state.routingInfo = action.payload
                state.isLoading = false;
            })
            .addCase(getRoutingInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed fetching routing info';
            });
        builder
            .addCase(updateRouting.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateRouting.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updateRouting.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed updating routing info';
            });
        builder
            .addCase(deleteRouting.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteRouting.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteRouting.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'failed deleting routing info';
            });

    }
})

export default RoutingSlice.reducer;