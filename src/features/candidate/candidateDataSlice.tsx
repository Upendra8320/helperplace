// candidatesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCandidates } from '../../apiService';

export interface Parameter {
  start: number;
  length: number;
  helper_name?: string;
  start_date?: Date;
  job_type_id?: number;
  country_id?: number;
  position_id?: number;
  nationality_id?: number;
  edu_id?: number;
  contract_status_id?: number;
  resume_manager?: string;
  gender?: string;
  age_min?: number;
  age_max?: number;
  experience_min?: number; // Updated from 0
  experience_max?: number;
  marital_status?: string;
  order_by?: string;
  location_order?: number; // Updated from 0
  lang?: string;
}

export const fetchCandidatesAction = createAsyncThunk(
  'candidates/fetchCandidates',
  async (params: Parameter) => {
    const data = await fetchCandidates(params);
    return data;
  }
);

interface CandidatesState {
  data: any[]; // Adjust the type accordingly
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: CandidatesState = {
  data: [],
  currentPage: 1,
  pageSize: 20,
  totalRecords: 0,
  isLoading: false,
  error: null,
};

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidatesAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCandidatesAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.totalRecords = action.payload.records_total;
      })
      .addCase(fetchCandidatesAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'Error fetching candidates';
      });
  },
});

export const { setCurrentPage } = candidatesSlice.actions;
export default candidatesSlice.reducer;
