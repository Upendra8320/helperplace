// candidatesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchResume } from '../../apiService';

// export interface Parameter {
//   resume_url: string;
//   resume_id: string;
// }

export const fetchCandidatesResume = createAsyncThunk(
  'resume/fetchResume',
  async (params: any) => {
    const data = await fetchResume(params);
    return data;
  }
);

interface CandidatesState {
  data: any[]; // Adjust the type accordingly
  isLoading: boolean;
  error: string | null;
}

const initialState: CandidatesState = {
  data: [],
  isLoading: false,
  error: null,
};

const resumeSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidatesResume.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCandidatesResume.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchCandidatesResume.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'Error fetching candidates';
      });
  },
});

export default resumeSlice.reducer;
