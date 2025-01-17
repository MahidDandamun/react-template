import { createSlice } from "@reduxjs/toolkit";
import { DashboardState } from "../../interface/output/Dashboard/DashboardState";
import {
  getSalesThisMonth,
  getSalesLastMonth
 } from "../services/DashboardService";

const initialState: DashboardState = {
  total_stocks: 0,
  curr_month_total_sales: 0,
  prev_month_total_sales:0,
  error: null,
  isLoading: false
}

const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSalesThisMonth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSalesThisMonth.fulfilled, (state, action) => {
        console.log("API response:", action.payload); 
        state.isLoading = false;
        const salesData = action.payload && action.payload.length > 0 ? action.payload[0] : null;
        state.curr_month_total_sales = salesData ? salesData.total_sales : 0; // Set default to 0 if no data
        state.error = null;
      })
      .addCase(getSalesThisMonth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'error getting total sales';
        state.curr_month_total_sales = null;
      })
    builder
      .addCase(getSalesLastMonth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSalesLastMonth.fulfilled, (state, action) => {
        console.log("API response:", action.payload);
        state.isLoading = false;
        const salesData = action.payload && action.payload.length > 0 ? action.payload[0] : null;
        state.prev_month_total_sales = salesData ? salesData.total_sales : 0; 
        state.error = null;
      })
      .addCase(getSalesLastMonth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'error getting total sales';
        state.prev_month_total_sales = null;
      })
  }
})

export default DashboardSlice.reducer;