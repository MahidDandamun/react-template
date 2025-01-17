import { createSlice } from '@reduxjs/toolkit';
import { BillOfMaterialsState } from '../../interface/output/BillOfMaterials/BillOfMaterialsState';
import {
  getBillOfMaterialsList,
  getBillOFMaterialsInfo,
  createBillOfMaterials,
  deleteBillOfMaterials,
  updateBillOfMaterials,
} from '../services/BillOfMaterialsService';

const initialState: BillOfMaterialsState = {
  billOfMaterialsList: [],
  isLoading: true,
  error: null,
  billOfMaterialsInfo: null,
};

const BillOfMaterialsSlice = createSlice({
  name: 'billOfMaterials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBillOfMaterialsList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBillOfMaterialsList.fulfilled, (state, action) => {
        state.billOfMaterialsList = action.payload;
        state.isLoading = false;
      })
      .addCase(getBillOfMaterialsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'failed fetching bill of materials list';
      });
    builder
      .addCase(getBillOFMaterialsInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBillOFMaterialsInfo.fulfilled, (state, action) => {
        state.billOfMaterialsInfo = action.payload;
        state.isLoading = false;
      })
      .addCase(getBillOFMaterialsInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'failed fetching bill of materials info';
      });
    builder
      .addCase(createBillOfMaterials.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBillOfMaterials.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createBillOfMaterials.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'failed creating bill of materials list';
      });
    builder
      .addCase(updateBillOfMaterials.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBillOfMaterials.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateBillOfMaterials.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'failed updating bill of materials list';
      });
    builder
      .addCase(deleteBillOfMaterials.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBillOfMaterials.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteBillOfMaterials.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'failed deleting bill of materials list';
      });
  },
});

export default BillOfMaterialsSlice.reducer;
