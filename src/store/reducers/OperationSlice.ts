import { createSlice } from '@reduxjs/toolkit';
 
import { OperationState } from './../../interface/output/Operation/OperationState';
import {
  getOperationList,
  getOperationInfo,
  createOperation,
  deleteOperation,
  updateOperation,
} from '../services/OperationService';

const initialState: OperationState = {
  operationList: [],
  isLoading: true,
  error: null,
  operationInfo: null,
};

const OperationSlice = createSlice({
  name: 'workStations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOperationList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOperationList.fulfilled, (state, action) => {
        state.operationList = action.payload;
        state.isLoading = false;
      })
      .addCase(getOperationList.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'failed fetching operation list';
      });
    builder
      .addCase(getOperationInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOperationInfo.fulfilled, (state, action) => {
        state.operationInfo = action.payload;
        state.isLoading = false;
      })
      .addCase(getOperationInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'failed fetching operation info';
      });
    builder
      .addCase(createOperation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOperation.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createOperation.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'failed creating operation list';
      });
    builder
      .addCase(updateOperation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOperation.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateOperation.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'failed updating operation list';
      });
    builder
      .addCase(deleteOperation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOperation.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteOperation.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'failed deleting operation list';
      });
  },
});

export default OperationSlice.reducer;
