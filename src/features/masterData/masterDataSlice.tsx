import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// interface MasterData {
//   job_type: any[]; // Adjust the type accordingly
//   job_position: any[];
//   accommodation_type: any[];
//   contract_status: any[];
//   religion: any[];
//   nationality: any[];
//   marital_status: any[];
//   employer_type: any[];
//   education_level: any[];
//   skill_category: any[];
//   skills: any[];
//   job_location: any[];
//   edu_course: any[];
//   language: any[];
//   family_type: any[];
//   currency: any[];
//   exp_position: any[];
//   exp_duties_list: any[];
//   shortlist_status: any[];
//   candidate_duties_list: any[];
//   experience_job_position: any[];
//   employer_shortlist_status_list: any[];
//   resume_status: any[];
//   job_status: any[];
//   language_list: any[];
//   candidate_country: any[];
// }

interface MasterDataState {
  data: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MasterDataState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchMasterDataAction = createAsyncThunk(
  "masterData/fetchMasterData",
  async () => {
    try {
      const response = await axios.get(
        "https://api2.helperplace.com/mobile/masterdata/GetAllMasterDataJson"
      ); // Adjust the function based on your actual API call
      return response.data.data;
    } catch (error) {
      throw Error("error finding the data");
    }
  }
);

const masterDataSlice = createSlice({
  name: "masterData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMasterDataAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMasterDataAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchMasterDataAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Error fetching master data";
      });
  },
});

export default masterDataSlice.reducer;
