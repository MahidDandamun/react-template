import { createSlice } from '@reduxjs/toolkit';
import { WorkstationState } from '../../interface/output/Workstation/WorkstationState';
import {
  getWorkstationList,
  getWorkstationInfo,
  createWorkstation,
  deleteWorkstation,
  updateWorkstation,
} from '../services/WorkstationService';

const initialState: WorkstationState = {
  workstationList: [],
  isLoading: true,
  error: null,
  workstationInfo: null,
};

const WorkStationSlice = createSlice({
  name: 'workStations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkstationList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWorkstationList.fulfilled, (state, action) => {
        state.workstationList = action.payload;
        state.isLoading = false;
      })
      .addCase(getWorkstationList.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'failed fetching workstation list';
      });
    builder
      .addCase(getWorkstationInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWorkstationInfo.fulfilled, (state, action) => {
        state.workstationInfo = action.payload;
        state.isLoading = false;
      })
      .addCase(getWorkstationInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'failed fetching workstation info';
      });
    builder
      .addCase(createWorkstation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createWorkstation.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createWorkstation.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'failed creating workstation list';
      });
    builder
      .addCase(updateWorkstation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateWorkstation.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateWorkstation.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'failed updating workstation list';
      });
    builder
      .addCase(deleteWorkstation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteWorkstation.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteWorkstation.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'failed deleting workstation list';
      });
  },
});

export default WorkStationSlice.reducer;
