import { createSlice } from '@reduxjs/toolkit';
import { WorkstationTypeState } from '../../interface/output/WorkstationType/WorkstationTypeState';
import {
  getWorkstationTypeList,
  getWorkstationTypeInfo,
  createWorkstationType,
  deleteWorkstationType,
  updateWorkstationType,
} from '../services/WorkstationTypeService';

const initialState: WorkstationTypeState = {
  workstationTypeList: [],
  isLoading: true,
  error: null,
  workstationTypeInfo: null,
};

const WorkStationTypeSlice = createSlice({
  name: 'workStationTypes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkstationTypeList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWorkstationTypeList.fulfilled, (state, action) => {
        state.workstationTypeList = action.payload;
        state.isLoading = false;
      })
      .addCase(getWorkstationTypeList.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'failed fetching workstation types list';
      });
    builder
      .addCase(getWorkstationTypeInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWorkstationTypeInfo.fulfilled, (state, action) => {
        state.workstationTypeInfo = action.payload;
        state.isLoading = false;
      })
      .addCase(getWorkstationTypeInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'failed fetching workstation type info';
      });
    builder
      .addCase(createWorkstationType.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createWorkstationType.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createWorkstationType.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'failed creating workstation type list';
      });
    builder
      .addCase(updateWorkstationType.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateWorkstationType.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateWorkstationType.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'failed updating workstation type list';
      });
    builder
      .addCase(deleteWorkstationType.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteWorkstationType.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteWorkstationType.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'failed deleting workstation type list';
      });
  },
});

export default WorkStationTypeSlice.reducer;
