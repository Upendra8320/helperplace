import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios  from 'axios';
export const candidateData = createAsyncThunk<[], void, { rejectValue: string }>(
  "get/candidatedata",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("https://api2.helperplace.com/mobile/candidate/FindCandidate?start=0&length=20&helper_name=&start_date=&job_type_id=1&country_id=&position_id=&nationality_id=&edu_id=&contract_status_id=&resume_manager=&gender=&age_min=18&age_max=60&experience_min=0&experience_max=40&marital_status=&order_by=last_active&location_order=0&lang=en");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch issues.");
    }
  }
);
interface IssuesState {
  data: [];
  loading: boolean;
  error: string | null;
}
const initialState: IssuesState = {
  data: [],
  loading: false,
  error: null,
};
export const candidateSlice = createSlice({
  name: 'candidateData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(candidateData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(candidateData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(candidateData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong'; 
      });
  },
});
export default candidateSlice.reducer; 
