import { createSlice } from "@reduxjs/toolkit";
import { ActivityState } from "../../interface/output/ActivityLogs/ActivityLogs";
import { addComment, getActivityLogs } from "../services/ActivityService";

const initialState: ActivityState = {
    activityList: [],
    error: null,
    isLoading: true
}

const ActivityLogSlice = createSlice({
    name: "activityLogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getActivityLogs.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getActivityLogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.activityList = action.payload;
            })
            .addCase(getActivityLogs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'error fetching activity logs';
            })
        builder
            .addCase(addComment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(addComment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'error adding comment';
            })
    }
})

export default ActivityLogSlice.reducer;