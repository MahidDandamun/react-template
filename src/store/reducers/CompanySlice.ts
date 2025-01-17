import { createSlice } from "@reduxjs/toolkit"
import { CompanyState } from "../../interface/output/Company/CompanyState"
import { getCompanyList } from "../services/CompanyService";

const initialState: CompanyState = {
    companyList: [],
    isLoading: false,
    error: null,
    companyInfo: null
}

const CompanyListSlice = createSlice({
    name: "company",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCompanyList.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getCompanyList.fulfilled, (state, action) => {
            state.companyList = action.payload.data;
            state.isLoading = false;
        })
        .addCase(getCompanyList.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || "Login failed";
        });
    }
})

export default CompanyListSlice.reducer;