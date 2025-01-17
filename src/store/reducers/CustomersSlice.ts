import { createSlice } from "@reduxjs/toolkit";
import { CustomersState } from "../../interface/output/Customers/CustomersState";
import {
  createCustomer,
  deleteCustomer,
  getCustomerGroup,
  getCustomerInfo,
  getCustomersList,
  getTerritory,
  updateCustomer,
} from "../services/CustomerService";

const initialState: CustomersState = {
  customersList: [],
  isLoading: true,
  error: null,
  territory: [],
  customer_group: [],
  customer_info: null,
};

const CustomersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomersList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCustomersList.fulfilled, (state, action) => {
        state.customersList = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getCustomersList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      });
    builder
      .addCase(createCustomer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        // state.customersList.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      });
    builder
      .addCase(getCustomerGroup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCustomerGroup.fulfilled, (state, action) => {
        state.customer_group = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getCustomerGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      });
    builder
      .addCase(getTerritory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTerritory.fulfilled, (state, action) => {
        state.territory = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getTerritory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      });
    builder
      .addCase(getCustomerInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCustomerInfo.fulfilled, (state, action) => {
        state.customer_info = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getCustomerInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      });
    builder
      .addCase(updateCustomer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.customer_info = action.payload.data;
        state.isLoading = false;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed updating customer';
      });
    builder
      .addCase(deleteCustomer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed deleting customer';
      });
  },
});

export default CustomersSlice.reducer;
