import { configureStore } from "@reduxjs/toolkit";
// import candidateData from "../features/candidate/candidateSlice"
import candidateData from "../features/candidate/candidateDataSlice"
import masterData from "../features/masterData/masterDataSlice"
import resumeSlice from "../features/resumeData/resumeSlice";


const store = configureStore({
    reducer: {
        candidatedata: candidateData,
        candidateAllData: candidateData,
        masterData: masterData,
        resumeData: resumeSlice,
        
    }
}) 

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch